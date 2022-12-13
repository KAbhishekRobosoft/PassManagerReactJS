import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TripSummaryList} from '../components/summarizeMilestones';
import {RecommendationTripSummary} from '../components/Recommendations';
import {CreateButton} from '../components/Buttons';
import {useSelector, useDispatch} from 'react-redux';
import BikeImageComponent from '../components/BikeImageComponent';
import MapView, {Marker} from 'react-native-maps';
import {Polyline} from 'react-native-maps';
import { getImagePreview } from '../services/Trips';
import {getVerifiedKeys, month1} from '../utils/Functions';
import { calculateRoute } from '../services/Maps';
import {deSetLoading} from '../redux/MileStoneSlice';
import {setLoading} from '../redux/MileStoneSlice';
import uuid from 'react-native-uuid';
import {setToken} from '../redux/AuthSlice';
import Toast from 'react-native-simple-toast';

export const GetParticularTripSummary = ({navigation, route}) => {
  const [direction, setDirection] = useState([]);
  const mapRef = useRef(null);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.milestone.isLoading);
  const [images, setImages] = useState([]);
  const state = useSelector(state => state.milestone.initialState);

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      try {
        const dir = await calculateRoute(
          route.params.data.source[0].latitude,
          route.params.data.source[0].longitude,
          route.params.data.destination[0].latitude,
          route.params.data.destination[0].longitude,
        );
        setDirection(dir.legs[0].points);
        const cred = await getVerifiedKeys(authData.userToken);
        dispatch(setToken(cred));
        const response = await getImagePreview(cred, route.params.data._id);
        setImages(response);
        dispatch(setLoading());
        setTimeout(() => {
          try {
            mapRef.current.animateToRegion(
              {
                latitude: parseFloat(route.params.data.source[0].latitude),
                longitude: parseFloat(route.params.data.source[0].longitude),
                latitudeDelta: 0.03,
                longitudeDelta: 0.1,
              },
              3 * 1000,
            );
          } catch {
            Toast.show('Failed to animate direction');
          }
        }, 500);
      } catch (er) {
        Toast.show('Error occured');
      }
    }, 500);
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white',flex:1}}>
      {route.params.data.tripStatus === 'upcoming' && (
        <View style={styles.mainView}>
          <View style={[styles.header]}>
            <View style={styles.subHeader}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <View style={styles.iconHeader}>
                <Icon
                  name="md-arrow-back"
                  color={'white'}
                  size={25}
                />
                </View>
              </Pressable>
              <Text style={styles.headerText}>Trip Summary</Text>
            </View>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <View style={styles.mapView}>
              <MapView
                ref={mapRef}
                style={styles.mapStyle}
                customMapStyle={mapStyle}>
                <Polyline
                  key={uuid.v4()}
                  coordinates={direction.map(ele => ({
                    latitude: ele.latitude,
                    longitude: ele.longitude,
                  }))}
                  strokeColor={'blue'}
                  strokeWidth={3}
                  lineDashPattern={[1]}
                />

                <Marker
                  coordinate={{
                    latitude: parseFloat(route.params.data.source[0].latitude),
                    longitude: parseFloat(
                      route.params.data.source[0].longitude,
                    ),
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.01,
                  }}
                />

                <Marker
                  coordinate={{
                    latitude: parseFloat(
                      route.params.data.destination[0].latitude,
                    ),
                    longitude: parseFloat(
                      route.params.data.destination[0].longitude,
                    ),
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.01,
                  }}
                />
              </MapView>
              <View style={styles.summaryView}>
                <Image source={require('../assets/images/motorcycle.png')} />
                <Text style={styles.tripName}>
                  {route.params.data.tripName}
                </Text>
                <Text style={styles.dateText}>
                  {route.params.data.startDate.substring(8, 10)}{' '}
                  {month1[route.params.data.startDate.substring(5, 7)]} -
                  {route.params.data.endDate.substring(8, 10)}{' '}
                  {month1[route.params.data.endDate?.substring(5, 7)]}{' '}
                  {route.params.data.endDate.substring(0, 4)}
                </Text>
                <Text style={styles.timeText}>
                  {route.params.data.startTime.substring(15, 21)}
                </Text>
                <View style={styles.fromToView}>
                  <Text style={styles.fromToText1}>
                    {route.params.data.source[0]?.place}
                  </Text>
                  <View style={styles.lineView}></View>
                  <Text style={styles.fromToText}>
                  {route.params.data.destination[0].place.length > 12
                        ? route.params.data.destination[0].place.substring(0, 10) + '..'
                        : route.params.data.destination[0].place.substring(0, 11)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.listView}>
              <TripSummaryList data={route.params.data.milestones} />
              <View style={styles.recommendationsView}>
                <RecommendationTripSummary />
              </View>
              <View style={styles.addUserView}>
                <View style={styles.addUserImgView}>
                  <Pressable>
                    <Image
                      style={styles.calenderImg}
                      source={require('../assets/images/adduser.png')}
                    />
                  </Pressable>
                </View>
                {route.params.data.riders.length === 0 && (
                  <Text style={styles.text}>Invite other riders</Text>
                )}
                {route.params.data.riders.length > 0 && (
                  <BikeImageComponent data={route.params.data.riders.length} />
                )}
              </View>
              <View style={styles.buttonView}>
                <CreateButton
                  onPress={() => {
                    navigation.navigate('MapDisplay', {
                      latitude: route.params.data.source[0].latitude,
                      longitude: route.params.data.source[0].longitude,
                      latitude1: route.params.data.destination[0].latitude,
                      longitude1: route.params.data.destination[0].longitude,
                      milestones: route.params.data.milestones,
                      id: route.params.data._id,
                      tripName: route.params.data.tripName,
                      mobile: route.params.data.mobile,
                      riders: route.params.data.riders,
                    });
                  }}
                  title="GO"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {route.params.data.tripStatus === 'completed' && (
        <>
          <ScrollView
       
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.mainView}>
              <View style={[styles.header]}>
                <View style={styles.subHeader}>
                  <Pressable
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      name="md-arrow-back"
                      color={'white'}
                      size={25}
                      style={styles.icon}
                    />
                  </Pressable>
                  <Text style={styles.headerText}>Trip Summary</Text>
                </View>
              </View>

              <View style={styles.mapView}>
                <MapView
                  ref={mapRef}
                  style={styles.mapStyle}
                  customMapStyle={mapStyle}>
                  <Polyline
                    key={uuid.v4()}
                    coordinates={direction.map(ele => ({
                      latitude: ele.latitude,
                      longitude: ele.longitude,
                    }))}
                    strokeColor={'blue'}
                    strokeWidth={2}
                    lineDashPattern={[1]}
                  />

                  <Marker
                    coordinate={{
                      latitude: parseFloat(
                        route.params.data.source[0].latitude,
                      ),
                      longitude: parseFloat(
                        route.params.data.source[0].longitude,
                      ),
                      latitudeDelta: 0.03,
                      longitudeDelta: 0.01,
                    }}
                  />

                  <Marker
                    coordinate={{
                      latitude: parseFloat(
                        route.params.data.destination[0].latitude,
                      ),
                      longitude: parseFloat(
                        route.params.data.destination[0].longitude,
                      ),
                      latitudeDelta: 0.03,
                      longitudeDelta: 0.01,
                    }}
                  />
                </MapView>
                <View style={styles.summaryView}>
                  <Image source={require('../assets/images/motorcycle.png')} />
                  <Text style={styles.tripName}>
                    {route.params.data.tripName}
                  </Text>
                  <Text style={styles.dateText}>
                    {route.params.data.startDate.substring(8, 10)}{' '}
                    {month1[route.params.data.startDate.substring(5, 7)]} -
                    {route.params.data.endDate.substring(8, 10)}{' '}
                    {month1[route.params.data.endDate?.substring(5, 7)]}{' '}
                    {route.params.data.endDate.substring(0, 4)}
                  </Text>
                  <Text style={styles.timeText}>
                    {route.params.data.startTime.substring(15, 21)}
                  </Text>

                  <View style={styles.fromToView}>
                    <Text style={styles.fromToText1}>
                      {route.params.data.source[0]?.place}
                    </Text>
                    <View style={styles.lineView}></View>
                    <Text style={styles.fromToText}>
                      {route.params.data.destination[0].place.length > 12
                        ? route.params.data.destination[0].place.substring(0, 10) + '..'
                        : route.params.data.destination[0].place.substring(0, 11)}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 160,
                  alignSelf: 'center',
                }}>
                <BikeImageComponent data={route.params.data.riders.length} />
              </View>

              {images.length > 0 ? (
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Roboto-Regular',
                    color: 'rgba(58,57,57,0.87)',
                    lineHeight: 24,
                    marginTop: 25,

                    width: '80%',
                    alignSelf: 'center',
                  }}>
                  Gallery
                </Text>
              ) : null}

              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {images.length !== 0 ? (
                  images.map(item => {
                    return (
                      <Pressable
                        key={item._id}
                        onPress={() =>
                          navigation.navigate('ImageLikeComment', {
                            id: item._id,
                            image: 'https' + item.imageUrl.substring(4),
                          })
                        }>
                        <Image
                          style={styles.itemImageStyle}
                          source={{uri: 'https' + item.imageUrl.substring(4)}}
                        />
                      </Pressable>
                    );
                  })
                ) : (
                  <View style={{marginTop: Platform.OS === 'ios' ? 100 : 100}}>
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 16,color:'black'}}>
                      No Images Posted
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default GetParticularTripSummary;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },

  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#F2944E',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    justifyContent: 'space-between',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
    fontFamily: 'Roboto-Medium',
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage: {
    marginHorizontal: 25,
  },
  mapView: {
    height: 270,
    width: '100%',
    backgroundColor: 'grey',
  },
  summaryView: {
    height: 186,
    marginHorizontal: 20,
    marginTop: 210,
    shadowColor: 'rgba(179,172,172,0.5)',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 8,
  },
  tripName: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    color: 'rgba(58,57,57,0.87)',
    lineHeight: 32,
  },
  dateText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#4F504F',
    lineHeight: 21,
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
  },
  fromToView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  fromToText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
    paddingHorizontal: 3,
    textAlign: 'left',
    width: '35%',
    height: 20,
  },
  fromToText1: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
    paddingHorizontal: 3,
    textAlign: 'right',
    width: '35%',
    height: 20,
  },
  lineView: {
    borderWidth: 1,
    height: 1,
    width: 61,
    borderColor: 'rgba(151,151,151,0.4)',
    backgroundColor: 'rgba(151,151,151,0.4)',
  },
  listView: {
    marginVertical: 155,
  },
  recommendationsView: {
    paddingTop: 20,
  },
  buttonView: {
    paddingTop: 40,
    alignItems: 'center',
    top:50
  },
  calenderImg: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  addUserView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 28,
  },
  addUserImgView: {
    backgroundColor: 'white',
    width: 46,
    height: 46,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.6,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
    width: '70%',
    textAlign: 'left',
    marginLeft: 10,
  },
  imageView: {
    borderWidth: 4,
    width: '100%',
    alignSelf: 'center',
    height: '50%',
  },

  itemImageStyle: {
    width: 146,
    height: 128,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 2,
  },
});

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
