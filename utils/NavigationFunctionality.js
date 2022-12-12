import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/AuthSlice';
import AppTourStack from './AppTourStack';
import StackNavigation from './StackNavigation';
import NewUserStack from './NewUserStack';
import {getVerifiedKeys} from './Functions';
import Toast from 'react-native-simple-toast'

function NavigationFunctionality() {
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(async () => {
      let userToken, cred;
      cred = null;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
        if (userToken !== null){
          cred = await getVerifiedKeys(userToken);
          dispatch(setToken(cred))
        }
        else{
          dispatch(setToken(userToken))
        }
      } catch (e) {
        Toast.show("Network Error")
        console.log(e);
      }
      if (userToken !== null) dispatch(setToken(cred));
      else dispatch(setToken(userToken));
    }, 1000);
  }, []);

  if (authData.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="orange" size="large" />
      </View>
    );
  }

  return authData.infoPage !== false ? (
    <AppTourStack />
  ) : authData.userToken === null ? (
    <StackNavigation />
  ) : authData.userToken !== null && authData.otpVerified ? (
    <NewUserStack />
  ) : null;
}

export default NavigationFunctionality;
