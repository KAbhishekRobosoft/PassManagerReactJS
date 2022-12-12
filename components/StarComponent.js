import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export const Star = ({rating}) => {
  return (
    <>
      {rating === 0 ? (
        <View style={styles.rating}>
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
        </View>
      ) : null}
      {rating === 1 ? (
        <View style={styles.rating}>
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
        </View>
      ) : null}
      {rating === 2 ? (
        <View style={styles.rating}>
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
        </View>
      ) : null}
      {rating === 3 ? (
        <View style={styles.rating}>
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
        </View>
      ) : null}
      {rating === 4 ? (
        <View style={styles.rating}>
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star2.png')}
          />
        </View>
      ) : null}
      {rating === 5 ? (
        <View style={styles.rating}>
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
          <Image
            style={styles.ratingImg}
            source={require('../assets/images/Star1.png')}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  ratingImg: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  rating: {
    flexDirection: 'row',
    height: 20,
    width: '30%',
    justifyContent: 'space-between',
  },
});
