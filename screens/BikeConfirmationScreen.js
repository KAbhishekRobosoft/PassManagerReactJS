import React from 'react';
import {View, Text, StyleSheet, Image,useWindowDimensions,ScrollView,SafeAreaView} from 'react-native';
import SmallButton from '../components/SmallButton';
import LinearGradient from 'react-native-linear-gradient';
import { setHaveBike } from '../redux/AuthSlice';
import { useDispatch } from 'react-redux';


function BikeConfirmationScreen({navigation}) {
  const {width,height}= useWindowDimensions()
  const imgHeight1 = width > height ? (Platform.OS === 'ios' ? 150 : 160) : 200;
  const imgWidth1 = width > height ? (Platform.OS === 'ios' ? 200 : 180) : 220;
  const marginTop1 = width > height ? (Platform.OS === 'ios' ? 20 : 20) : 20;
  const dispatch= useDispatch()

  return (
    <SafeAreaView>
    <ScrollView  showsVerticalScrollIndicator ={false}>
    <View style={styles.confirmContainer}>
      <Image
        style={[styles.confirmImg,{width:imgWidth1,height:imgHeight1,marginTop:marginTop1}]}
        source={require('../assets/images/Illustration_4.png')}
      />
      <View style={{alignItems:"center",height:116}}>
        <Text style={styles.confirmText}>Do you have a</Text>
        <Text style={styles.confirmText}>Royal Bike</Text>
      </View>
      <View style={styles.confirmButtonCon}>
        <LinearGradient
          style={styles.confirmBut1}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#ED7E2B', '#F4A264']}>
          <SmallButton onPress={()=>{navigation.navigate('Register')
              dispatch(setHaveBike(true))
          }} styleName="confirmStyle" name="YES" />
        </LinearGradient>
        <View style={styles.confirmBut2}>
          <SmallButton  onPress={()=>{navigation.navigate('Register')
            dispatch(setHaveBike(false))
          }} styleName="confirmStyle" name="NO" />
        </View>
      </View>
      <View style={styles.confirmTreeCon}>
        <Image
          style={styles.treeImg1}
          source={require('../assets/images/Group_4.png')}
        />
        <Image
          style={styles.treeImg2}
          source={require('../assets/images/Group.png')}
        />
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  confirmContainer: {
    flex: 1,
    alignItems: 'center',
  },

  confirmTreeCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 26,
  },

  treeImg1: {
    marginLeft: 23,
  },

  treeImg2: {
    marginRight: 15,
  },

  confirmButtonCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },

  confirmImg: {
    marginTop: 9,
  },

  confirmText: {
    lineHeight: 52,
    fontFamily: 'Roboto-Regular',
    fontSize: 37,
    color: '#ED7E2B',
  },

  confirmBut1: {
    width: '28%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
  },

  confirmBut2: {
    width: '28%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#A29D9D',
  },
});
export default BikeConfirmationScreen;
