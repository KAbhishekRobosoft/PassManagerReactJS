import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
  Platform,
} from 'react-native';

import MapView, {Polyline} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import MapNavBar, {
  MapBottomBar,
  MapChatButton,
} from '../components/MapDisplayItmes';
import {calculateRoute} from '../services/Maps';
import uuid from 'react-native-uuid';
import {setLoading} from '../redux/MileStoneSlice';
import {deSetLoading} from '../redux/MileStoneSlice';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

const MapDisplayScreen = ({navigation, route}) => {
  const [direction, setDirection] = useState([]);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.milestone.isLoading);
  const state = useSelector(state => state.milestone.initialState);
  const [latitude, setLatitude] = useState(parseFloat(route.params.latitude));
  const [longitude, setLongitude] = useState(
    parseFloat(route.params.longitude),
  );
  const [latitude1, setLatitude1] = useState(
    parseFloat(route.params.latitude1),
  );
  const [longitude1, setLongitude1] = useState(
    parseFloat(route.params.longitude1),
  );

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      try {
        const dir = await calculateRoute(
          latitude,
          longitude,
          latitude1,
          longitude1,
        );
        setDirection(dir.legs[0].points);
        dispatch(setLoading());
        setTimeout(() => {
          try {
            mapRef.current.animateToRegion(
              {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.2,
              },
              3 * 1000,
            );
          } catch {
            Toast.show('Failed to animate direction');
          }
        }, 500);
      } catch (er) {
        Toast.show('Error Occurred');
      }
    }, 500);
  }, [state]);

  const [atm, setAtm] = useState(false);
  const [fuel, setFuel] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [food, setFood] = useState(false);
  const [data, setData] = useState([]);

  const [musicControlState, setMusicControlState] = useState(false);

  const {height, width} = useWindowDimensions();
  const top = width > height ? (Platform.OS === 'ios' ? '8%' : 267) : (Platform.OS === "ios" ? 670 : 739);
  const musicControl = () => {
    setMusicControlState(!musicControlState);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="orange" size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapNavBar
          atm={atm}
          setAtm={setAtm}
          sleep={sleep}
          setSleep={setSleep}
          fuel={fuel}
          setFuel={setFuel}
          food={food}
          setFood={setFood}
          navigation={navigation}
          data={data}
          setData={setData}
          id={route.params.id}
          mobile={route.params.mobile}
        />
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            style={styles.mapStyle}
            customMapStyle={mapStyle}>
            <Polyline
              coordinates={direction.map(ele => ({
                latitude: parseFloat(ele.latitude),
                longitude: parseFloat(ele.longitude),
              }))}
              strokeColor={'blue'}
              strokeWidth={5}
              lineDashPattern={[3]}
            />

            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.01,
              }}
            />

            <Marker
              coordinate={{
                latitude: latitude1,
                longitude: longitude1,
                latitudeDelta: 0.03,
                longitudeDelta: 0.01,
              }}
            />

            {sleep &&
              data.length > 0 &&
              data.map(ele => {
                return (
                  <Marker
                    key={uuid.v4()}
                    coordinate={{
                      latitude: ele.geocodes.main.latitude,
                      longitude: ele.geocodes.main.longitude,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}
                    image={require('../assets/images/slumber.jpg')}
                  />
                );
              })}

            {atm &&
              data.length > 0 &&
              data.map(ele => {
                return (
                  <Marker
                    key={uuid.v4()}
                    coordinate={{
                      latitude: ele.geocodes.main.latitude,
                      longitude: ele.geocodes.main.longitude,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}
                    image={require('../assets/images/card.jpg')}
                    title={ele.name}
                  />
                );
              })}

            {fuel &&
              data.length > 0 &&
              data.map(ele => {
                return (
                  <Marker
                    key={uuid.v4()}
                    coordinate={{
                      latitude: ele.geocodes.main.latitude,
                      longitude: ele.geocodes.main.longitude,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}
                    image={require('../assets/images/fuel.jpg')}
                    title={ele.name}
                  />
                );
              })}
            {food &&
              data.length > 0 &&
              data.map(ele => {
                return (
                  <Marker
                    key={uuid.v4()}
                    coordinate={{
                      latitude: ele.geocodes.main.latitude,
                      longitude: ele.geocodes.main.longitude,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}
                    image={require('../assets/images/cutlery.jpg')}
                    title={ele.name}
                  />
                );
              })}

            {route.params.milestones.map(ele => {
              return (
                <Marker
                  key={uuid.v4()}
                  coordinate={{
                    latitude: parseFloat(ele.destination[0].latitude),
                    longitude: parseFloat(ele.destination[0].longitude),
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.01,
                  }}
                  image={require('../assets/images/negative.jpg')}
                  title={ele.name}
                />
              );
            })}
          </MapView>
          <View>
            <View>
              <MapChatButton
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                navigation={navigation}
                tripName={route.params.tripName}
                id={route.params.id}
                mobile={route.params.mobile}
                rider={route.params.riders}
              />
              <View style={[styles.bottomContainer, {top}]}>
                <MapBottomBar
                  id={route.params.id}
                  musicControl={musicControl}
                  musicControlIcon={
                    musicControlState ? 'ios-pause-sharp' : 'ios-play'
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    
    
  },

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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

export default MapDisplayScreen;
