import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  PermissionsAndroid,
  ActivityIndicator,
  Text,
  RefreshControl,
  StatusBar,
  SafeAreaView
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {mapStyle} from '../utils/Functions';
import VirtualList from '../components/VirtualList';
import ListDisplay from '../components/HotelListDisplay';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {getNearPlace} from '../services/Places';
import {desetLoader, setInitialState} from '../redux/AuthSlice';
import {setCoordinate} from '../redux/AuthSlice';
import {getVerifiedKeys} from '../utils/Functions';
import {setFavourites} from '../redux/AuthSlice';
import {getFavourites} from '../services/Places';
import {setToken} from '../redux/AuthSlice';
import {addFavourites} from '../services/Places';

function NearYou({navigation}) {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [placeData, setPlaceData] = useState([]);
  const authData = useSelector(state => state.auth);
  const state = useSelector(state => state.auth.initialState);
  const state1 = useSelector(state => state.auth.initialState1);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          } else {
            Toast.show('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, [state]);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setTimeout(async () => {
          try {
            const resp = await getNearPlace({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setPlaceData(resp);
            dispatch(
              setCoordinate({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }),
            );
            mapRef.current.animateToRegion(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.2,
              },
              3 * 1000,
            );
          } catch (error) {
            console.log(error);
            dispatch(desetLoader());
          }
        }, 500);

        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        Toast.show(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    if (authData.userToken !== null) {
      setTimeout(async () => {
        const cred = await getVerifiedKeys(authData.userToken);
        dispatch(setToken(cred));
        const resp1 = await getFavourites(cred);
        dispatch(setFavourites(resp1));
      }, 1000);
    }
  }, [state1]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (authData.userToken !== null) {
      try {
        const cred = await getVerifiedKeys(authData.userToken);
        dispatch(setToken(cred));
        const resp1 = await getFavourites(cred);
        if (resp1 !== undefined) {
          Toast.show('Updating data');
          dispatch(setFavourites(resp1));
        } else {
          Toast.show('Updation failed');
        }
      } catch (error) {
        Toast.show('Error occured in Refreshing');
      }
    }
    setRefreshing(false);
  }, []);

  const {height, width} = useWindowDimensions();
  const height1 =
    width > height
      ? Platform.OS === 'ios'
        ? 135
        : 125
      : Platform.OS === 'ios'
      ? 200
      : 200;

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={[styles.mapView, styles.shadowProp, {height: height1}]}>
        {currentLatitude !== 0 && currentLongitude !== 0 ? (
          <MapView
            ref={mapRef}
            style={styles.mapStyle}
            customMapStyle={mapStyle}>
            <Marker
              draggable
              coordinate={{
                latitude: currentLatitude,
                longitude: currentLongitude,
              }}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
            />
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="purple" />
        )}
      </View>
      <View style={styles.listContainer}>
        {placeData.length > 0 ? (
          <VirtualList
            data={placeData}
            renderItem={({item}) => {
              return (
                <ListDisplay
                  state1={state1}
                  navigation={navigation}
                  item={item}
                />
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={item => item._id}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Getting Data</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },

  mapView: {
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
    justifyContent: 'center',
  },

  listContainer: {
    flex: 1,
  },

  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 2,
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default NearYou;
