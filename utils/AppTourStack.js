import React from 'react';
import AppTourScreen from '../screens/AppTourScreen';
import BikeConfirmationScreen from '../screens/BikeConfirmationScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SuccessPasswordScreen from '../screens/SuccessPasswordScreen';
import Register from '../screens/RegisterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NumberEntryScreen from '../screens/NumberEntryScreen';

const Stack = createNativeStackNavigator();

function AppTourStack() {
  return (
    <Stack.Navigator initialRouteName="AppTourScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="Tour"
        component={AppTourScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Otp"
        component={OtpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Confirm"
        component={BikeConfirmationScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetSuccess"
        component={SuccessPasswordScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="NumberEntry"
        component={NumberEntryScreen}
      />
    </Stack.Navigator>
  );
}

export default AppTourStack;
