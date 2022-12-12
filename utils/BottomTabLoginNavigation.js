import AllUserTrip from '../screens/AllUserTrip';
import Profile from '../screens/Profile';
import {MyGarage} from '../screens/MyGarageScreen';
import LogoutComponent from '../components/LogoutComponent';
import LogoutModal from '../components/LogoutModal';
import LinearGradient from 'react-native-linear-gradient';
import {Image, Platform} from 'react-native';
import React from 'react';
import {Text,useWindowDimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UpcomingList from '../screens/IndividualTripScreen';

const Tab = createBottomTabNavigator();

const BottomTabLoginNavigation = ({navigation}) => {
  const {width,height}= useWindowDimensions()
  const top= width > height ? (Platform.OS === "ios" ? 21: 20) : 0
  const right= width > height ? (Platform.OS === "ios" ? 18 : 15) : 0
  const height1= width > height ? (Platform.OS === "ios" ? 60 : 60) : Platform.OS === "ios" ? 80 : 60
  const bottom= width > height ? (Platform.OS === "ios" ? 0: 0) : Platform.OS === "ios" ? 0 : 20 

  return (
    <Tab.Navigator
      activeColor="#ffffff"
      initialRouteName='Trips'
      screenOptions={({route})=>({
        tabBarLabel: ({ focused }) => {
          return <Text style={{fontSize: 12,right:right,fontFamily:"Roboto-Medium", lineHeight:16, color: "white",top:top,bottom:bottom}}>{focused ? route.name : ""}</Text>
        },
        tabBarStyle: {
          height: height1,
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
        component={UpcomingList}
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
        component={AllUserTrip}
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

export default BottomTabLoginNavigation;







// import {Image, Platform} from 'react-native';
// import React from 'react';
// import {Text,useWindowDimensions} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import LogoutComponent from '../components/LogoutComponent';
// import UpcomingList from '../screens/IndividualTripScreen';
// import Profile from '../screens/Profile';
// import AllUserTrip from '../screens/AllUserTrip';
// import {MyGarage} from '../screens/MyGarageScreen';
// import LogoutModal from '../components/LogoutModal';
// import LinearGradient from 'react-native-linear-gradient';

// const Tab = createBottomTabNavigator();

// const BottomTabLoginNavigation = ({navigation}) => {
//   const {width, height} = useWindowDimensions();
//   const top = width > height ? (Platform.OS === 'ios' ? 28 : 50) : 0;
//   const right = width > height ? (Platform.OS === 'ios' ? 16 : 15) : 0;
//   const height1= width > height ? (Platform.OS === "ios" ? 60 : 60) : 80
//   return (
//     <Tab.Navigator
//       activeColor="#ffffff"
//       initialRouteName="UpcomingList"
//       screenOptions={({route}) => ({
//         tabBarLabel: ({focused}) => {
//           return (
//             <Text
//               style={{
//                 fontSize: 12,
//                 right: right,
//                 fontFamily: 'Roboto-Medium',
//                 lineHeight: 16,
//                 color: 'white',
//                 top: top,
//               }}>
//               {focused ? route.name : ''}
//             </Text>
//           );
//         },
//         tabBarStyle: {
//           height: height1,
//           paddingHorizontal: 5,
//           paddingTop: 0,
//           position: 'absolute',
//           borderTopWidth: 0,
//         },
//         tabBarLabelStyle: {
//           color: 'white',
//         },
//         tabBarBackground: () => (
//           <LinearGradient
//             style={{
//               height: 100,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 0}}
//             colors={['#ED7E2B', '#F4A264']}
//           />
//         ),
//       })}>

//       <Tab.Screen
//        name='Trips'
//         component={UpcomingList}
//         options={{
//           title: 'Trips',
//           tabBarLabel: 'Trips',
//           headerShown:false,
//           tabBarIcon: ({focused}) => {
//             return (
//               <Image
//                 source={require('../assets/images/Bike.png')}
//                 style={{
//                   tintColor: '#ffffff',
//                   width: 35,
//                   opacity: focused ? 1 : 0.8,
//                   height: 22,
//                   resizeMode: 'contain',
//                 }}
//               />
//             );
//           },
//         }}
//       />

//       <Tab.Screen
//         name="Garage"
//         component={MyGarage}
//         options={{
//           title: 'My Garage',
//           headerShown: false,
//           tabBarIcon: ({focused}) => {
//             return (
//               <Image
//                 source={require('../assets/images/wrench.png')}
//                 style={{
//                   tintColor: 'white',
//                   width: 35,
//                   opacity: focused ? 1 : 0.8,
//                   height: 22,
//                   resizeMode: 'contain',
//                 }}
//               />
//             );
//           },
//         }}
//       />

//       <Tab.Screen
//         name="Activities"
//         component={AllUserTrip}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => {
//             return (
//               <Image
//                 source={require('../assets/images/list.png')}
//                 style={{
//                   tintColor: 'white',
//                   width: 35,
//                   height: 22,
//                   resizeMode: 'contain',
//                   opacity: focused ? 1 : 0.8,
//                 }}
//               />
//             );
//           },
//         }}
//       />

//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => {
//             return (
//               <Image
//                 source={require('../assets/images/user.png')}
//                 style={{
//                   tintColor: 'white',
//                   width: 35,
//                   height: 22,
//                   resizeMode: 'contain',
//                   opacity: focused ? 1 : 0.8,
//                 }}
//               />
//             );
//           },
//         }}
//       />

//       <Tab.Screen
//         name="More"
//         component={LogoutComponent}
//         options={{
//           headerShown: false,
//           tabBarButton: () => <LogoutModal navigation={navigation} />,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabLoginNavigation;
