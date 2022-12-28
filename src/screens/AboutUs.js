import React, { useEffect,useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { aboutUs } from '../services/UserCredentials';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function AboutUs({navigation}) {
  const [about,setAbout]= useState('')
  useEffect(()=>{
    setTimeout(async ()=>{
        const resp= await aboutUs()
        setAbout(resp.aboutUs)
    })
  },[])

  return (
    <SafeAreaView style={styles.aboutUs}>
       <StatusBar backgroundColor="#370F24" />
    <KeyboardAwareScrollView>
      <View style={styles.reviewHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.iconHeader}>
            <Image
              style={styles.backIcon}
              source={require('../assets/images/back_icon.png')}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.aboutText}>About us</Text>
      </View>
      {about.length !== 0 ? <View style={styles.aboutDesc}>
          <Text style={styles.aboutDesc1}>{about}</Text>
      </View> : <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size= "large" color="purple" />
      </View>}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  aboutUs: {
    flex: 1,
  },

  aboutText: {
    fontSize: 20,
    fontFamily: 'Avenir Book',
    color: 'white',
    width: '80%',
    textAlign: 'center',
    right:10
  },

  aboutDesc1:{
    lineHeight:30,
    fontSize:22,
    fontFamily:"Avenir Book",
    textAlign:"justify",
    color:"black"
  },

  aboutDesc:{
    marginTop:25,
    width:"90%",
    alignSelf:"center"
  },

  reviewHeader: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#370F24',
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    height: 20,
    width: 20,
  },
});
export default AboutUs;
