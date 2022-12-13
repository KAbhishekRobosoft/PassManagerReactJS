import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TopNavigation from '../utils/TopNavigation';

const OwnersManualDetailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={[styles.header, styles.shadow]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.iconHeader}>
            <Icon name="md-arrow-back" color={'white'} size={25} />
          </View>
        </Pressable>
        <Text style={styles.headerText}>Owners Manual</Text>
        <View style={styles.headerIcons}>
          <Pressable
            onPress={() => {
              navigation.navigate('OwnerManualEdit');
            }}>
            <View style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="pencil" color={'white'} size={24} />
            </View>
          </Pressable>
        </View>
      </View>
      <TopNavigation editable={false} defaultValue={true} />
    </SafeAreaView>
  );
};

export default OwnersManualDetailScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#F2944E',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    paddingHorizontal: 10,
  },
  shadow: {
    backgroundColor: '#F2944E',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginRight: '30%',
    fontFamily: 'Roboto-Medium',
  },

  scrollView: {
    height: '90%',
    paddingVertical: 10,
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
