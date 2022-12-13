import React from 'react';
import {useDispatch} from 'react-redux';
import {Success} from '../components/SuccessComponent';
import {deSetForgotPassword} from '../redux/AuthSlice';
const SuccessPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Success
      onPress={() => {
        dispatch(deSetForgotPassword());
        navigation.navigate('Login');
      }}
      greet="Success!!"
      text2="Your Password has been"
      text3="successfully changed."
    />
  );
};

export default SuccessPasswordScreen;
