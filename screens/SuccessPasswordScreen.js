import React from 'react';
import { Success } from '../components/SuccessComponent';
 
const SuccessPasswordScreen = ({navigation}) => {
  return (
    <Success onPress= {()=>{
        navigation.navigate('Login')
    }} greet= 'Success!!' text2='Your Password has been' text3='successfully changed.'/>
  );
};

export default SuccessPasswordScreen;