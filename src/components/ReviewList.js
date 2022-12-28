import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import moment from 'moment';

function ReviewList({item}) {
  const {height, width} = useWindowDimensions();
  const left =
    width > height
      ? Platform.OS === 'ios'
        ? 0
        : 0
      : Platform.OS === 'ios'
      ? 25
      : 25;

  return (
    <TouchableOpacity>
      <View style={styles.reviewListCon}>
        <View style={styles.imgWithDetails}>
          <Image style={styles.profileImg} source={{uri: 'https'+item.reviewerImage.substring(4)}} />
          <View style={[styles.reviewInfo,{marginLeft:left}]}>
            <Text style={styles.reviewName}>{item.reviewBy}</Text>
            <Text style={styles.reviewDet}>{item.review}</Text>
          </View>
          <Text style={styles.dateText}>
            {moment(new Date(item.reviewDate.toString()))
              .format('MMMM DD,YYYY')
              .toString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  reviewListCon: {
    height: 110,
    marginVertical: 3,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },

  dateText: {
    marginTop: 18,
    marginRight: 20,
    fontSize: 16,
    fontFamily: 'Avenir Book',
  },

  reviewName: {
    fontFamily: 'Avenir Book',
    color: 'black',
    fontSize: 18,
  },

  reviewDet: {
    lineHeight: 20,
    marginTop: 5,
    fontFamily: 'Avenir Book',
    fontSize: 16,
    color: '#7C7C7F',
  },

  reviewInfo: {
    width: '42%',
    height: 86,
    marginTop: 15,
  },

  profileImg: {
    height: 40,
    width: 40,
    marginLeft: 20,
    borderRadius: 20,
    marginTop: 20,
  },

  imgWithDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ReviewList;
