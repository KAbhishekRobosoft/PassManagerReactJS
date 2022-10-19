import React from 'react';
import {View,Text,Pressable,StyleSheet} from 'react-native'

function EntryButton({name,onPress,type}) {
  return (
    <View>
      <Pressable style={styles.but} onPress={onPress}>
        <Text style={styles.butText}>{name}</Text>
      </Pressable>
    </View>
  );
}

const styles= StyleSheet.create({
    but:{
        backgroundColor:"#0e85ff",
        height:50
    },

    butText:{
        color:"white",
        textAlign:"center",
        fontSize:20,
        margin:10
    }
})
export default EntryButton;
