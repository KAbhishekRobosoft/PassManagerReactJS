import {Image, Platform, useWindowDimensions} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeAboardScreen from '../screens/WelcomeAboardScreen';
import AllTrips from '../screens/IndividualTripScreen';
import Profile from '../screens/Profile';
import {MyGarage} from '../screens/MyGarageScreen';
import LogoutComponent from '../components/LogoutComponent';
import LogoutModal from '../components/LogoutModal';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native'

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({navigation}) => {
  const {width,height}= useWindowDimensions()
  const top= width > height ? (Platform.OS === "ios" ? 28: 50) : 0
  const right= width > height ? (Platform.OS === "ios" ? 16 : 15) : 0
  return (
    <Tab.Navigator
      activeColor="#ffffff"
      initialRouteName='Trips'
      screenOptions={({route})=>({
        tabBarLabel: ({ focused }) => {
          return <Text style={{fontSize: 12,right:right,fontFamily:"Roboto-Medium", lineHeight:16, color: "white",top:top}}>{focused ? route.name : ""}</Text>
        },
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 5,
          paddingTop: 0,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          color: 'white',
        },
        tabBarBackground: () => (
          <LinearGradient
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ED7E2B', '#F4A264']}
          />
        ),
      })}>

      <Tab.Screen
        name="Trips"
        component={WelcomeAboardScreen}
        options={{
          title: 'Trips',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/Bike.png')}
                style={{
                  tintColor: '#FFFFFF',
                  opacity:focused ? 1 : 0.8,
                  width: 35,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      
      <Tab.Screen
        name="Garage"
        component={MyGarage}
        options={{
          title: 'My Garage',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/wrench.png')}
                style={{
                  tintColor: 'white',
                  opacity:focused ? 1 : 0.8,
                  width: 35,
           
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Activities"
        component={AllTrips}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/list.png')}
                style={{
                  tintColor: 'white',
                  opacity:focused ? 1 : 0.6,
                  width: 35,
          
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/user.png')}
                style={{
                  tintColor: 'white',
                  opacity:focused ? 1 : 0.8,
                  width: 35,
       
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="more"
        component={LogoutComponent}
        options={{
          headerShown: false,
          tabBarButton: () => <LogoutModal navigation={navigation}/>,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
