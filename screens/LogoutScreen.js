import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ButtonLarge from '../components/Buttons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {deSetRegistered, logOut} from '../redux/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { removeBikeType } from '../redux/AccessoriesSlice';
import { removeBikeData } from '../redux/AccessoriesSlice';

const LogoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const hadBike = useSelector(state => state.auth.userCredentials);

  async function checkOut() {
    try {
      dispatch(removeBikeType());
      dispatch(removeBikeData());
      dispatch(deSetRegistered())
      Toast.show('Logged Out');
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  }

  

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{width: '100%'}}>
        <Image
          style={styles.img}
          source={require('../assets/images/logoutImg.jpg')}
        />
        {hadBike.haveBike ? (
          <View style={styles.btn1}>
            <ButtonLarge
              onPress={() => {
                navigation.navigate('AddBikeDetails');
              }}
              title="Add Bike Details"
            />
          </View>
        ) : (
          <>
            <View style={styles.btn11}>
              <ButtonLarge disabled={true} title="Add Bike Details" />
            </View>

  
          </>
        )}

        <View style={styles.btn2}>
          <Pressable
            onPress={() => {
              checkOut();
              dispatch(logOut());
            }}>
            <View style={styles.container}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF0000', '#F36870']}
                style={styles.gradient}>
                <Text style={styles.text}>Logout</Text>
              </LinearGradient>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    marginTop: 40,
    resizeMode: 'contain',
  },
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  btn11: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    opacity: 0.5,
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  container: {
    shadowColor: 'rgba(126,118,118,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    borderRadius: 20,
  },
  gradient: {
    height: 42,
    width: 279,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});
