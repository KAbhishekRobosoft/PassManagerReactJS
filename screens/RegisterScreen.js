import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import ButtonLarge from '../components/Buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../components/InputFields';
import {Password} from '../components/InputFields';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {setRegistered} from '../redux/AuthSlice';
import {setUserData} from '../redux/AuthSlice';

const registerValidationSchema = yup.object().shape({
  userName: yup.string().required('Name is required'),
  mobile: yup
    .string()
    .matches(/(\d){10}\b/, 'Enter a valid mobile number')
    .required('Enter a valid mobile number'),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email must have a number, special character, small and capital alphabets.',
    )
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Enter password'),
});

const Register = ({navigation}) => {
  const [secureText, setSecureText] = useState(true);
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={[styles.header, styles.shadow]}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={styles.iconHeader}>
              <Icon name="md-arrow-back" color={'white'} size={25} />
            </View>
          </Pressable>
          <Text style={styles.headerText}>Register</Text>
        </View>

        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              userName: '',
              password: '',
              mobile: '',
              email: '',
            }}
            onSubmit={async values => {
              dispatch(setUserData(values));
              dispatch(setRegistered());
              navigation.navigate('Otp');
            }}>
            {({isValid, handleSubmit, values}) => (
              <>
                <Field
                  component={Input}
                  name="userName"
                  placeholder="Name"
                  value={values.userName}
                  source={require('../assets/images/user1.png')}
                  styleUser={styles.name}
                  keyboardType="default"
                  secureTextEntry={false}
                  returnKey="next"
                />
                <Field
                  component={Input}
                  name="mobile"
                  placeholder="Registerted mobile number"
                  value={values.mobile}
                  source={require('../assets/images/phone-call.png')}
                  styleUser={styles.call}
                  keyboardType="phone-pad"
                  secureTextEntry={false}
                  returnKey="next"
                />
                <Field
                  component={Input}
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  source={require('../assets/images/new-email-outline.png')}
                  styleUser={styles.email}
                  keyboardType="email-address"
                  secureTextEntry={false}
                />
                <Field
                  component={Password}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  source={require('../assets/images/locked.png')}
                  styleUser={styles.lock}
                  keyboardType="default"
                  secureTextEntry={secureText}
                  onPress={() => setSecureText(!secureText)}
                />
                <View style={styles.btnView}>
                  <ButtonLarge
                    title="REGISTER"
                    disabled={!isValid}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#F2944E',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  shadow: {
    backgroundColor: '#F2944E',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 25,
    fontFamily: 'Roboto-Medium',
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: 18,
    height: 24,
  },
  call: {
    width: 23.78,
    height: 23.78,
  },
  email: {
    width: 24,
    height: 16,
  },
  lock: {
    width: 19.56,
    height: 24,
  },
  btnView: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 100 : 60,
    paddingBottom: 40,
  },
  scrollview: {
    height: '90%',
  },
  form1: {
    marginTop: Platform.OS == 'ios' ? 14 : 15,
  },

  form: {
    marginTop: Platform.OS == 'ios' ? 40 : 30,
  },
  text: {
    height: 17,
    marginBottom: Platform.OS == 'ios' ? 10 : -2,
    color: Platform.OS == 'ios' ? '#7A7A7A' : '#7A7A7A',
    fontSize: 14,
    letterSpacing: 0.29,
    lineHeight: 17,
  },
});
