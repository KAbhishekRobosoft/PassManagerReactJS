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
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../components/Buttons';
import {addBikeDetails, prefilledBikes} from '../services/OwnerAndBike';
import {getBikeDetails} from '../services/OwnerAndBike';
import {useDispatch, useSelector} from 'react-redux';
import {addBikeType, addBikeData} from '../redux/AccessoriesSlice';
import {Formik, Field} from 'formik';
import Toast from 'react-native-simple-toast';
import {getVerifiedKeys} from '../utils/Functions';
import {setLoad} from '../redux/ContactSlice';
import {deSetLoad} from '../redux/ContactSlice';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {useEffect} from 'react';
import {DropDownInputField} from '../components/InputFields';

const AddBikeDetails = ({navigation}) => {
  const [prefilledBikeData, setPrefilledBikeData] = useState([]);
  const [selected, setSelected] = useState();
  useEffect(() => {
    const pre = async () => {
      let cred = await getVerifiedKeys(authData.userToken);
      const prefilled = await prefilledBikes(cred);
      const data = prefilled.map(e => e.vehicleType);
      setPrefilledBikeData(data);
    };
    pre();
  }, []);
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.contact.isLoading);

  const initialValues = {
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
        selected !== undefined &&
        values.vehicleNumber &&
        values.engineNumber &&
        values.frameNumber &&
        values.batteryMake &&
        values.registerNumber &&
        values.model &&
        values.model &&
        values.dealerCode !== ''
      ) {
        dispatch(setLoad());
        const obj = {
          vehicleType: selected,
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
        if (authData.registered) {
          dispatch(deSetLoad());
          navigation.navigate('subStack');
        } else {
          dispatch(deSetLoad());
          navigation.goBack();
        }
      } else {
        Toast.show('Enter all the Details');
      }
    } catch (error) {
      dispatch(deSetLoad());
      Toast.show('Error occured');
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 30 : 40}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.header]}>
          <View style={styles.subHeader}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.iconHeader}>
                <Icon name="md-arrow-back" color="white" size={25} />
              </View>
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
                  <View style={{width: '89%', alignSelf: 'center'}}>
                    <DropDownInputField
                      data={prefilledBikeData}
                      values={selected}
                      setSelected={value => setSelected(value)}
                      placeholder="Vehicle Type"
                    />
                  </View>
                  <View style={{marginTop: -28}}>
                    <View style={styles.inputView}>
                      <Text style={styles.text}>Vehicle No</Text>
                      <View style={styles.inputTextView}>
                        <Text style={{color: 'black'}}>:</Text>
                        <TextInput
                          style={styles.inputText}
                          name="vehicleNumber"
                          placeholder="Eg:- KA20AB1234"
                          placeholderTextColor="#4F504F"
                          onChangeText={handleChange('vehicleNumber')}
                          value={values.vehicleNumber}
                        />
                      </View>
                    </View>
                    <View style={styles.inputView}>
                      <Text style={styles.text}>Engine</Text>
                      <View style={styles.inputTextView}>
                        <Text style={{color: 'black'}}>:</Text>
                        <TextInput
                          name="engineNumber"
                          style={styles.inputText}
                          placeholder="Eg:- 5RE56F6A"
                          placeholderTextColor="#4F504F"
                          onChangeText={handleChange('engineNumber')}
                          value={values.engineNumber}
                        />
                      </View>
                    </View>
                    <View style={styles.inputView}>
                      <Text style={styles.text}>Frame No</Text>
                      <View style={styles.inputTextView}>
                        <Text style={{color: 'black'}}>:</Text>
                        <TextInput
                          name="frameNumber"
                          style={styles.inputText}
                          placeholder="Eg:- E45G45CV"
                          placeholderTextColor="#4F504F"
                          onChangeText={handleChange('frameNumber')}
                          value={values.frameNumber}
                        />
                      </View>
                    </View>
                    <View style={styles.inputView}>
                      <Text style={styles.text}>Battery make</Text>
                      <View style={styles.inputTextView}>
                        <Text style={{color: 'black'}}>:</Text>

                        <TextInput
                          name="batteryMake"
                          style={styles.inputText}
                          placeholder="Eg:- Exide-120V"
                          placeholderTextColor="#4F504F"
                          onChangeText={handleChange('batteryMake')}
                          value={values.batteryMake}
                        />
                      </View>
                    </View>
                    <View style={styles.inputView}>
                      <Text style={styles.text}>Reg No.</Text>
                      <View style={styles.inputTextView}>
                        <Text style={{color: 'black'}}>:</Text>

                        <TextInput
                          name="registerNumber"
                          style={styles.inputText}
                          placeholder="Eg:- DL6RS4532"
                          placeholderTextColor="#4F504F"
                          onChangeText={handleChange('registerNumber')}
                          value={values.registerNumber}
                        />
                      </View>
                    </View>
                    <View style={styles.inputView}>
                      <Text style={styles.text}>Model</Text>
                      <View style={styles.inputTextView}>
                        <Text style={{color: 'black'}}>:</Text>

                        <TextInput
                          name="model"
                          keyboardType="numeric"
                          style={styles.inputText}
                          placeholder="Eg:- 2017"
                          placeholderTextColor="#4F504F"
                          onChangeText={handleChange('model')}
                          value={values.model}
                        />
                      </View>
                    </View>
                    <View style={styles.inputView}>
                      <Text style={styles.text}>Color</Text>
                      <View style={styles.inputTextView}>
                        <Text style={{color: 'black'}}>:</Text>
                        <TextInput
                          name="color"
                          style={styles.inputText}
                          placeholder="Eg:- Black"
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
                        <Text style={{color: 'black'}}>:</Text>
                        <TextInput
                          name="dealerCode"
                          style={styles.inputText}
                          placeholder="Eg:-RDF3421"
                          placeholderTextColor="#4F504F"
                          onChangeText={handleChange('dealerCode')}
                          value={values.dealerCode}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.btn}>
                  {!loading && (
                    <ButtonLarge title="Submit" onPress={handleSubmit} />
                  )}
                  {loading && (
                    <Pressable>
                      <View style={styles.container1}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['#ED7E2B', '#F4A264']}
                          style={styles.gradient1}>
                          <ActivityIndicator color="white" />
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

export default AddBikeDetails;

const styles = StyleSheet.create({
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
    paddingTop: 25,
    
    
  },
  inputViewLast: {
    width: '89%',
    height: 70,
    borderBottomColor: '#B4B3B3',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    
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
    width: '100%',
    height: 55,
   
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
  container1: {
    shadowColor: 'rgba(126,118,118,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    borderRadius: 20,
  },
  gradient1: {
    height: 42,
    width: 279,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
