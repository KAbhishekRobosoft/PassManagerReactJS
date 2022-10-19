import React from 'react';
import {View,TextInput, StyleSheet, Platform} from 'react-native';

function Details(props) {
  const {
    field: {name, onBlur, onChange, value,multiLine,numberOfLines,defaultValue,editable},
    form: {setFieldTouched},
    ...inputProps
  } = props;

  return (
    <View style={styles.textInpView1}>
      <TextInput
        style={styles.textInp1}
        editable={editable}
        defaultValue={defaultValue}
        multiline={multiLine}
        numberOfLines={numberOfLines}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInpView1: {
    padding: 15,
  },

  textInp1: {
    height: Platform.OS === "ios" ? 45 : 35,
    width: 330,
    borderWidth: Platform.OS === "ios" ?  2 : 1,
    borderColor: Platform.OS === "ios" ? '#e9e9ea' : 'black',
    borderRadius: 6,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f5f7fb',
  },
});

export default Details;
