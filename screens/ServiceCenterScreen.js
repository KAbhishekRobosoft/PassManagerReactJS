import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  ImageBackground,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Star} from '../components/StarComponent';
import ButtonLarge from '../components/Buttons';
import {useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {useWindowDimensions} from 'react-native';
import Toast from 'react-native-simple-toast';

const ServiceCenterScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTimer] = useState(new Date());
  const {width, height} = useWindowDimensions();
  const paddingHorizontal =
    width > height ? (Platform.OS === 'ios' ? 57 : 58) : 38;
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const route = useRoute();

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.scrollView}>
        <View>
          <ImageBackground
            style={styles.img}
            source={{uri: 'https' + route.params.dealerImage.substring(4)}}>
            <View
              style={{
                backgroundColor: '#ED7E2B',
                width: 35,
                height: 35,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:7,marginLeft:6
              }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Icon
                  style={styles.backBtn}
                  name="md-arrow-back"
                  size={25}
                  color="white"
                />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View
          style={[
            styles.ratingComponent,
            {paddingHorizontal: paddingHorizontal},
          ]}>
          <Star rating={Math.ceil(route.params.dealerRating)} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.textView1}>
            <Text style={styles.text1}>{route.params.dealerName}</Text>
            <Text style={styles.text2}>
              {route.params.dealerDistance
                ? route.params.dealerDistance
                : 0 + 'km'}
            </Text>
          </View>
          <Text style={styles.text3}> {route.params.dealerAddress}</Text>
          <Text style={styles.text3}>{route.params.dealerCity},Karnataka</Text>
          <Text style={styles.text4}>{route.params.dealerDescription}</Text>
          <Text style={styles.text4}>+91 {route.params.dealerPhoneNumber}</Text>
        </View>
        <View style={styles.btn}>
          <ButtonLarge title="CHECK SLOT" onPress={() => setOpen1(true)} />
          <DatePicker
            mode="date"
            modal
            minimumDate={new Date()}
            open={open1}
            date={date}
            onConfirm={value => {
              setDate(value);
              setOpen1(false);
              setOpen2(true);
            }}
            onCancel={() => {
              setOpen1(false);
            }}
          />
          <DatePicker
            mode="datetime"
            modal
            minimumDate={new Date()}
            open={open2}
            date={time}
            onConfirm={value => {
              setOpen2(false);
              if (
                date.toString().substring(4, 10) ===
                value.toString().substring(4, 10)
              ) {
                const obj3 = {
                  serviceType: route.params.serviceType,
                  vehicleNumber: route.params.vehicleNumber,
                  dealerName: route.params.dealerName,
                  dealerCity: route.params.dealerCity,
                  comment: route.params.comment,
                  slotDate: date.toString(),
                  time: value.toString(),
                  mobileNumber: route.params.mobileNumber,
                  dealerPhoneNumber: route.params.dealerPhoneNumber,
                };

                navigation.navigate('BookingDetails', obj3);
              } else {
                Toast.show('Date and time must match');
              }
            }}
            onCancel={() => {
              setOpen2(false);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceCenterScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: '5%',
    alignSelf: 'center',
    backgroundColor: 'grey',
    resizeMode: 'contain',
  },
  backBtn: {
    // paddingLeft: 20,
    // marginTop: 5,
    // backgroundColor: 'black',
  },
  scrollView: {
    width: '100%',
  },
  textContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 130,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  ratingComponent: {
    marginTop: 280,
  },
  textView1: {
    flexDirection: 'row',
    height: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    color: '#ED7E2B',
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    lineHeight: 28,
    height: 30,
  },
  text2: {
    color: '#6F6D6D',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  text3: {
    color: '#6F6D6D',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    alignSelf: 'flex-start',
    lineHeight: 21,
  },
  text4: {
    color: '#6F6D6D',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    alignSelf: 'flex-start',
    lineHeight: 18,
  },
  btn: {
    marginVertical: 20,
    alignSelf: 'center',
  },
});
