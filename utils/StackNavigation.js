// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import BikeConfirmationScreen from '../screens/BikeConfirmationScreen';
// import LoginScreen from '../screens/LoginScreen';
// import OtpScreen from '../screens/OtpScreen'
// import ResetPasswordScreen from '../screens/ResetPasswordScreen'
// import SuccessPasswordScreen from '../screens/SuccessPasswordScreen'
// import Register from '../screens/RegisterScreen';
// import NumberEntryScreen from '../screens/NumberEntryScreen'


// const Stack = createNativeStackNavigator();

// function StackNavigation() {
//   return (
//       <Stack.Navigator initialRouteName='LoginScreen'>
//         <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
//         <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
//         <Stack.Screen options={{headerShown: false}} name="Otp" component={OtpScreen} />
//         <Stack.Screen options={{headerShown: false}} name="Confirm" component={BikeConfirmationScreen} />
//         <Stack.Screen options={{headerShown: false}} name="ResetPassword" component={ResetPasswordScreen} />
//         <Stack.Screen options={{headerShown: false}} name="NumberEntry" component={NumberEntryScreen} />
//         <Stack.Screen options={{headerShown: false}} name="ResetSuccess" component={SuccessPasswordScreen} />
//       </Stack.Navigator>
//   );
// }

// export default StackNavigation;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BikeConfirmationScreen from '../screens/BikeConfirmationScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen'
import SuccessPasswordScreen from '../screens/SuccessPasswordScreen'
import Register from '../screens/RegisterScreen';
import NumberEntryScreen from '../screens/NumberEntryScreen'
 
const Stack = createNativeStackNavigator();
 
function StackNavigation() {
  return (
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="NumberEntry" component={NumberEntryScreen} />
        <Stack.Screen options={{headerShown: false}} name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen options={{headerShown: false}} name="ResetSuccess" component={SuccessPasswordScreen} />
        <Stack.Screen options={{headerShown: false}} name="Confirm" component={BikeConfirmationScreen} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
        <Stack.Screen options={{headerShown: false}} name="Otp" component={OtpScreen} />
      </Stack.Navigator>
  );
}
 
export default StackNavigation;
