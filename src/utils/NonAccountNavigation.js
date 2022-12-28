import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import OtpScreen from '../screens/OtpScreen';
import ResetPassword from '../screens/ResetPassword';
import ParticularHotel from '../screens/ParticularHotel';
import ReviewScreen from '../screens/ReviewScreen';
import NearYou from '../screens/NearYou';
import DrawerNavigation from './DrawerNavigation';
import SearchScreen from '../screens/SearchScreen';
import ParameterWithHeaderList from '../components/ParameterWithHeaderList';
import FilterScreen from '../screens/FilterScreen';
import EmailEntryScreen from '../screens/EmailEntryScreen';
import AboutUs from '../screens/AboutUs';
import IndividualImageDisplay from '../screens/IndividualImageDisplay';
import ImageDisplay from '../screens/ImageDisplay';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

function NonAccountNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="register"
        component={Register}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="emailEntry"
        component={EmailEntryScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="otp"
        component={OtpScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="resetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="drawer"
        component={DrawerNavigation}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="near"
        component={NearYou}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="particular"
        component={ParticularHotel}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="review"
        component={ReviewScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="aboutUs"
        component={AboutUs}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="search"
        component={SearchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="imgDisplay"
        component={ImageDisplay}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="IndividualImg"
        component={IndividualImageDisplay}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="parameterHeader"
        component={ParameterWithHeaderList}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="filter"
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
}

export default NonAccountNavigation;
