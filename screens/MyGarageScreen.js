import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {GarageInputField} from '../components/InputFields';
import {getVerifiedKeys} from '../utils/Functions';
import {setLoading, deSetLoading} from '../redux/MileStoneSlice';
import {getAllService} from '../services/Services';
import {addAllServices} from '../redux/AccessoriesSlice';
import {setToken} from '../redux/AuthSlice';

export const MyGarage = ({navigation}) => {
  const hadBike = useSelector(state => state.auth.userCredentials);
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);
  const loading = useSelector(state => state.milestone.isLoading);
  const serviceData = useSelector(state => state.shop.serviceData);
  const state = useSelector(state => state.milestone.initialState);

  const [day, setDay] = useState([]);

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      try {
        let cred = await getVerifiedKeys(authData.userToken);
        dispatch(setToken(cred));
        const response2 = await getAllService(cred);
        const time2 = Date.now();
        const time = response2
          .filter(ele => new Date(ele.slotDate) > Date.now())
          .map(ele => new Date(ele.slotDate).getTime() - time2);
        const minTime = Math.min(...time);
        const due = Math.ceil(minTime / (1000 * 3600 * 24));
        setDay(due);
        dispatch(addAllServices(response2));
      } catch (e) {
        dispatch(addAllServices([]));
      }
      dispatch(setLoading());
    }, 500);
  }, [state]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {serviceData.length > 0 ? (
          new Date(serviceData[0]?.slotDate) >= Date.now() ? (
            <View style={styles.serviceDueView}>
              {day <= 1 ? (
                <Text style={styles.daysText}>{day} day</Text>
              ) : (
                <Text style={styles.daysText}>{day} days</Text>
              )}
              <Text style={styles.daysDescription}>Next Service due</Text>
            </View>
          ) : (
            <View style={styles.serviceDueView}>
              <Text style={styles.daysText}>No service due</Text>
            </View>
          )
        ) : (
          <View style={styles.serviceDueView}>
            <Text style={styles.daysText}>No Services Booked</Text>
          </View>
        )}

        <Image
          source={require('../assets/images/meter.png')}
          style={styles.meterImage}
        />
        {hadBike.haveBike ? (
          <View style={{marginTop: 30}}>
            <GarageInputField
              text="Book a Service"
              source={require('../assets/images/telemarketer.png')}
              onPress={() => {
                navigation.navigate('BookService');
              }}
              disabled={false}
            />
            <GarageInputField
              text="Service Records"
              source={require('../assets/images/folder.png')}
              onPress={() => {
                navigation.navigate('ServiceRecord');
              }}
              disabled={false}
            />
            <GarageInputField
              text="Owners Manual"
              source={require('../assets/images/notebook-of-spring-with-lines-page.png')}
              onPress={() => {
                if (authData.userData.hasOwnProperty('lisenceNumber')) {
                  navigation.navigate('OwnerManual');
                } else {
                  navigation.navigate('AddPersonalDetails');
                }
              }}
              disabled={false}
            />
            <GarageInputField
              text="Tool Kit"
              source={require('../assets/images/tOLS.png')}
              onPress={() => navigation.navigate('ToolKit')}
              disabled={false}
            />
            <GarageInputField
              text="Accessories"
              source={require('../assets/images/helmet.png')}
              onPress={() => navigation.navigate('Accessories')}
              disabled={false}
            />
          </View>
        ) : (
          <View style={{marginTop: 30}}>
            <GarageInputField
              text="Book a Service"
              source={require('../assets/images/telemarketer.png')}
              onPress={() => navigation.navigate('BookServiceStack')}
              disabled={true}
            />
            <GarageInputField
              text="Service Records"
              source={require('../assets/images/folder.png')}
              onPress={() => navigation.navigate('ServiceRecordStack')}
              disabled={true}
            />
            <GarageInputField
              text="Owners Manual"
              source={require('../assets/images/notebook-of-spring-with-lines-page.png')}
              onPress={() => navigation.navigate('OwnersManualStack')}
              disabled={true}
            />
            <GarageInputField
              text="Tool Kit"
              source={require('../assets/images/tOLS.png')}
              onPress={() => navigation.navigate('ToolKit')}
              disabled={false}
            />
            <GarageInputField
              text="Accessories"
              source={require('../assets/images/helmet.png')}
              onPress={() => navigation.navigate('Accessories')}
              disabled={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  serviceDueView: {
    alignItems: 'center',
    marginTop: 25,
  },
  daysText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    color: '#E08B4D',
    lineHeight: 19,
  },
  daysDescription: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#E08B4D',
    lineHeight: 19,
  },
  meterImage: {
    height: 170,
    width: 320,
    alignSelf: 'center',
    marginTop: 30,
  },
});
