import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../services/UserCredentials';
import {setOtpVerfied} from '../redux/AuthSlice';
import Toast from 'react-native-simple-toast';
import {sendOtp} from '../services/UserCredentials';
import {verifyOtp} from '../services/UserCredentials';
import {useRef} from 'react';

const OtpScreen = ({navigation}) => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.userData.mobile === '7026324187') {
      setTimeout(async () => {
        const response = await sendOtp(data.userData.mobile);
      }, 500);
    }
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Icon name="arrow-left" size={24} color="grey" />
        </Pressable>
      </View>
      <ScrollView style={{height: '100%'}}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.otpImg}
            source={require('../assets/images/otpimg.png')}
          />
          <View style={styles.textView}>
            <Text style={styles.text}>We have sent an OTP to</Text>
            <Text style={styles.text}>+91-{data.userData.mobile}</Text>
          </View>
        </View>

        <View style={styles.bottomView}>
          <View style={styles.optView}>
            <TextInput
              ref={ref}
              cursorColor={'white'}
              name="otp"
              style={styles.otpText}
              onChangeText={async value => {
                if (value.length === 4) {
                  if (data.userData.mobile === '7026324187') {
                    try {
                      setLoading(true);

                      const resp = await verifyOtp(value.toString());
                      if (resp === true) {
                        if (
                          data.registered === true &&
                          data.forgotPassword === true
                        ) {
                          navigation.navigate('ResetPassword');
                        } else if (
                          data.registered === false &&
                          data.forgotPassword === true
                        ) {
                          navigation.navigate('ResetPassword');
                        } else if (
                          data.registered === true &&
                          data.forgotPassword === false
                        ) {
                          const response = await register(
                            data.userData,
                            data.haveBike,
                          );
                          if (response !== undefined) {
                            dispatch(setOtpVerfied());
                            navigation.navigate('Login');
                          } else {
                            Toast.show('User already exists');
                          }
                        }
                      } else {
                        Toast.show('Wrong OTP');
                      }
                      ref.current.clear()
                      setLoading(false);
                    } catch (er) {
                      Toast.show('Error occurred');
                    }
                  } else {
                    setLoading(false);
                    try {
                      if (
                        data.registered === true &&
                        data.forgotPassword === true
                      ) {
                        navigation.navigate('ResetPassword');
                      } else if (
                        data.registered === false &&
                        data.forgotPassword === true
                      ) {
                        navigation.navigate('ResetPassword');
                      } else if (
                        data.registered === true &&
                        data.forgotPassword === false
                      ) {
                        const response = await register(
                          data.userData,
                          data.haveBike,
                        );
                        if (response !== undefined) {
                          dispatch(setOtpVerfied());
                          navigation.navigate('Login');
                        } else {
                          Toast.show('User already exists');
                        }
                      }
                    } catch (er) {
                      Toast.show('Error occurred');
                    }
                  }
                }
              }}
              keyboardType="numeric"
              maxLength={4}
            />
            <View style={styles.otpBorderView}>
              <View style={styles.otpBorderView1} />
              <View style={styles.otpBorderView1} />
              <View style={styles.otpBorderView1} />
              <View style={styles.otpBorderView1} />
            </View>
          </View>
          <View style={styles.textView2}>
            {loading && <ActivityIndicator size="small" color="#ED7E2B" />}
            <Text style={styles.secondsText}>20 minutes left</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  imageIcon: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
  },

  modalView: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    top: 220,
  },

  followingView: {
    backgroundColor: '#f7f5c9',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    borderWidth: 1,
    alignItems: 'center',
  },

  imgContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    position: 'relative',
  },
  otpImg: {
    width: 346,
    height: 200,
    resizeMode: 'contain',
    marginTop: 12,
  },
  textView: {
    alignItems: 'center',
    marginTop: 90,
  },
  text: {
    fontSize: 18,
    color: '#777777',
  },
  bottomView: {
    height: '52%',
    alignItems: 'center',
  },

  textView1: {
    marginTop: 50,
  },
  textView2: {
    marginTop: 30,
  },
  resendText: {
    color: '#F7931E',
  },
  secondsText: {
    color: 'rgba(174,168,168,0.87)',
  },

  optView: {
    width: 280,
    height: 50,
    justifyContent: 'center',
    marginTop: 100,
  },
  otpText: {
    letterSpacing: Platform.OS === 'ios' ? 49 : 48,
    textAlign: 'left',
    height: Platform.OS === 'ios' ? 30 : 60,
    width: Platform.OS === 'ios' ? '100%' : '110%',
    marginLeft: Platform.OS === 'ios' ? 25 : 0,
    color: '#4EB5F4',
    fontSize: 36,
    fontFamily: 'Roboto-Regular',
    top: Platform.OS === 'ios' ? 0 : 17,
  },
  otpBorderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 10,
    width: '99%',
    alignSelf: 'center',
  },
  otpBorderView1: {
    height: 2,
    width: 39,
    opacity: 0.5,
    backgroundColor: 'grey',
  },
});
