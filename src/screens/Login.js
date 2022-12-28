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
  ActivityIndicator,
  StatusBar
} from 'react-native';
import {Formik, Field} from 'formik';
import CustomField from '../components/CustomField';
import {LargeButton} from '../components/Button';
import {SmallButton} from '../components/Button';
import {loginValidationSchema} from '../utils/Functions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkIn} from '../services/UserCredentials';
import Toast from 'react-native-simple-toast';
import {setToken} from '../redux/AuthSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function signIn(userData) {
    setLoading(true);
    const response = await checkIn(userData);
    if (response !== undefined) {
      try {
        await AsyncStorage.setItem('token', response.access_token);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
      dispatch(setToken(response.access_token));
      setLoading(false);
      Toast.show('Login successfull');
    } else {
      Toast.show("User doesn't exists");
    }
  }

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
      ? 120
      : 120;

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        resizeMode="cover"
        style={styles.imgBack}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('drawer');
              }}>
              <Text style={styles.skipText}>Skip {'>'}</Text>
            </TouchableOpacity>
            <Image
              style={[styles.logoImg, {top: top}]}
              source={require('../assets/images/logo.png')}
            />

            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={values => {
                signIn(values);
              }}>
              {({handleSubmit, isValid}) => (
                <View style={{marginTop: top1}}>
                  <Field
                    component={CustomField}
                    label="Email"
                    name="email"
                    keyboardType="email-address"
                  />
                  <Field
                    component={CustomField}
                    name="password"
                    label="Password"
                    secureTextEntry
                  />
                  <View style={styles.forgotView}>
                    <SmallButton
                      onPress={() => {
                        navigation.navigate('emailEntry');
                      }}
                      title="Forgot Password?"
                    />
                  </View>
                  {!loading && (
                    <View style={styles.butView}>
                      <LargeButton
                        onPress={() => {
                          handleSubmit();
                        }}
                        title="Login"
                        width="90%"
                        borderRadius="8"
                        backgroundColor="transparent"
                        disabled={!isValid}
                        fontFamily="Avenir Medium"
                      />
                    </View>
                  )}
                  {loading && (
                    <View style={styles.butView}>
                      <View style={{width: '100%'}}>
                        <TouchableOpacity
                          style={[
                            styles.buttonView,
                            {
                              backgroundColor: 'transparent',
                              width: '90%',
                              borderRadius: 8,
                              alignSelf: 'center',
                            },
                          ]}>
                          <ActivityIndicator size="large" color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </Formik>
            <View style={styles.accountText}>
              <SmallButton
                onPress={() => {
                  navigation.navigate('register');
                }}
                title="Create an Account"
              />
            </View>
            <View style={styles.alter}>
              <Text style={styles.alterText}>OR</Text>
            </View>
            <View style={styles.otherLogin}>
              <Image
                style={styles.facebook}
                source={require('../assets/images/facebook.png')}
              />
              <Image
                style={styles.google}
                source={require('../assets/images/google.png')}
              />
            </View>
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

  buttonView: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },

  google: {
    width: 180,
    borderRadius: 8,
    left: 10,
    height: 50,
  },

  facebook: {
    width: 180,
    borderRadius: 8,
    right: 5,
    height: 50,
  },

  accountText: {
    alignItems: 'center',
    marginTop: 34,
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
export default Login;
