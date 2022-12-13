import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PlaceholderTextFieldOwnerManual} from '../components/InputFields';
import {useDispatch, useSelector} from 'react-redux';
import {addOwnerDetails} from '../services/OwnerAndBike';
import {setUserData} from '../redux/AuthSlice';
import ButtonLarge from '../components/Buttons';
import {Field, Formik} from 'formik';
import {getVerifiedKeys} from '../utils/Functions';
import Toast from 'react-native-simple-toast';

export const AddPersonalDetails = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const scroll =
    width > height
      ? Platform.OS === 'ios'
        ? '85%'
        : '40%'
      : Platform.OS === 'ios'
      ? '90%'
      : '92%';
  const authData = useSelector(state => state.auth);
  const userCredentials = useSelector(state => state.auth.userCredentials);
  const dispatch = useDispatch();

  const submitForm = async (values, {resetForm}) => {
    if (
      values.city &&
      values.doorNumber &&
      values.licence &&
      values.state &&
      values.pincode !== ''
    ) {
      const obj = {
        lisenceNumber: values.licence,
        city: values.city,
        state: values.state,
        doorNumber: values.doorNumber,
        pincode: values.pincode,
      };

      let cred = await getVerifiedKeys(authData.userToken);

      await addOwnerDetails(obj, cred);
      const userData = {
        lisenceNumber: values.licence,
        city: values.city,
        state: values.state,
        doorNumber: values.doorNumber,
        pincode: values.pincode,
        name: userCredentials.userName,
        mobile: userCredentials.mobile,
        email: userCredentials.email,
      };
      dispatch(setUserData(userData));
      Toast.show('Personal Details Added');
      resetForm((initialValues = ''));
      navigation.goBack();
    } else {
      Toast.show('Enter the Details');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == 'ios' ? 70 : 40}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.mainView}>
          <View style={[styles.header]}>
            <View style={styles.subHeader}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon
                  name="md-arrow-back"
                  color="white"
                  size={25}
                  style={styles.icon}
                />
              </Pressable>
              <Text style={styles.headerText}>Add Personal Details</Text>
            </View>
          </View>
          <ScrollView
            style={{height: scroll}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.personalDetailView}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: '5%',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.personaldetailText}>
                  Add Personal Details
                </Text>
              </View>
              <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
                <Formik
                  initialValues={{
                    licence: '',
                    name: '',
                    doorNumber: '',
                    city: '',
                    state: '',
                    pincode: '',
                    mobile: '',
                    email: '',
                  }}
                  onSubmit={(values, {resetForm}) =>
                    submitForm(values, {resetForm})
                  }>
                  {({values, handleSubmit, isValid}) => (
                    <>
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="licence"
                        placeholder="Licence No."
                        keyboardType="numeric"
                        value={values.licence}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="name"
                        placeholder="Name"
                        keyboardType="default"
                        editable={false}
                        defaultValue={userCredentials.userName}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="doorNumber"
                        placeholder="Door No."
                        keyboardType="default"
                        value={values.doorNumber}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="city"
                        placeholder="City"
                        keyboardType="default"
                        value={values.city}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="state"
                        placeholder="State"
                        keyboardType="default"
                        value={values.state}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="pincode"
                        placeholder="Pincode"
                        keyboardType="numeric"
                        value={values.pincode}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="mobile"
                        placeholder="Mobile"
                        keyboardType="default"
                        editable={false}
                        defaultValue={userCredentials.mobile}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="email"
                        placeholder="Email"
                        keyboardType="default"
                        editable={false}
                        defaultValue={userCredentials.email}
                      />
                      <View style={styles.btn}>
                        <ButtonLarge
                          title="Submit"
                          onPress={handleSubmit}
                          disabled={!isValid}
                        />
                      </View>
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#F2944E',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    justifyContent: 'space-between',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
    fontFamily: 'Roboto-Medium',
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage: {
    resizeMode: 'contain',
    marginHorizontal: 25,
    width: 24,
    height: 27,
  },
  personalDetailView: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginTop: 15,
    shadowColor: 'rgba(175,170,170,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 14,
    borderRadius: 8,
    
  },
  personaldetailText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    lineHeight: 26,
    color: '#ED7F2C',
    width: '90%',
  },
  btn: {
    alignSelf: 'center',
    marginVertical: Platform.OS === 'ios' ? 30 : 40,
    marginBottom: 40,
  },
});
