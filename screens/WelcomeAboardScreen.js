import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonLarge from '../components/Buttons';

const WelcomeAboardScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" color={'grey'} size={18} />
        </Pressable> */}
      </View>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.img}
          source={require('../assets/images/Illustration_5.png')}
        />
        <View style={styles.textView}>
          <Text style={styles.text1}>Welcome Aboard</Text>
          <Text style={styles.text2}>You do not have any trips at</Text>
          <Text style={styles.text2}>this moment</Text>
        </View>
        <View style={styles.btn}>
            
          <ButtonLarge title="CREATE A TRIP"  onPress={()=>navigation.navigate('CreateTrip')}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeAboardScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 30,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  scrollView: {
    width: '100%',
    height: '91%',
  },
  img: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textView: {
    alignSelf: 'center',
    marginTop: 50,
    height: 80,
    justifyContent: 'center',
  },
  text1: {
    color: '#4F504F',
    fontSize: 22,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    marginVertical: 2,
  },
  text2: {
    color: '#4F504F',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    marginVertical: 2,
  },
  btn: {
    marginVertical: 80,
    alignSelf: 'center',
  },
});
