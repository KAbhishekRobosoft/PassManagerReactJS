import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { Star } from './StarComponent';

const SearchServiceComponent = ({data, text,navigation,route}) => {

  return (
    <View>
      {data.length !== 0
        ? data.map(ele => {
            return (
              <TouchableOpacity  key={ele._id} onPress={()=>{
                const obj2 ={
                  mobileNumber: route.params.mobileNumber,
                  serviceType: route.params.serviceType,
                  vehicleNumber: route.params.vehicleNumber,
                  vehicleType: route.params.mobileNumber,
                  comment: route.params.comment,
                  dealerName: ele.dealerName,
                  dealerPhoneNumber: ele.dealerPhoneNumber,
                  dealerImage: ele.dealerImage,
                  dealerRating: ele.dealerRating,
                  dealerDescription: ele.dealerDescription,
                  dealerDistance: ele.dealerDistance,
                  dealerAddress: ele.dealerAddress,
                  dealerCity: ele.dealerCity,
                }
                navigation.navigate('ServiceCenter',obj2)
              }}>
                <View style={styles.serviceCenterView}>
                  <View style={styles.textView1}>
                    <Text style={styles.text1}>
                      {ele.dealerName.length>18?ele.dealerName.substring(0,19)+"...":ele.dealerName},
                     {ele.dealerCity}
                    </Text>
                    <Text style={styles.text2}>
                      {ele.dealerDistance ? ele.dealerDistance : 0 + 'km'}
                    </Text>
                  </View>
                  <Text style={styles.text3}>{ele.dealerDescription}</Text>
                  <Text style={styles.text3}>+91 {ele.dealerPhoneNumber}</Text>
                  <View style={styles.rating}>
                    <Star rating={Math.ceil(ele.dealerRating)}/>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        : null}
    </View>
  );
};

export default SearchServiceComponent;

const styles = StyleSheet.create({
  serviceCenterView: {
    width: '85%',
    height: 120,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 15,
    shadowColor: 'rgba(179,172,172,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    borderRadius: 8,
    justifyContent: 'center',
  },
  textView1: {
    flexDirection: 'row',
    height: 20,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    color: '#ED7E2B',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 21,
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
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '5.5%',
    lineHeight: 18,
  },
  rating: {
    flexDirection: 'row',
    marginLeft: '5.5%',
    height: 20,
    width: '30%',
    justifyContent: 'space-between',
  },
  ratingImg: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
