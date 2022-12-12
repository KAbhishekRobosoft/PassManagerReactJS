import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateTrip from '../screens/CreateTripScreen';
import BottomTabNavigation from './BottomTabNavigation';
import {ContactDisplay} from '../screens/Contact';
import {TripSummary} from '../screens/TripSummaryScreen';
import {CreateTripSuccess} from '../screens/CreateTripSuccessScreen';
import {SearchCity} from '../screens/SearchCityScreen';
import {BookService} from '../screens/BookServiceScreen';
import SearchServiceScreen from '../screens/SearchServiceScreen';
import {BookingSuccess} from '../screens/BookingSuccessScreen';
import ServiceCenterScreen from '../screens/ServiceCenterScreen';
import BookingDetails from '../screens/BookingDetailsScreen';
import ServiceRecord from '../screens/ServiceRecordScreen';
import BookingSummary from '../screens/BookingSummaryScreen';
import Invoice from '../screens/Invoice';
import OwnersManualScreen from '../screens/OwnersManualScreen';
import OwnersManualDetailScreen from '../screens/OwnersManualDetailScreen';
import OwnerManualEdit from '../screens/OwnerManualEditableScreen';
import {ToolKit} from '../screens/ToolKitScreen';
import {Accessories} from '../screens/AccessoriesScreen';
import ProfileUpdationScreen from '../screens/ProfileUpdationScreen';
import BottomTabLoginNavigation from './BottomTabLoginNavigation';
import {AddPersonalDetails} from '../screens/AddPersonalDetailsScreen';
import AddBikeDetails from '../screens/AddBikeDetailsScreen';

const Stack = createNativeStackNavigator();

const NewUserSubStack = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeAboardScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="WelcomeAboardScreen"
        component={BottomTabNavigation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CreateTrip"
        component={CreateTrip}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Contacts"
        component={ContactDisplay}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TripSummary"
        component={TripSummary}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CreateTripSuccess"
        component={CreateTripSuccess}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchCity"
        component={SearchCity}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookService"
        component={BookService}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchService"
        component={SearchServiceScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ServiceCenter"
        component={ServiceCenterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookingDetails"
        component={BookingDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookingSuccess"
        component={BookingSuccess}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddBikeDetails"
        component={AddBikeDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ServiceRecord"
        component={ServiceRecord}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookingSummary"
        component={BookingSummary}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Invoice"
        component={Invoice}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OwnerManual"
        component={OwnersManualScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OwnersManualDetail"
        component={OwnersManualDetailScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OwnerManualEdit"
        component={OwnerManualEdit}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ToolKit"
        component={ToolKit}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Accessories"
        component={Accessories}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddPersonalDetails"
        component={AddPersonalDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="updateProfile"
        component={ProfileUpdationScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTabLoginNavigation"
        component={BottomTabLoginNavigation}
      />
    </Stack.Navigator>
  );
};

export default NewUserSubStack;

const styles = StyleSheet.create({});
