import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import TopBar from '../components/TopBar';

function HomePage({navigation}) {
  return (
    <SafeAreaView style={styles.homeContainer}>
    <StatusBar backgroundColor="#370F24" />
      <View style={styles.homeHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View style={styles.iconHeader}>
            <Image
              style={styles.menuIcon}
              source={require('../assets/images/menu_icon.png')}
            />
          </View>
        </TouchableOpacity>
        <Image
          style={styles.homeLogo}
          source={require('../assets/images/logo.png')}
        />
        <View style={styles.homeOptions}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('filter',{name:"search"});
            }}>
            <View style={styles.iconHeader}>
              <Image
                style={styles.filterIcon}
                source={require('../assets/images/filter_icon.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('search');
            }}>
            <View style={styles.iconHeader}>
              <Image
                style={styles.searchIcon}
                source={require('../assets/images/search_icon.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.topBar}>
        <TopBar />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },

  homeHeader: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#370F24',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 1,
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    height: 20,
    width: 20,
    marginLeft: 20,
  },

  homeLogo: {
    width: 140,
    height: 20,
  },

  searchIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },

  homeOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filterIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
});
export default HomePage;
