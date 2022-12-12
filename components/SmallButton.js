import React from 'react'
import {Pressable,View,Text,StyleSheet} from 'react-native'

function SmallButton({name,onPress,styleName}) {
    const color= styleName === "confirmStyle" ? "white" : "#F2944E"
  return (
            <View>
                <Pressable onPress= {onPress}>
                    <Text style={[styles.smallButText,{color:color}]}>
                        {name}
                    </Text>
                </Pressable>
            </View>
  )
}

const styles= StyleSheet.create({
    smallButText:{
        lineHeight:21,
        fontFamily:"Roboto-Medium",
        fontSize:16,
    }
})
export default SmallButton