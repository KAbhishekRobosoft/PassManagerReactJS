import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/AuthSlice';
import NonAccountNavigation from './NonAccountNavigation';
import AccountNavigation from './AccountNavigation';
import {getVerifiedKeys} from './Functions';
import Toast from 'react-native-simple-toast';
import { desetLoading,setLoading } from '../redux/AuthSlice';

function NavigationFunctionality() {
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading())
    setTimeout(async () => {
      let userToken, cred;
      cred = null;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
        if (userToken !== null) {
          cred = await getVerifiedKeys(userToken);
          dispatch(setToken(cred));
        } else {
          dispatch(setToken(userToken));
        }
        dispatch(desetLoading())
      } catch (e) {
        Toast.show('Network Error');
        console.log(e);
      }
      if (userToken !== null) dispatch(setToken(cred));
      else dispatch(setToken(userToken));
    }, 500);
  }, []);

  if (authData.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#370F24" size="large" />
      </View>
    );
  }

  return authData.userToken !== null ? (
    <AccountNavigation />
  ) : (
    <NonAccountNavigation />
  );
}

export default NavigationFunctionality;
