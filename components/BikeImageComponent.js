import React from 'react';
import {View,StyleSheet,Image} from 'react-native'

function BikeImageComponent({data}) {

  return (
    <>
      {data === 1 ? (
        <View style={styles.rating}>
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
        </View>
      ) : null}
      {data === 2 ? (
        <View style={styles.rating}>
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
        </View>
      ) : null}
      {data === 3 ? (
        <View style={styles.rating}>
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
        </View>
      ) : null}
      {data === 4 ? (
        <View style={styles.rating}>
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
        </View>
      ) : null}
      {data === 5 ? (
        <View style={styles.rating}>
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
          <Image style={{marginLeft:10}} source={require('../assets/images/contactsUser.png')} />
        </View>
      ) : null}
    </>
  );
}

const styles= StyleSheet.create({
    rating:{
        flexDirection:"row"
    }
})
export default BikeImageComponent;
