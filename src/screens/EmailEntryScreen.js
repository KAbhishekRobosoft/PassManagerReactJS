import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ScrollView,
  useWindowDimensions,
  Platform,
  StatusBar
} from 'react-native';
import {Formik, Field} from 'formik';
import CustomField from '../components/CustomField';
import {LargeButton} from '../components/Button';
import {SmallButton} from '../components/Button';
import { emailEntry } from '../utils/Functions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkIn} from '../services/UserCredentials';
import Toast from 'react-native-simple-toast';
import {setToken} from '../redux/AuthSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReset,desSetReset } from '../redux/AuthSlice';

function EmailEntryScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const {height, width} = useWindowDimensions();
  const top =
    width > height
      ? Platform.OS === 'ios'
        ? 50
        : 50
      : Platform.OS === 'ios'
      ? 72
      : 72;
  const top1 =
    width > height
      ? Platform.OS === 'ios'
        ? 80
        : 80
      : Platform.OS === 'ios'
      ? 200
      : 200;

  const initialValues = {
    email: '',
  };

  return (
    <View style={{flex: 1}}>
       <StatusBar backgroundColor="#370F24" />
      <ImageBackground
        source={require('../assets/images/background.png')}
        resizeMode="cover"
        style={styles.imgBack}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Image
              style={[styles.logoImg, {top: top}]}
              source={require('../assets/images/logo.png')}
            />

            <Formik
              initialValues={initialValues}
              validationSchema={emailEntry}
              onSubmit={values => {
                dispatch(setReset())
                navigation.navigate('otp',{data:{email:values.email.toLowerCase()}})
              }}>
              {({handleSubmit, isValid}) => (
                <View style={{marginTop: top1}}>
                  <Field
                    component={CustomField}
                    label="Enter Email"
                    name="email"
                    keyboardType="email-address"
                  />

                  <View style={styles.butView}>
                    <LargeButton
                      onPress={() => {
                        handleSubmit();
                      }}
                      title="Verify OTP"
                      width="90%"
                      borderRadius="8"
                      backgroundColor="transparent"
                      disabled={!isValid}
                      fontFamily="Avenir Medium"
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
  },

  skipText: {
    fontFamily: 'Avenir Book',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 60,
    right: 40,
    alignSelf: 'flex-end',
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alter: {
    fontFamily: 'Avenir Book',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '10%',
    height: 40,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#3E3C57',
  },

  alterText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Avenir Book',
  },

  otherLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },

  logoImg: {
    alignSelf: 'center',
  },

  fieldStyle: {
    top: 114,
  },

  butView: {
    width: '100%',
    marginTop: 42,
    alignItems: 'center',
  },

  forgotView: {
    marginTop: 34,
    alignItems: 'center',
  },
});
export default EmailEntryScreen;
