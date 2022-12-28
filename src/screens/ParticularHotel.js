import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import {mapStyle} from '../utils/Functions';
import MapView, {Marker} from 'react-native-maps';
import {getParticularInfo} from '../services/Places';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {addFavourites} from '../services/Places';
import {setInitialState} from '../redux/AuthSlice';
import {addRatings} from '../services/Places';
import {LargeButton} from '../components/Button';
import {getFavourites} from '../services/Places';
import {setInitialState1} from '../redux/AuthSlice';
import Share from 'react-native-share';

function ParticularHotel({navigation, route}) {
  const [data, setData] = useState({});
  const [favourites, setFavourites] = useState([]);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth.initialState);
  const {height, width} = useWindowDimensions();
  const [modal, setModal] = useState(false);
  const [rate, setRate] = useState(0);
  const [favChanged, setFavChanged] = useState(false);
  const state1 = useSelector(state => state.auth.initialState1);
  const [rateChanged, setRateChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const ratingCompleted = async rating => {
    try {
      const key = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(key));
      const response = await addRatings(key, route.params.id, rating);
      if (response !== undefined) {
        if (response.message === 'Rating already given') {
          Toast.show('You have already rated');
        }
        if (response.message === 'Rating added') {
          setModal(false);
          dispatch(setInitialState(state));
          Toast.show('Rated successfully');
        }
      }
    } catch (er) {
      Toast.show('network Error');
    }
  };

  const height1 =
    width > height
      ? Platform.OS === 'ios'
        ? 210
        : 210
      : Platform.OS === 'ios'
      ? 430
      : 450;

  const height2 =
    width > height
      ? Platform.OS === 'ios'
        ? 250
        : 250
      : Platform.OS === 'ios'
      ? 600
      : 600;

  const top =
    width > height
      ? Platform.OS === 'ios'
        ? 10
        : 10
      : Platform.OS === 'ios'
      ? 70
      : 60;

  const left =
    width > height
      ? Platform.OS === 'ios'
        ? 715
        : 715
      : Platform.OS === 'ios'
      ? 355
      : 355;

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await getParticularInfo(route.params.id);
        setData(response);
      } catch (er) {
        Toast.show('Network Error');
      }
    }, 500);
  }, [state]);

  useEffect(() => {
    if (authData.userToken !== null) {
      setTimeout(async () => {
        try {
          const cred = await getVerifiedKeys(authData.userToken);
          dispatch(setToken(cred));
          const response = await getFavourites(cred);
          setFavourites(response.favouritePlaces);
        } catch (er) {
          Toast.show('Network Error');
        }
      }, 500);
    }
  }, [state1]);

  const share = async () => {
    shareOptions = {
      message: `Image: ${
        'https' + data.placeImage.substring(4)
      }${'\n'}Place name: ${data.placeName.trim()}${'\n'}Rating: ${
        data.rating
      }${'\n'}Address:${data.address}${'\n'}Distance: ${
        route.params.distance
      } km`,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      Toast.show('Shared Successfully');
    } catch (error) {
      console.log('error while sharing');
    }
  };

  async function handleFavourite(id) {
    try {
      const cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const resp = await addFavourites(id, cred);
      if (resp !== undefined) {
        setFavChanged(true);
        dispatch(setInitialState1(state1));
      }
    } catch (er) {
      Toast.show('Network Error');
    }
  }

  return (
    <SafeAreaView style={styles.particularContainer}>
      <StatusBar backgroundColor="#370F24" />
      {JSON.stringify(data) !== '{}' ? (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <ImageBackground
            source={{uri: 'https' + data.placeImage.substring(4)}}
            style={styles.particularBack}>
            <View style={styles.particularHeader}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  // if (favChanged === true) {
                  //   setFavChanged(false);
                  // }
                  // if (rateChanged === true) {
                  //   dispatch(setInitialState(state));
                  //   setRateChanged(false);
                  // }
                }}>
                <View style={styles.iconHeader}>
                  <Image
                    style={styles.backImg}
                    source={require('../assets/images/back_icon.png')}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.particularText}>{data.placeName.trim()}</Text>
              <View style={styles.shareFav}>
                <TouchableOpacity
                  onPress={() => {
                    share();
                  }}>
                  <View style={styles.iconHeader}>
                    <Image
                      style={styles.shareImg}
                      source={require('../assets/images/share_icon.png')}
                    />
                  </View>
                </TouchableOpacity>

                {authData.userToken !== null ? (
                  favourites.length > 0 ? (
                    favourites.filter(ele => ele.placeId === route.params.id)
                      .length > 0 ? (
                      !loading ? (
                        <TouchableOpacity
                          onPress={() => {
                            setLoading(true);
                            handleFavourite(route.params.id);
                          }}>
                          <View style={styles.iconHeader} key={route.params.id}>
                            <Image
                              style={styles.favouriteImg}
                              source={require('../assets/images/favourite_icon_selected.png')}
                            />
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.iconHeader}>
                          <ActivityIndicator color="yellow" />
                        </View>
                      )
                    ) : !loading1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          setLoading1(true);
                          handleFavourite(route.params.id);
                        }}>
                        <View style={styles.iconHeader} key={route.params.id}>
                          <Image
                            style={styles.favouriteImg}
                            source={require('../assets/images/favouriteEmpty.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.iconHeader}>
                        <ActivityIndicator color="yellow" />
                      </View>
                    )
                  ) : !loading2 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setLoading2(true);
                        handleFavourite(route.params.id);
                      }}>
                      <View style={styles.iconHeader}>
                        <Image
                          style={styles.favouriteImg}
                          source={require('../assets/images/favouriteEmpty.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.iconHeader}>
                      <ActivityIndicator color="yellow" />
                    </View>
                  )
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('login');
                    }}>
                    <View style={styles.iconHeader}>
                      <Image
                        style={styles.favouriteImg}
                        source={require('../assets/images/favouriteEmpty.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.textRating}>
              <Text style={styles.hotelName}>{data.category}</Text>
              <AirbnbRating
                size={15}
                showRating={false}
                defaultRating={data.rating}
                isDisabled={true}
              />
            </View>
          </ImageBackground>
          <View style={styles.userPreference}>
            {authData.userToken !== null && (
              <View style={{marginLeft: 38}}>
                <TouchableOpacity
                  onPress={() => {
                    setModal(true);
                  }}>
                  <View>
                    <Image
                      style={styles.ratingImg}
                      source={require('../assets/images/rating_icon.png')}
                    />
                    <Text style={styles.ratingText}>Rating</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {authData.userToken === null && (
              <View style={{marginLeft: 38}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('login');
                  }}>
                  <View>
                    <Image
                      style={styles.ratingImg}
                      source={require('../assets/images/rating_icon.png')}
                    />
                    <Text style={styles.ratingText}>Rating</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('imgDisplay', {
                    id: route.params.id,
                    name: data.placeName.trim(),
                  });
                }}>
                <View>
                  <Image
                    style={styles.ratingImg}
                    source={require('../assets/images/photos_icon.png')}
                  />
                  <Text style={styles.ratingText}>Photos</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginRight: 38}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('review', {
                    id: data._id,
                    name: data.placeName,
                  });
                }}>
                <View>
                  <Image
                    style={styles.ratingImg}
                    source={require('../assets/images/review_icon.png')}
                  />
                  <Text style={styles.ratingText}>Review</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.overviewText}>
            <Text style={styles.textHead}>Overview</Text>
            <Text style={styles.textPara}>{data.overview}</Text>
          </View>
          <View style={{height: 130}}>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: data.location.coordinates[1],
                longitude: data.location.coordinates[0],
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              customMapStyle={mapStyle}>
              <Marker
                coordinate={{
                  latitude: data.location.coordinates[1],
                  longitude: data.location.coordinates[0],
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              />
            </MapView>
            <LinearGradient
              style={{flex: 1}}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              locations={[0.1, 0.7]}
              colors={['rgba(249,245,238,1)', 'rgba(249,245,238,0)']}>
              <View style={styles.mapAddress}>
                <Text style={styles.addressText}>
                  {data.address}, {data.city}
                </Text>
                <Text style={styles.phoneText}>{data.placePhone}</Text>
                <Text style={styles.driveText}>{route.params.distance} m</Text>
              </View>
            </LinearGradient>
          </View>
          {authData.userToken !== null && (
            <View>
              <LargeButton
                title="Add Review"
                backgroundColor="#351347"
                width="100%"
                borderRadius="0"
                fontFamily="Avenir Medium"
                onPress={() => {
                  navigation.navigate('addReview', {
                    id: route.params.id,
                  });
                }}
              />
            </View>
          )}
          {authData.userToken === null && (
            <View>
              <LargeButton
                title="Add Review"
                backgroundColor="rgb(213,184,255)"
                width="100%"
                borderRadius="0"
                fontFamily="Avenir Medium"
                onPress={() => {
                  navigation.navigate('login');
                }}
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      )}

      <Modal visible={modal} animationType="fade" transparent={true}>
        <View style={{flex: 1, backgroundColor: '#7A7A7A7C'}}>
          <SafeAreaView
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                height: height2,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  height: height1,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <Text style={styles.ratingText1}>Overall Rating</Text>
                <Text style={styles.ratingVal}>{data.rating}</Text>
                <Text style={styles.howRate}>
                  How would you rate your experience?
                </Text>
                <View style={{marginTop: 40}}>
                  <AirbnbRating
                    size={25}
                    showRating={false}
                    defaultRating={data.rating}
                    isDisabled={false}
                    onFinishRating={rating => setRate(rating)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    ratingCompleted(rate);
                  }}
                  style={{
                    height: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 45,
                    borderColor: '#cccccc',
                    borderWidth: 1,
                  }}>
                  <Text style={styles.submitRate}>Submit</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.cancelImg, {top: top, left: left}]}>
                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('../assets/images/close_icon_grey_hdpi.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  particularContainer: {
    flex: 1,
  },

  textHead: {
    fontSize: 20,
    fontFamily: 'Avenir Book',
    color: '#351347',
  },

  phoneText: {
    marginTop: 15,
    marginLeft: 20,
    color: 'grey',
  },

  textPara: {
    marginTop: 10,
    textAlign: 'justify',
    lineHeight: 20,
    color: '#8D8D8D',
  },

  mapAddress: {
    width: '50%',
    height: 120,
  },

  overviewText: {
    margin: 20,
  },

  addressText: {
    marginTop: 10,
    marginLeft: 20,
    color: 'grey',
    fontSize: 14,
  },

  ratingVal: {
    marginTop: 10,
    fontFamily: 'Avenir Black',
    color: '#36B000',
    fontSize: 29,
  },

  particularText: {
    fontFamily: 'Avenir Medium',
    fontSize: 22,
    color: 'white',
  },

  submitRate: {
    color: '#351347',
    fontSize: 24,
    fontFamily: 'Avenir Medium',
  },

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  userPreference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },

  driveText: {
    marginLeft: 20,
    marginTop: 10,
    color: 'grey',
  },

  howRate: {
    fontFamily: 'Avenir Book',
    fontSize: 24,
    color: 'Black',
    textAlign: 'center',
    marginTop: 45,
  },

  textRating: {
    alignItems: 'center',
    marginTop: 200,
  },

  shareFav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '18%',
    marginRight: 40,
  },

  ratingText: {
    color: '#8D8D8D',
    textAlign: 'center',
  },

  ratingImg: {
    height: 40,
    width: 40,
  },

  favouriteImg: {
    height: 20,
    width: 22,
  },

  hotelName: {
    fontFamily: 'Avenir Book',
    color: 'white',
    lineHeight: 22,
    fontSize: 18,
  },

  ratingText1: {
    marginTop: 50,
    fontFamily: 'Avenir Medium',
    fontSize: 24,
    color: 'black',
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  particularHeader: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cancelImg: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a3a3a3',
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
  },

  shareImg: {
    height: 20,
    width: 20,
  },

  particularBack: {
    height: 320,
  },

  backImg: {
    height: 20,
    width: 20,
    marginLeft: 20,
  },
});
export default ParticularHotel;
