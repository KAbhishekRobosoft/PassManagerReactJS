import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {Formik, Field} from 'formik';
import CustomField from '../components/CustomField';
import {LargeButton} from '../components/Button';
import {resetPasswordValidationSchema} from '../utils/Functions';
import {resetPassword} from '../services/UserCredentials';
import {useDispatch} from 'react-redux';
import {deSetReset} from '../redux/AuthSlice';
import Toast from 'react-native-simple-toast';

function ResetPassword({navigation, route}) {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();

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
  return (
    <View style={{flex: 1}}>
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
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={async values => {
                const resp = await resetPassword({
                  email: route.params.email,
                  password: values.password,
                });
                if (resp !== undefined) {
                  dispatch(deSetReset());
                  Toast.show('Password updated');
                  navigation.navigate('login');
                }
              }}>
              {({handleSubmit, isValid}) => (
                <View style={{marginTop: top1}}>
                  <Field
                    component={CustomField}
                    label="Enter Password"
                    name="password"
                    secureTextEntry
                  />
                  <Field
                    component={CustomField}
                    name="confirmPassword"
                    label="Confirm Password"
                    secureTextEntry
                  />
                  <View style={styles.butView}>
                    <LargeButton
                      onPress={handleSubmit}
                      title="Submit"
                      disabled={!isValid}
                      width="90%"
                      borderRadius="8"
                      backgroundColor="transparent"
                      fontFamily="Avenir Book"
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
    marginTop: 80,
    right: 40,
    alignSelf: 'flex-end',
  },

  logoImg: {
    alignSelf: 'center',
  },

  fieldStyle: {
    marginTop: 220,
  },

  butView: {
    width: '100%',
    marginVertical: 100,
    alignItems: 'center',
  },
});
export default ResetPassword;
