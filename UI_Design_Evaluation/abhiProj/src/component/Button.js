import React from 'react'
import {View,StyleSheet,Text, Pressable} from 'react-native'

function Button({onPress,name}) {
  return (
    <View>
        <Pressable style={styles.but} onPress={onPress}>
            <Text style= {styles.butText}>{name}</Text>
        </Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
    butText:{
        color:'#2d92ff',
        fontSize:18,
        textAlign:"center",
        margin:10,
        fontWeight:"bold"
    }
})

export default Button