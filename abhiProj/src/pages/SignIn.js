import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import CustomInput from '../component/CustomInput';
import {Formik, Field} from 'formik';
import Button from '../component/Button';
import LinearGradient from 'react-native-linear-gradient';
import PasswordToggleInput from '../component/PasswordToggleInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {login} from '../redux/AuthenticationSlice';


function SignIn() {
  const dispatch = useDispatch();
  const signIn = async values => {
    const {password, phoneNumber} = values;
    let mPin = password;
    try {
      await AsyncStorage.setItem('mPin', mPin);
    } catch (e) {
      console.log(e);
    }
    dispatch(login(mPin));
  };

  return (
    <LinearGradient colors={['#1baaff', '#0e85ff']} style={styles.main_con}>
      <View style={styles.workCon}>
        <Formik
          
          initialValues={{
            phoneNumber: '',
            password: '',
          }}
          
          onSubmit={values => {
              signIn(values);
          }}>
          {({handleSubmit, isValid}) => (
            <View style={styles.main_con}>
              <View style={{marginBottom: 30}}>
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                />
              </View>
              <View>
                <Field
                  component={PasswordToggleInput}
                  name="password"
                  placeholder="MPin"
                  secureTextEntry
                />
              </View>
              <View style={styles.forgotText}>
                <Pressable>
                  <Text style={styles.forgotDes}>Forgot your password?</Text>
                </Pressable>
              </View>

              <View style={styles.butView}>
                <Button
                  onPress={handleSubmit}
                  name="SIGN IN"
                />
              </View>
              <View style={styles.finger}>
                <Image source={require('../images/finger.png')} />
              </View>
              <View style={styles.textCon}>
                <Text style={styles.text1}>OR</Text>
                <Text style={styles.text2}>USE YOUR FINGERPRINT TO LOGIN</Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
    alignItems: 'center',
  },

  forgotText: {
    marginTop: 20,
    marginRight: 170,
  },

  workCon: {
    marginTop: 40,
  },

  finger: {
    marginTop: 50,
  },

  textCon: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 60,
    alignItems: 'center',
  },

  text1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },

  text2: {
    marginLeft: 20,
    color: 'white',
  },

  forgotDes: {
    color: 'white',
    fontWeight: 'bold',
  },

  butView: {
    height: 40,
    width: '40%',
    backgroundColor: 'white',
    marginTop: 40,
    marginRight: 200,
    borderRadius: 6,
  },

  textInp1: {
    backgroundColor: 'white',
    height: 50,
    width: 330,
    borderRadius: 6,
    padding: 10,
    fontWeight: 'bold',
  },
});
export default SignIn;
