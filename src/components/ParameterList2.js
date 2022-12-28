import React, {useEffect, useState,useCallback} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import ListDisplay from './HotelListDisplay';
import VirtualList from './VirtualList';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {getParameter} from '../services/Places';
import Toast from 'react-native-simple-toast';
import {getVerifiedKeys} from '../utils/Functions';
import {addFavourites} from '../services/Places';
import {setToken} from '../redux/AuthSlice';
import {getFavourites} from '../services/Places';
import {setFavourites} from '../redux/AuthSlice';

function ParameterList2({navigation}) {
  const dispatch = useDispatch();
  const [placeData, setPlaceData] = useState([]);
  const authData = useSelector(state => state.auth);
  const state = useSelector(state => state.auth.initialState);
  const state1= useSelector(state=>state.auth.inititalState1)
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
            const resp = await getParameter('getPopularPlace', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setPlaceData(resp);
          } catch (error) {
            console.log(error);
            dispatch(desetLoader());
          }
        }, 500);
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
        const resp = await getFavourites(cred);
        dispatch(setFavourites(resp));
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

  const renderItem = ({item}) => {
    return <ListDisplay state1={state1} state={state} navigation={navigation} item={item} />;
  };

  return placeData.length > 0 ? (
    <View style={styles.parameterContainer}>
      <VirtualList
        data={placeData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
      />
    </View>
  ) : (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="purple" />
    </View>
  );
}

const styles = StyleSheet.create({
  parameterContainer: {
    flex: 1,
    marginVertical: 5,
  },
});

export default ParameterList2;
