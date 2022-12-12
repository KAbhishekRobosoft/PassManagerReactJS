import {Field, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PlaceholderTextField} from '../components/InputFields';
import {DropDownInputField} from '../components/InputFields';
import {DropDownInputField2} from '../components/InputFields';
import InsetShadow from 'react-native-inset-shadow';
import ButtonLarge from '../components/Buttons';
import * as yup from 'yup';
import { updateMobileNumber } from '../services/UserCredentials';
import {useDispatch, useSelector} from 'react-redux';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {updateUserCredentials} from '../redux/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { attempts } from '../services/UserCredentials';
import Toast from 'react-native-simple-toast';

export const BookService = ({navigation}) => {
  const phnumber = useSelector(state => state.auth.userCredentials);
  const [editable, seteditable] = useState(false);
  const [comment, setComment] = useState();
  const [selected, setSelected] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [attempt, setAttempt] = useState();
  const Data = useSelector(state => state.shop.bikeType);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const data = [
    {
      key: 'Free service',
      value: 'Free service',
    },
    {
      key: 'General service',
      value: 'General service',
    },
    {
      key: 'Breakdown assistance',
      value: 'Breakdown assistance',
    },
  ];

  const BookServiceValidation = yup.object().shape({
    mobileNumber: yup
      .string()
      .matches(/(\d){10}\b/, 'Enter a valid mobile number')
      .required(''),
  });
  useEffect(() => {
    setTimeout(async () => {
      const key = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(key));
      const response = await attempts(key);
      setAttempt(response.attampts);
    });
  });
  const handleEditNumber = async values => {
    const m = values.mobileNumber;
    seteditable(!editable);
    const key = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(key));
    const response = await updateMobileNumber(m, key);
    if (response !== undefined) {
      const obj = {
        mobile: values.mobileNumber,
        email: phnumber.email,
        haveBike: phnumber.haveBike,
        userName: phnumber.userName,
      };
      await AsyncStorage.setItem('token', response.accessToken);
      dispatch(setToken(response.accessToken));
      dispatch(updateUserCredentials(obj));
      Toast.show('Number Updated successfully!');
    } else {
      Toast.show('Enter a proper 10 digit number');
    }
  };
  const handleRight = values => {
    Alert.alert('Confirm', 'Are you sure you want to update your number?', [
      {
        text: 'Yes',
        onPress: () => handleEditNumber(values),
      },
      {
        text: 'No',
        onPress: () => handleEditable(),
      },
    ]);
  };
  const handleEditable = values => {
    seteditable(!editable);
  };
  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={[styles.header, styles.shadow]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="md-arrow-back"
            color={'white'}
            size={25}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>Book a Service</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={{
            width: '80%',
            alignSelf: 'center',
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Formik
            validationSchema={BookServiceValidation}
            initialValues={{
              mobileNumber: phnumber.mobile,
              vehicleType: '',
              vehicleNumber: '',
              serviceType: '',
              comment: '',
            }}
            onSubmit={values => {
              if (
                (selectedVehicle,
                values.vehicleNumber,
                selected != null)
              ) {
                const obj = {
                  mobileNumber: values.mobileNumber,
                  vehicleType: selectedVehicle,
                  vehicleNumber: values.vehicleNumber,
                  serviceType: selected,
                  comment: comment,
                };
                navigation.navigate('SearchService', obj);
              } else {
                Toast.show('Enter all Details');
              }
            }}>
            {({handleSubmit, values}) => (
              <>
                <View style={styles.firstInputField}>
                  <Field
                    component={PlaceholderTextField}
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    keyboardType="number-pad"
                    defaultValue={values.mobileNumber}
                    editable={editable}
                  />
                  {!editable ? (
                    <Pressable onPress={() => handleEditable(values)}>
                      <Image
                        source={require('../assets/images/edit.png')}
                        style={styles.editImage}
                      />
                    </Pressable>
                  ) : (
                    <>
                      <Pressable onPress={() => handleRight(values)}>
                        <Icon
                          name="checkmark"
                          size={24}
                          style={styles.editImage2}
                          color="green"
                        />
                      </Pressable>
                      <Pressable onPress={() => handleEditable(values)}>
                        <Icon
                          name="close"
                          size={24}
                          style={styles.editImage3}
                          color="red"
                        />
                      </Pressable>
                    </>
                  )}
                </View>
                <Text style={styles.alertText}>
                  You will have only {attempt} atempts to change your number
                </Text>
                <Text style={styles.alertText}>
                  The new number will be yor login id
                </Text>
                <Field
                  component={PlaceholderTextField}
                  name="vehicleNumber"
                  placeholder="Vehicle number"
                  keyboardType="default"
                  value={values.vehicleNumber}
                />
                <DropDownInputField
                  data={data}
                  values={selected}
                  setSelected={value => setSelected(value)}
                  placeholder="Service Type"
                />
                <DropDownInputField2
                  data={Data}
                  values={selectedVehicle}
                  setSelected={value => setSelectedVehicle(value)}
                  placeholder="Vehicle Type"
                />
                <Text style={styles.commentText}>Comments</Text>
                <View style={styles.commentTextInputView}>
                  <InsetShadow>
                    <TextInput
                      multiline={true}
                      style={{padding: 10}}
                      value={values}
                      onChangeText={value => setComment(value)}
                    />
                  </InsetShadow>
                </View>
                <View style={styles.btnView}>
                  <ButtonLarge title="FIND A DEALER" onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#ED7E2B',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
  },
  shadow: {
    backgroundColor: '#ED7E2B',
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
  icon: {
    marginHorizontal: 20,
  },
  firstInputField: {
    flexDirection: 'row',
  },
  editImage: {
    resizeMode: 'contain',
    height: 18,
    width: 18,
    marginLeft: -30,
    marginTop: 50,
  },
  editImage2: {
    resizeMode: 'contain',
    marginLeft: -60,
    marginTop: 45,
  },
  editImage3: {
    resizeMode: 'contain',
    marginLeft: -30,
    marginTop: 45,
  },
  dropDown: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  commentText: {
    color: '#4F504F',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginTop: 10,
  },
  commentTextInputView: {
    height: 71,
    marginTop: 8,
  },
  btnView: {
    alignItems: 'center',
    marginVertical: Platform.OS === 'android' ? 60 : 60,
  },
  alertText: {
    fontFamily: 'Roboto-Regular',
    color: '#D50000',
    fontSize: 12,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'center',
    marginTop: -15,
  },
});
