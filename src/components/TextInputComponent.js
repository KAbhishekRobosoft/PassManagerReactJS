import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function TextInputComponent({name, placeholder, onFocus, onChangeText}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.searchIcon}>
        <Icon name={name} size={22} color="#dfdfdf" />
      </View>
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        keyboardType="default"
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 18,
    padding: 5,
    width: '85%',
    height: 45,
    fontFamily: 'Avenir Book',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },

  searchIcon: {
    backgroundColor: 'white',
    height: 45,
    width: 40,
    padding: 10,
    borderColor: 'transparent',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
 
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"center"
  },
});

export default TextInputComponent;
