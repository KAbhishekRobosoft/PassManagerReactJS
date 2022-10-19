import React from 'react';
import Toast from 'react-native-simple-toast';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik, Field} from 'formik';
import Details from '../utils/Details';
import DropDown from '../utils/DropDown';
import PasswordInput from '../utils/PasswordInput';
import EntryButton from '../utils/EntryButton';
import {addData} from '../redux/AddDataSlice';
import {useDispatch} from 'react-redux';

function AddSite({navigation}) {
  const dispatch = useDispatch();

  async function sendData(obj) {
    if (obj === initialValues) Toast.show('Please enter Values');
    else {
      dispatch(addData(obj));
      navigation.navigate('List');
      Toast.show('Saved Successfully');
    }
  }

  const dataValue = {
    url: '',
    siteName: '',
    userName: '',
    password: '',
    notes: '',
  }

  const initialValues = {
    id: Math.floor(Math.random() * 1000),
    url: '',
    siteName: '',
    userName: '',
    password: '',
    notes: '',
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.bossCon}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          sendData(values);
        }}>
        {({handleSubmit, isValid, resetForm}) => (
          <View style={styles.main_con}>
            <View style={styles.con1}>
              <Text style={styles.text1}>URL</Text>
              <Field component={Details} name="url" />
            </View>
            <View>
              <Text style={styles.text1}>Site Name</Text>
              <Field component={Details} name="siteName" />
            </View>

            <View>
              <Text style={styles.text1}>Sector/Folder</Text>
              <Field component={DropDown} name="dropdown" />
            </View>

            <View>
              <Text style={styles.text1}>User Name</Text>
              <Field component={Details} name="userName" />
            </View>

            <View>
              <Text style={styles.text2}>Site Password</Text>
              <Field
                component={PasswordInput}
                name="password"
                secureTextEntry
              />
            </View>

            <View style={styles.notes}>
              <Text style={styles.text1}>Notes</Text>
              <Field
                component={Details}
                multiLine={true}
                numberOfLines={4}
                name="notes"
              />
            </View>

            <View style={styles.butView}>
              <View style={styles.but1}>
                <EntryButton
                  name="Reset"
                  onPress={() => resetForm({dataValue})}
                  disabled={!isValid}
                />
              </View>
              <View style={styles.but2}>
                <EntryButton
                  onPress={handleSubmit}
                  name="Save"
                  disabled={!isValid}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: Platform.OS === 'ios' ? 20 : 15,
    color: Platform.OS === 'ios' ? '#c9ccd1' : 'black',
    marginTop: Platform.OS === 'android' ? 5 : 0,
    marginLeft: Platform.OS === 'android' ? 18 : 20,
  },

  text2: {
    fontSize: Platform.OS === 'ios' ? 20 : 15,
    color: Platform.OS === 'ios' ? '#c9ccd1' : 'black',
    marginTop: Platform.OS === 'android' ? 5 : 0,
  },

  notes: {
    marginTop: 10,
    marginBottom: 5,
  },

  main_con: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 35 : 0,
  },

  but2: {
    marginLeft: 2,
    width: 195,
  },

  bossCon: {
    flex: 1,
    alignItems: 'center',
  },

  but1: {
    width: 195,
  },

  butView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 9 : 74,
  },

  con1: {
    marginTop: Platform.OS === 'android' ? 0 : 20,
  },
});
export default AddSite;
