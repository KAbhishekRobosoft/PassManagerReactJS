import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  ScrollView,
  TextInput,
  editable,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Star} from '../components/StarComponent';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import {month1} from '../utils/Functions';
import {AirbnbRating} from 'react-native-ratings';
import {getRatings} from '../services/Services';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const BookingSummary = ({navigation}) => {
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);
  const [disabled, setDisabled] = useState(true);
  const route = useRoute();
  const [rate, setRate] = useState(route.params.ratings);

  const handlePast = () => {
    if (route.params.invoice.length > 0) {
      const obj = {
        invoice: route.params.invoice,
        service: route.params.serviceType,
      };
      navigation.navigate('Invoice', obj);
    } else {
      Toast.show('Invoice yet to be generated');
    }
  };
  const ratingCompleted = async rating => {
    setRate(rating);
    setDisabled(false);
    const id = route.params._id;
    const phone = route.params.dealerPhoneNumber;
    const key = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(key));
    const response = await getRatings(key, id, rating, phone);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={[styles.header]}>
        <View style={styles.subHeader}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={styles.iconHeader}>
              <Icon name="md-arrow-back" color={'white'} size={25} />
            </View>
          </Pressable>
          <Text style={styles.headerText}>Booking Details</Text>
        </View>
        {new Date(route.params.slotDate) < Date.now() ? (
          <Pressable onPress={handlePast}>
            <Image
              source={require('../assets/images/invoice.png')}
              style={styles.invoiceImage}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: '6%'}}>
          <View style={[styles.container, styles.shadow]}>
            {new Date(route.params.slotDate) < Date.now() ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#10B691', '#3EE1BC']}
                style={styles.gradientCreateButton}>
                <Text
                  style={{
                    marginLeft: '25%',
                    color: '#ffffff',
                  }}>
                  Past
                </Text>
              </LinearGradient>
            ) : (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#E59152', '#EFB97B']}
                style={styles.gradientCreateButton}>
                <Text
                  style={{
                    marginLeft: '25%',
                    color: '#ffffff',
                  }}>
                  New
                </Text>
              </LinearGradient>
            )}
            <View style={styles.textContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '5%',
                  alignItems: 'center',
                }}>
                <Text style={[styles.dateText, {color: '#ED7F2C'}]}>
                  {route.params.slotDate.substring(8, 10)}
                </Text>
                <View style={{marginLeft: '5%'}}>
                  <Text style={[styles.monthText, {color: '#ED7F2C'}]}>
                    {month1[route.params.slotDate.substring(5, 7)]}
                  </Text>
                  <Text style={[styles.yearText, {color: '#ED7F2C'}]}>
                    {route.params.slotDate.substring(0, 4)}
                  </Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <View style={{justifyContent: 'flex-start', right: 20}}>
                <Text style={styles.serviceText}>
                  {route.params.serviceType}
                </Text>
                <Star rating={rate} />
              </View>
            </View>
            <View style={styles.textInputView}>
              <Text style={styles.titleText}>Mobile Number</Text>
              <Text>:</Text>
              <TextInput style={styles.textInputText} editable={false}>
                {route.params.mobile}
              </TextInput>
            </View>
            <View style={styles.textInputView}>
              <Text style={styles.titleText}>Vehicle Number</Text>
              <Text>:</Text>
              <TextInput style={styles.textInputText} editable={false}>
                <Text>{route.params.vehicleNumber}</Text>
              </TextInput>
            </View>
            <View style={styles.textInputView}>
              <Text style={styles.titleText}>Service Type</Text>
              <Text>:</Text>
              <TextInput style={styles.textInputText} editable={false}>
                <Text>{route.params.serviceType}</Text>
              </TextInput>
            </View>
            <View style={styles.textInputView}>
              <Text style={styles.titleText}>Time</Text>
              <Text>:</Text>
              <TextInput style={styles.textInputText} editable={false}>
                <Text>{route.params.time.substring(16, 21)}</Text>
              </TextInput>
            </View>
            <View style={styles.textInputView}>
              <Text style={styles.titleText}>Dealer</Text>
              <Text>:</Text>
              <TextInput style={styles.textInputText} editable={false}>
                <Text>{route.params.dealer}</Text>
              </TextInput>
            </View>
            <View style={styles.textInputView}>
              <Text style={styles.titleText}>City</Text>
              <Text>:</Text>
              <TextInput style={styles.textInputText} editable={false}>
                <Text>{route.params.city}</Text>
              </TextInput>
            </View>
            <View style={styles.textInputCommentView}>
              <Text style={styles.titleTextComment}>Comments</Text>
              <Text style={styles.textInputCommentText}>
                {route.params.comments}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 50,
            }}>
            {new Date(route.params.slotDate) < Date.now() ? (
              <>
                {route.params.serviceType !== 'Free service' &&
                route.params.invoice.length > 0 ? (
                  <>
                    <Text style={styles.totalText}>Total bill payed</Text>
                    <Text style={styles.ruppesText}>
                      Rs {route.params.invoice[0].total} /-
                    </Text>
                    {route.params.invoice.length == 0 ? (
                      <Text
                        style={{
                          fontFamily: 'Roboto-Regular',
                          color: 'orange',
                          fontSize: 18,
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}>
                        Invoice yet to be generated
                      </Text>
                    ) : null}
                  </>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Roboto-Regular',
                      color: 'orange',
                      fontSize: 18,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Invoice yet to be generated
                  </Text>
                )}

                <Text style={styles.totalText}>Rate the Service</Text>
                {disabled ? (
                  <AirbnbRating
                    size={15}
                    showRating={false}
                    defaultRating={rate}
                    isDisabled={false}
                    onFinishRating={rating => ratingCompleted(rating)}
                  />
                ) : (
                  <AirbnbRating
                    size={15}
                    showRating={false}
                    defaultRating={rate}
                    isDisabled={true}
                    onFinishRating={rating => ratingCompleted(rating)}
                  />
                )}
              </>
            ) : (
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 18,
                  color: '#ED7E2B',
                  marginTop: '10%',
                }}>
                Service not yet completed.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: '10%',
    fontFamily: 'Roboto-Medium',
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceImage: {
    marginHorizontal: 25,
    height: 27,
    width: 26,
  },
  container: {
    shadowColor: 'rgba(175,170,170,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.9,
    elevation: 10,
    opacity: 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,

    marginTop: 20,
  },
  shadow: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    borderRadius: 10,
  },

  gradientCreateButton: {
    shadowColor: 'rgba(100,100,100,0.5)',
    flexDirection: 'row',
    width: '17%',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 27,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 8,
  },
  dateText: {
    fontFamily: 'Roboto-Black',
    fontSize: 43,
    fontWeight: '900',
    height: 50,
    lineHeight: 50,
  },
  monthText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },

  yearText: {
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  line: {
    borderLeftWidth: 1,
    height: 62,
    opacity: 0.17,
    borderColor: '#979797;',
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  serviceText: {
    color: '#6F6D6D',
    fontFamily: 'Roboto',
    fontSize: 12,
    left: '5%',
  },
  textInputView: {
    marginHorizontal: 18,
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
    marginBottom: 10,
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
    width: '60%',
    textAlign: 'right',
  },
  textInputCommentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4F504F',
    paddingBottom: 10,
  },
  textInputCommentView: {
    marginHorizontal: 25,
    paddingTop: 28,
    paddingEnd: 3,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
  },
  textInputCommentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4F504F',
    marginBottom: 15,
  },
  textInputCommentView: {
    marginHorizontal: 13,
    paddingTop: 28,
    paddingEnd: 3,
    marginTop: 5,
    borderBottomColor: '#B4B3B3',
    marginBottom: '2%',
  },
  ruppesText: {
    height: 40,
    lineHeight: 40,
    fontSize: 30,
    fontFamily: 'Roboto',
    color: '#ED7F2C',
    letterSpacing: 0,
    textAlign: 'center',
    marginBottom: 10,
  },

  totalText: {
    height: 19,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#5D5E5D',
    letterSpacing: 0,
    textAlign: 'center',
    marginBottom: 7,
  },
  ratingImg: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default BookingSummary;
