import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        placeholderTextColor={'#cacdd2'}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    height: 50,
    width: 330,
    borderRadius: 6,
    padding: 15,
    fontWeight: 'bold',
    fontSize:16
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
