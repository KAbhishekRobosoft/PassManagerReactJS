import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const ActivityList = ({
  image,
  placeName,
  tripYear,
  startDate,
  endDate,
  startMonth,
  endMonth,
}) => {
  return (
    <View>
      <View style={[styles.container, styles.shadow]}>
        <ImageBackground source={{uri: image}} resizeMode="cover">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.25, 1]}
            colors={['rgba(0,0,0,0.85)', 'rgba(255,255,255,0)']}>
            <View style={styles.listContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.placeName}>{placeName}</Text>
                <Text style={styles.dateText}>
                  {startDate} {startMonth}- {endDate} {endMonth}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.point}></View>
      <Text style={styles.yearText}>{tripYear}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '75%',
    alignSelf: 'center',
    marginTop: 20,
    bottom: 20,
    left: 35,
    backgroundColor: 'grey',
    borderRadius: 40,
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
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
  image: {
    height: '100%',
    borderRadius: 40,
    backgroundColor: 'grey',
  },

  placeName: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0,
  },

  dateText: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
    letterSpacing: 0,
  },
  textContainer: {
    padding: 20,
  },
  point: {
    height: 10,
    width: 10,
    backgroundColor: '#ED7E2B',
    shadowColor: '#D7762D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    borderRadius: 10,
    top: 50,
    marginLeft: 17,
    position: 'absolute',
  },
  yearText: {
    color: '#727272',
    height: 28,
    lineHeight: 28,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Roboto',
    top: 42,
    left: 31,
    position: 'absolute',
  },
  yearLine: {
    borderColor: '#ED7E2B',
    height: 50,
    borderLeftWidth: 1,
    opacity: 0.53,
    left: 21.5,
    width: 3,
    // bottom: 65,
    top: 62,
    position: 'absolute',
  },
});

export default ActivityList;
