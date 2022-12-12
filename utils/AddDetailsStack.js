import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddBikeDetails from '../screens/AddBikeDetailsScreen';
import { AddPersonalDetails } from '../screens/AddPersonalDetailsScreen';
const Stack = createNativeStackNavigator();

function AddDetailsStack() {
  return (
      <Stack.Navigator initialRouteName="AddPersonalDetails">
          <Stack.Screen
            options={{headerShown: false}}
            name="AddPersonalDetails"
            component={AddPersonalDetails}
          />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddBikeDetails"
          component={AddBikeDetails}
        />
      
      </Stack.Navigator>
  );
}

export default AddDetailsStack;