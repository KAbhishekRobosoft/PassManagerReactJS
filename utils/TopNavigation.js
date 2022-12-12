import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {BikeDetails} from '../components/BikeDetailsComponent';
import {PersonalDetails} from '../components/PersonalDetailsComponent';
import {Platform, useWindowDimensions} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const TopNavigation = ({editable, defaultValue}) => {
  const {height, width} = useWindowDimensions();
  const marginLeft = width > height ? (Platform.OS === 'ios' ? 52 : 54) : '8.9%';
  const barWidth = width > height ? (Platform.OS === 'ios' ? 50 : 50) : 12;
  return (
    <Tab.Navigator
      initialRouteName="PersonalDetails"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          lineHeight: 21,
          marginTop: 10,
          textAlign: 'left',
          textTransform: 'none',
          top: 6,
        },
        tabBarStyle: {
          width: '100%',
          paddingHorizontal: '5%',

        },
        tabBarItemStyle: {
          alignSelf: 'flex-start',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ED7F2C',
          marginLeft: marginLeft,
          width: barWidth,
          height: 2,
          alignSelf: 'flex-start',
        },
        tabBarActiveTintColor: '#ED7F2C',
        tabBarInactiveTintColor: '#868584',
        tabBarPressOpacity: 0.1,
      }}>
      <Tab.Screen
        name="Home"
        component={PersonalDetails}
        options={{title: 'Personal Details', upperCaseLabel: false}}
      />
      <Tab.Screen
        name="Settings"
        component={BikeDetails}
        options={{title: 'Bike Details'}}
        editable={editable}
      />
    </Tab.Navigator>
  );
};

export default TopNavigation;
