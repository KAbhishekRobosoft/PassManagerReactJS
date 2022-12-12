import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';

export const RecommendationTripSummary = () => {
  return (
    <SafeAreaView>
      <View style={styles.containerView}>
        <Text style={styles.text}>Recommendation</Text>
        <View style={styles.itemsView}>
          <Text style={styles.itemsText}>Riding Gear</Text>
          <Text style={styles.itemsText}>Winter wear</Text>
          <Text style={styles.itemsText}>Drinking water</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const Recommendations = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Recommendation</Text>
        <View style={styles.itemsView}>
          <Text style={styles.itemsText}>Riding Gear</Text>
          <Text style={styles.itemsText}>Winter wear</Text>
          <Text style={styles.itemsText}>Drinking water</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recommendations;

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
    // backgroundColor:'red',
    paddingTop: 10,
  },
  containerView: {
    height: 120,
    paddingHorizontal: 19,
    paddingTop: 10,
  },
  text: {
    color: '#4F504F',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
    marginTop: 10,
  },
  itemsView: {
    flexDirection: 'row',
    // justifyContent: 'space-around',

    height: '40%',
    alignItems: 'center',

    marginTop: 10,
    marginHorizontal: '1%',
  },
  itemsText: {
    color: '#EE802E',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#979797',
    height: 29,
    textAlign: 'center',
    padding: 5,
    marginHorizontal: 10,
  },
});
