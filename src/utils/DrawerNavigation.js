import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Favourites from '../screens/Favourites';
import HomePage from '../screens/HomePage';
import FeedBack from '../screens/FeedBack';
import AboutUs from '../screens/AboutUs';
import CustomDrawer from '../components/CustomDrawer';
import {useSelector} from 'react-redux';
import {Image} from 'react-native'

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
  const authData = useSelector(state => state.auth);
  const color = authData.userToken !== null ? 'white' : 'grey';

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawer navigation={navigation} {...props} />
      )}
      initialRouteName="HomePage"
      screenOptions={{
        drawerStyle: {width: '85%'},
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerLabelStyle: {
          marginLeft: -22,
          fontSize: 18,
          color: color,
          fontFamily: 'Avenir Medium',
        },
        drawerItemStyle: {
          borderBottomWidth: 1,
          width: '80%',
          height: 80,
          justifyContent: 'center',
          borderBottomColor: '#52434D',
          marginLeft: 28,
        },
      }}>
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerItemStyle: {height: 0},
        }}
        name="home"
        component={HomePage}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image style={{height:25,width:25,marginLeft:8}} source= {require('../assets/images/drawerFav.png')} />
          ),
        }}
        name="Favourites"
        component={Favourites}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image style={{height:25,width:25,marginLeft:10}} source= {require('../assets/images/feedback.png')} />
          ),
        }}
        name="Feedback"
        component={FeedBack}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image style={{height:25,width:25,marginLeft:8}} source={require('../assets/images/aboutUs.png')} />
          ),
        }}
        name="About Us"
        component={AboutUs}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
