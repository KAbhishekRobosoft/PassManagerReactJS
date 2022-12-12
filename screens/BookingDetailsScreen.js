import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../components/Buttons';
import {Formik, Field} from 'formik';
import {useRoute} from '@react-navigation/native';
import {BookingDetailsInput} from '../components/InputFields';
import {BookService} from '../services/Services';
import {useDispatch, useSelector} from 'react-redux';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {setLoad} from '../redux/ContactSlice';
import {deSetLoad} from '../redux/ContactSlice';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';

const BookingDetails = ({navigation}) => {
  const route = useRoute();
  const [editable, setEditable] = useState(false);
  const [comment, setComment] = useState(route.params.comment);
  const dispatch = useDispatch();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 60;
  const loading = useSelector(state => state.contact.isLoading);

  const handleEditable = () => {
    setEditable(true);
  };
  const authData = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{flex: 1}}>
        <View style={[styles.header]}>
          <View style={styles.subHeader}>
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
            <Text style={styles.headerText}>Booking Details</Text>
          </View>
          <Pressable onPress={handleEditable}>
            <Image
              source={require('../assets/images/ic_mode_edit_black.png')}
              style={styles.editImage}
            />
          </Pressable>
        </View>
        <ScrollView
          style={{marginTop: '5%'}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              mobile: route.params.mobileNumber,
              vehicle: route.params.vehicleNumber,
              serviceType: route.params.serviceType,
              slotDate: route.params.slotDate.substring(0, 15),
              time: route.params.time.substring(16, 21),
              dealer: route.params.dealerName,
              city: route.params.dealerCity,
              comment: '',
            }}

            onSubmit={async values => {
              try {
                dispatch(setLoad());
                const value = {
                  vehicleNumber: values.vehicle,
                  serviceType: values.serviceType,
                  slotDate: route.params.slotDate,
                  time: route.params.time,
                  dealer: values.dealer,
                  city: values.city,
                  comments: comment,
                  dealerPhoneNumber: route.params.dealerPhoneNumber,
                };
                const key = await getVerifiedKeys(authData.userToken);
                dispatch(setToken(key));
                const response = await BookService(key, value);
                dispatch(deSetLoad());
                navigation.navigate('BookingSuccess');
              } catch (er) {
                dispatch(deSetLoad());
                Toast.show('Network Error');
              }
            }}>
            {({handleSubmit, values, isValid, handleChange}) => (
              <>
                <Field
                  component={BookingDetailsInput}
                  name="mobile"
                  title="Mobile Number"
                  editable={editable}
                  onChangeText={handleChange('mobile')}
                  value={values.mobile}
                />
                <Field
                  component={BookingDetailsInput}
                  name="vehicle"
                  title="Vehicle Number"
                  editable={editable}
                  onChangeText={handleChange('vehicle')}
                  value={values.vehicle}
                />
                <Field
                  component={BookingDetailsInput}
                  name="serviceType"
                  title="Service Type"
                  editable={editable}
                  onChangeText={handleChange('serviceType')}
                  value={values.serviceType}
                />
                <Field
                  component={BookingDetailsInput}
                  name="slotDate"
                  title="Slot Date"
                  editable={editable}
                  onChangeText={handleChange('slotDate')}
                  value={values.slotDate}
                />
                <Field
                  component={BookingDetailsInput}
                  name="time"
                  title="Time"
                  editable={editable}
                  onChangeText={handleChange('time')}
                  value={values.time}
                />
                <Field
                  component={BookingDetailsInput}
                  name="dealer"
                  title="Dealer"
                  editable={editable}
                  onChangeText={handleChange('dealer')}
                  value={values.dealer}
                />
                <Field
                  component={BookingDetailsInput}
                  name="city"
                  title="City"
                  editable={editable}
                  onChangeText={handleChange('city')}
                  value={values.city}
                />
                <View style={styles.textInputCommentView}>
                  <Text style={styles.titleTextComment}>Comment</Text>
                  <TextInput
                    style={styles.textInputText}
                    editable={editable}
                    name="comment"
                    defaultValue={route.params.comment}
                    onChangeText={value => setComment(value)}
                  />
                </View>
                <View style={styles.buttonView}>
                  {!loading && (
                    <ButtonLarge title="BOOK" onPress={handleSubmit} />
                  )}
                  {loading && (
                    <Pressable>
                      <View style={styles.container}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['#ED7E2B', '#F4A264']}
                          style={styles.gradient}>
                          <ActivityIndicator size="large" color="white" />
                        </LinearGradient>
                      </View>
                    </Pressable>
                  )}
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default BookingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#ED7E2B',
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
    opacity: 0.9,
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
  icon: {
    marginHorizontal: 20,
  },
  editImage: {
    marginHorizontal: 25,
  },
  textInputView: {
    marginHorizontal: 25,
    paddingTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 3,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
  },
  titleText: {
    paddingBottom: 5,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4F504F',
    width: '35%',
  },
  titleTextComment: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4F504F',
    width: '35%',
  },
  textInputText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4F504F',
    width: '50%',
    textAlign: 'left',
  },
  textInputCommentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4F504F',
    paddingBottom: 10,
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

  textInputCommentView: {
    marginHorizontal: 25,
    paddingTop: 20,
    paddingEnd: 3,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
  },
  buttonView: {
    marginTop: 25,
    alignItems: 'center',
  },
});
