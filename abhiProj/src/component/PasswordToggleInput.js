import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function PasswordToggleInput(props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [iconName, setIconName] = useState('eye');

  function onIconPress() {
    let iconName = secureTextEntry ? 'eye-slash' : 'eye';
    setSecureTextEntry(!secureTextEntry);
    setIconName(iconName);
  }

  const {
    field: {name, onBlur, onChange,value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <TextInput
            value={value}
            placeholderTextColor={'#cacdd2'}
            onChangeText={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
            secureTextEntry={secureTextEntry}
            style={[styles.textInput, hasError && styles.errorInput]}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            borderBottomRightRadius: 6,
            borderTopRightRadius: 6,
          }}>
          <TouchableOpacity onPress={onIconPress}>
            <Icon style={{margin: 15}} name={iconName} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    height: 50,
    width: 275,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default PasswordToggleInput;
