import React from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {View, StyleSheet,Text} from 'react-native';

function CustomField(props) {
  const {
    field: {name, onBlur, onChange, value, placeholder},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <TextField
        keyboardType={props.keyboardType}
        labelFontSize={16}
        baseColor="#b5abab"
        textColor="white"
        lineWidth={1}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        labelTextStyle={{alignSelf: 'center', color: 'white'}}
        style={[
          hasError && styles.errorInput,
          {textAlign: 'center', fontSize: 18},
        ]}
        containerStyle={{width: '90%', alignSelf: 'center',height:75}}
        tintColor="#b5abab"
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({

  errorText: {
    fontSize: 10,
    color: 'red',
    textAlign:"center"
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomField;
