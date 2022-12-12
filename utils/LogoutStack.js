import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogoutScreen from '../screens/LogoutScreen';
import AddBikeDetails from '../screens/AddBikeDetailsScreen';
// import MyGarageStack from './MyGarageStack';


const Stack = createNativeStackNavigator();

function LogoutStack() {
  return (
      <Stack.Navigator initialRouteName="LogoutScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="LogoutScreen"
          component={LogoutScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddBikeDetails"
          component={AddBikeDetails}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Garage"
          component={MyGarageStack}
        /> */}
      </Stack.Navigator>
  );
}

export default LogoutStack;
