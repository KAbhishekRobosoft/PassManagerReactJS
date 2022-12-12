import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Input = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <View style={[styles.inputTextView, hasError && styles.errorInput]}>
        <Image source={props.source} style={props.styleUser} />
        <View style={styles.placeholderView}>
          {value ? (
            <View style={styles.placeholder}>
              <Text style={styles.text}>{props.placeholder}</Text>
            </View>
          ) : (
            <></>
          )}
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={'#4F504F'}
            style={styles.textInput}
            keyboardType={props.keyboardType}
            value={value}
            secureTextEntry={props.secureTextEntry}
            returnKeyType={props.returnKey}
            defaultValue={props.default}
            onChangeText={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
          />
        </View>
      </View>

      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

export const Password = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <View style={[styles.inputTextView, hasError && styles.errorInput]}>
        <Image source={props.source} style={props.styleUser} />
        <View style={styles.placeholderView}>
          {value ? (
            <View style={styles.placeholder}>
              <Text style={styles.text}>{props.placeholder}</Text>
            </View>
          ) : (
            <></>
          )}
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={'#4F504F'}
            style={styles.textPassword}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            value={value}
            onChangeText={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
          />
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={props.onPress}>
            <Image
              source={require('../assets/images/eye.png')}
              style={styles.eye}
            />
          </TouchableOpacity>
        </View>
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

export const PlaceholderTextField = props => {
  const {
    field: {name, onBlur, onChange, value, ref},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <View style={styles.inputTextView2}>
        <View style={styles.placeholderView2}>
          {props.defaultValue  || props.value ? (
            <View style={styles.commonPlaceholder}>
              <Text style={styles.text}>{props.placeholder}</Text>
            </View>
          ) : (
            <></>
          )}
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={'#4F504F'}
            style={styles.typedText}
            keyboardType={props.keyboardType}
            value={value}
            defaultValue={props.default}
            ref={ref}
            selection={props.selection}
            onChangeText={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            editable={props.editable}
            selectTextOnFocus={props.selectTextOnFocus}
            
            {...inputProps}
          />
        </View>
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};
export const PlaceholderTextFieldOwnerManual = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;
  return (
    <View>
      <View style={styles.inputTextView3}>
        <View style={styles.placeholderView2}>
          {props.value || props.defaultValue ? (
            <View style={styles.commonPlaceholder}>
              <Text style={styles.text}>{props.placeholder}</Text>
            </View>
          ) : (
            <></>
          )}
          <TextInput
            name={props.name}
            placeholder={props.placeholder}
            placeholderTextColor={'#4F504F'}
            style={styles.typedText}
            keyboardType={props.keyboardType}
            value={props.value}
            editable={props.editable}
            onTouchStart={props.onTouchStart}
            defaultValue={props.defaultValue}
            onChangeText={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
          />
        </View>
      </View>
    </View>
  );
};
export const GarageInputField = props => {
  return (
    <>
      {props.disabled ? (
        <Pressable onPress={props.onPress} disabled={props.disabled}>
          <View style={styles.garageView2}>
            <Image source={props.source} style={styles.imageIcons} />
            <Text style={styles.optionsText}>{props.text}</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={props.onPress} disabled={props.disabled}>
          <View style={styles.garageView}>
            <Image source={props.source} style={styles.imageIcons} />
            <Text style={styles.optionsText}>{props.text}</Text>
          </View>
        </Pressable>
      )}
    </>
  );
};

export const DropDownInputField = props => {
  return (
    <View>
      <View style={{height: 25, marginTop: 15, paddingLeft: 5, paddingTop: 6,}}>
        {props.values ? (
          <View>
            <Text style={styles.text}>{props.placeholder}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{marginTop: -38}}>
        <SelectList
        
          defaultOption={props.defaultOption}
          data={props.data}
          setSelected={props.setSelected}
          boxStyles={styles.dropDownBox}
          inputStyles={styles.dropDropInput}
          dropdownStyles={styles.dropDown}
          values={props.values}
          placeholder={props.placeholder}
          dropdownTextStyles={styles.dropDownText}
          arrowicon={
            <Icon name="sort-down" color="rgba(0,0,0,0.54)" size={16} />
          }
          closeicon={<Icon name="sort-up" color="rgba(0,0,0,0.54)" size={16} />}
          search={false}
        />
      </View>
    </View>
  );
};

export const DropDownInputField2 = props => {
  return (
    <View style={{marginTop: -30}}>
      <View style={{height: 25, marginTop: 15, paddingLeft: 5, paddingTop: 6,}}>
        {props.values ? (
          <View>
            <Text style={styles.text}>{props.placeholder}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{marginTop: -38}}>
        <SelectList
          data={props.data}
          setSelected={props.setSelected}
          boxStyles={styles.dropDownBox}
          inputStyles={styles.dropDropInput}
          dropdownStyles={styles.dropDown}
          values={props.values}
          placeholder={props.placeholder}
          dropdownTextStyles={styles.dropDownText}
          arrowicon={
            <Icon name="sort-down" color="rgba(0,0,0,0.54)" size={16} />
          }
          closeicon={<Icon name="sort-up" color="rgba(0,0,0,0.54)" size={16} />}
          search={false}
        />
      </View>
    </View>
  );
};

export const BookingDetailsInput = props => {
  return (
    <View style={styles.textInputView}>
      <Text style={styles.titleText}>{props.title}</Text>
      <Text>:</Text>
      <TextInput
        style={styles.textInputText}
        editable={props.editable}
        name="mobile"
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTextView: {
    width: '80%',
    height: 60,
    flexDirection: 'row',
    marginTop: 25,
    borderColor: '#B4B3B3',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginLeft: 40,
    alignItems: 'flex-end',
  },
  inputTextView2: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginTop: 25,
    borderColor: '#B4B3B3',
    borderBottomWidth: 1,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  inputTextView3: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    marginTop: 25,
    borderColor: '#B4B3B3',
    borderBottomWidth: 1,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  inputView: {
    width: '90%',
  },
  imageUserView: {
    height: 26,
    width: '8%',
  },
  textInput: {
    marginVertical: Platform.OS === 'android' ? -28 : -8,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
    height: Platform.OS === 'android' ? 65 : 30,
  },
  textPassword: {
    width: '90%',
    marginVertical: Platform.OS === 'android' ? -17 : -3,
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
  },
  typedText: {
    width: '100%',
    marginVertical: Platform.OS === 'android' ? -17 : -3,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
  },
  user: {
    width: 23,
    height: 23.78,
  },
  lockImg: {
    width: 24,
    height: 24,
  },

  eye: {
    width: 24,
    height: 14,
  },

  iconView: {
    paddingTop: 45,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  text: {
    height: 17,
    color: '#9F9F9F',
    fontSize: 14,
    letterSpacing: 0.29,
    lineHeight: 17,
  },
  placeholder: {
    marginLeft: 10,
    paddingBottom: 5,
  },
  placeholderView: {
    flexDirection: 'column',
    width: '85%',
  },
  placeholderView2: {
    flexDirection: 'column',
    width: '100%',
  },
  commonPlaceholder: {
    paddingBottom: 5,
  },
  garageView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderBottomColor: 'rgba(151,151,151,0.85)',
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  garageView2: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderBottomColor: 'rgba(151,151,151,0.85)',
    borderBottomWidth: 1,
    paddingLeft: 20,
    opacity: 0.5,
  },
  imageIcons: {
    height: 32,
    width: 31,
    resizeMode: 'contain',
  },
  optionsText: {
    color: '#515251',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginLeft: 10,
  },
  container: {
    flexDirection: 'column',
  },
  dropDownBox: {
    height: 41,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginVertical: 35,
    borderBottomWidth: 1,
    borderTopColor: '#FFFFFF',
    borderEndColor: '#FFFFFF',
    borderStartColor: '#FFFFFF',
    borderBottomColor: '#B4B3B3',
  },
  dropDropInput: {
    height: Platform.OS === 'ios' ? 20 : 24,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
    alignSelf: 'center',
    marginLeft: -16.5,
  },
  dropDown: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderRadius: 4,
    bottom: 35,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
    bottom: 35,
  },
  dropDownText: {
    height: 20,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
    marginLeft: -15,
  },
  textInputView: {
    marginHorizontal: 25,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 3,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
    // borderWidth: 1,
    alignItems: 'center'
  },
  titleText: {
    paddingBottom: 5,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4F504F',
    width: '35%',
  },
  textInputText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4F504F',
    width: '80%',
    textAlign: 'left',
  },
});
