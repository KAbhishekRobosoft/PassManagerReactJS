import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../components/Buttons';
import { addBikeDetails, } from '../services/OwnerAndBike';
import { getBikeDetails } from '../services/OwnerAndBike';
import {useDispatch, useSelector} from 'react-redux';
import {addBikeType, addBikeData} from '../redux/AccessoriesSlice';
import {Formik, Field} from 'formik';
import Toast from 'react-native-simple-toast';
import {getVerifiedKeys} from '../utils/Functions';

const AddBikeDetails = ({navigation}) => {
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    vehicleType: '',
    vehicleNumber: '',
    engineNumber: '',
    frameNumber: '',
    batteryMake: '',
    registerNumber: '',
    model: '',
    color: '',
    dealerCode: '',
  };

  const submit = async (values, {resetForm}) => {
    try {
      if (
        values.vehicleType &&
        values.vehicleNumber &&
        values.engineNumber &&
        values.frameNumber &&
        values.batteryMake &&
        values.registerNumber &&
        values.model &&
        values.model &&
        values.dealerCode !== ''
      ) {
        const obj = {
          vehicleType: values.vehicleType,
          vehicleNumber: values.vehicleNumber,
          engineNumber: values.engineNumber,
          frameNumber: values.frameNumber,
          batteryMake: values.batteryMake,
          registerNumber: values.registerNumber,
          model: values.model,
          color: values.model,
          dealerCode: values.dealerCode,
        };
        let cred = await getVerifiedKeys(authData.userToken);
        await addBikeDetails(obj, cred); // <-----------API  CAll
        const response = await getBikeDetails(cred);
        const BikeTypes = response.map(e => {
          return e.vehicleType;
        });

        dispatch(addBikeType(BikeTypes));
        dispatch(addBikeData(response)); // <-----------Redux
        resetForm({initialValues});

        Toast.show('Bike Details Added');
        if (authData.registered) {
          navigation.navigate('subStack');
        } else {
          navigation.goBack();
        }
      } else {
        Toast.show('Enter all the Details');
      }
    } catch (error) {
      Toast.show('Error occured');
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            <Text style={styles.headerText}>Add Bike Details</Text>
          </View>
        </View>
        <ScrollView
          style={{backgroundColor: 'white', height: '92%'}}
          showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
              submit(values, {resetForm});
            }}>
            {({values, handleSubmit, isValid, resetForm, handleChange}) => (
              <>
                <View style={styles.container}>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Vehicle Type</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>
                      <TextInput
                        style={styles.inputText}
                        name="vehicleType"
                        placeholder="Vehicle Type"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('vehicleType')}
                        value={values.vehicleType}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Vehicle No</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>
                      <TextInput
                        style={styles.inputText}
                        name="vehicleNumber"
                        placeholder="Vehicle No"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('vehicleNumber')}
                        value={values.vehicleNumber}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Engine</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>
                      <TextInput
                        name="engineNumber"
                        style={styles.inputText}
                        placeholder="Engine"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('engineNumber')}
                        value={values.engineNumber}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Frame No</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>
                      <TextInput
                        name="frameNumber"
                        style={styles.inputText}
                        placeholder="Frame No"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('frameNumber')}
                        value={values.frameNumber}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Battery make</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>

                      <TextInput
                        name="batteryMake"
                        style={styles.inputText}
                        placeholder="Battery make"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('batteryMake')}
                        value={values.batteryMake}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Reg No.</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>

                      <TextInput
                        name="registerNumber"
                        style={styles.inputText}
                        placeholder="Reg No."
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('registerNumber')}
                        value={values.registerNumber}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Model</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>

                      <TextInput
                        name="model"
                        keyboardType="numeric"
                        style={styles.inputText}
                        placeholder="Model"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('model')}
                        value={values.model}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={styles.text}>Color</Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>
                      <TextInput
                        name="color"
                        style={styles.inputText}
                        placeholder="Color"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('color')}
                        value={values.color}
                      />
                    </View>
                  </View>
                  <View style={styles.inputViewLast}>
                    <Text style={styles.text}>
                      <Text style={styles.text}>Dealer code</Text>
                    </Text>
                    <View style={styles.inputTextView}>
                      <Text>:</Text>
                      <TextInput
                        name="dealerCode"
                        style={styles.inputText}
                        placeholder="Dealer code"
                        placeholderTextColor="#4F504F"
                        onChangeText={handleChange('dealerCode')}
                        value={values.dealerCode}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.btn}>
                  <ButtonLarge title="Submit" onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddBikeDetails;

const styles = StyleSheet.create({
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
    resizeMode: 'contain',
    marginHorizontal: 25,
    width: 24,
    height: 27,
  },
  btn: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    shadowColor: 'rgba(175,170,170,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.9,
    elevation: 20,
    borderRadius: 8,
    marginTop: 30,
  },
  inputView: {
    width: '89%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    paddingTop: 30,
  },
  inputViewLast: {
    width: '86%',
    height: 70,
    borderBottomColor: '#B4B3B3',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    color: '#4F504F',
    textAlign: 'left',
    lineHeight: 42,
    width: 90,
  },
  inputText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4F504F',
    textAlign: 'center',
    width: '80%',
  },
  inputTextView: {
    alignItems: 'center',
    width: '68%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bikeDetailText: {
    color: '#ED7E2B',
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    lineHeight: 26,
    marginTop: 25,
    marginLeft: '5.6%',
  },
});
