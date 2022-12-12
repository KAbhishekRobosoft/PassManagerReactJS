import React from 'react';
import RegisterUserIntro from '../screens/RegisterUserIntro';
import ImageSuccessPage from '../screens/ImageSuccessPage';
import NewUserSubStack from './NewUserSubStack';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddBikeDetails from '../screens/AddBikeDetailsScreen';
import BottomTabLoginNavigation from './BottomTabLoginNavigation';
import CreateTrip from '../screens/CreateTripScreen';
import {ContactDisplay} from '../screens/Contact';
import {TripSummary} from '../screens/TripSummaryScreen';
import {CreateTripSuccess} from '../screens/CreateTripSuccessScreen';
import {SearchCity} from '../screens/SearchCityScreen';
import GetParticularTripSummary from '../screens/GetParticularTripSummary';
import MapDisplayScreen from '../screens/MapDisplayScreen';
import ChatScreen from '../screens/ChatScreen';
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
import LogoutScreen from '../screens/LogoutScreen';
import ProfileUpdationScreen from '../screens/ProfileUpdationScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import ImageLikeCommentScreen from '../screens/ImageLikeCommentScreen';
import {AddPersonalDetails} from '../screens/AddPersonalDetailsScreen';

const Stack = createNativeStackNavigator();

function NewUserStack() {
  const bikeData = useSelector(state => state.shop.allBikeData);
  const authData = useSelector(state => state.auth);

  return authData.registered ? (
    bikeData.length > 0 ? (
      <Stack.Navigator initialRouteName="subStack">
        <Stack.Screen
          options={{headerShown: false}}
          name="subStack"
          component={NewUserSubStack}
        />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator initialRouteName="RegisterUserIntro">
        <Stack.Screen
          options={{headerShown: false}}
          name="newUserTour"
          component={RegisterUserIntro}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="ImageSuccess"
          component={ImageSuccessPage}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="AddBikeDetails"
          component={AddBikeDetails}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="subStack"
          component={NewUserSubStack}
        />
      </Stack.Navigator>
    )
  ) : (
    <Stack.Navigator initialRouteName="BottomTabLoginNavigation">
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTabLoginNavigation"
        component={BottomTabLoginNavigation}
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
        name="particularTrip"
        component={GetParticularTripSummary}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="MapDisplay"
        component={MapDisplayScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChatScreen"
        component={ChatScreen}
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
        name="LogoutScreen"
        component={LogoutScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddBikeDetails"
        component={AddBikeDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="updateProfile"
        component={ProfileUpdationScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="viewProfile"
        component={ViewProfileScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ImageLikeComment"
        component={ImageLikeCommentScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="subStack"
        component={NewUserSubStack}
      />
    </Stack.Navigator>
  );
}

export default NewUserStack;
