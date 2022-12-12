import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
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
          <Icon
            name="md-arrow-back"
            color={'white'}
            size={25}
           
          />
        </Pressable>
        <Text style={styles.headerText}>Owners Manual</Text>
        <View style={styles.headerIcons}>
          <Pressable
            onPress={() => {
              navigation.navigate('OwnerManualEdit');
            }}>
            <Icon name="pencil" color={'white'} size={24} />
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
    backgroundColor: '#ED7E2B',
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
    opacity: 0.9,
    paddingHorizontal: 15,
  },
  shadow: {
    backgroundColor: '#ED7E2B',
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
    fontWeight: '500',
    marginRight: '30%',
    fontFamily: 'Roboto-Medium',
  },

  scrollView: {
    height: '90%',
    paddingVertical: 10,
  },

 
});
