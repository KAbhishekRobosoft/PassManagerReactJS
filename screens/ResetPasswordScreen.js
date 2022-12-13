import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../components/Buttons';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {resetPassword} from '../services/UserCredentials';

const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password do not match')
    .required('Confirm Password is required'),
});

const ResetPasswordScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const eyeLeft =
    width > height
      ? Platform.OS === 'ios'
        ? 600
        : 630
      : Platform.OS === 'ios'
      ? 290
      : 290;
  const eyeBottom =
    width > height
      ? Platform.OS === 'ios'
        ? 8
        : 10
      : Platform.OS === 'ios'
      ? 0
      : 0;
  const [secureText, setSecureText] = useState(true);
  const authData = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.iconHeader}>
            <Icon name="md-arrow-back" size={26} color="grey" />
          </View>
        </Pressable>
      </View>
      <ScrollView bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.resetImg}
            source={require('../assets/images/resetImg.png')}
          />
          <View style={styles.textView}>
            <Text style={styles.resetText}>Reset Password</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Formik
            validationSchema={passwordValidationSchema}
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async values => {
              const resp = await resetPassword({
                mobile: authData.userData.mobile,
                password: values.password,
              });
              if (resp !== undefined) navigation.navigate('ResetSuccess');
              else Toast.show('Request Could not be fullfilled');
            }}>
            {({
              values,
              handleSubmit,
              isValid,
              handleBlur,
              handleChange,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.inputTextView}>
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder="New Password"
                    style={styles.textInput}
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={secureText}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <View>
                    <TouchableOpacity
                      onPress={() => setSecureText(!secureText)}>
                      <Image
                        style={[
                          styles.eyeImg,
                          {left: eyeLeft, bottom: eyeBottom},
                        ]}
                        source={require('../assets/images/eye.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputTextView}>
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder="Confirm Password"
                    style={styles.textInput}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry={secureText}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
                <View style={styles.btn}>
                  <ButtonLarge
                    onPress={handleSubmit}
                    title="RESET"
                    disabled={!isValid}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  imgContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  resetImg: {
    width: 290,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  textView: {
    alignItems: 'center',
  },
  resetText: {
    fontSize: 20,
    color: '#575656',
    fontFamily: 'Roboto-Regular',
    marginTop: 30,
  },
  bottomView: {
    alignItems: 'center',
    paddingVertical: 40,
  },

  textInput: {
    width: '80%',
    height: 40,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    position: 'absolute',
    bottom: 0,
  },
  inputTextView: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#B4B3B3',
    height: 50,
    marginTop: 15,
    paddingTop: '5%',
    flexDirection: 'row',
  },
  btn: {
    marginTop: 50,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -14,
    marginHorizontal: '30%',
    width: '87%',
    textAlign: 'center',
  },
  eyeImg: {
    width: 24,
    height: 14,
    resizeMode: 'contain',
    left: 300,
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
