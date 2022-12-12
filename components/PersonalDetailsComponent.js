import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import { getOwnerDetails } from '../services/OwnerAndBike';
import {useDispatch, useSelector} from 'react-redux';
import {getVerifiedKeys} from '../utils/Functions';
import {setUserData} from '../redux/AuthSlice';
import {deSetLoading, setLoading} from '../redux/MileStoneSlice';

export const PersonalDetails = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth.userData);
  const authData = useSelector(state => state.auth);
  const loading = useSelector(state => state.milestone.isLoading);


  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      let cred = await getVerifiedKeys(authData.userToken);
      const response = await getOwnerDetails(cred);
      dispatch(setUserData(response[0]));
      dispatch(setLoading());
    }, 1000);
  }, [userDetails?.pincode]);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.scrollView}
    showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <Text style={styles.text}>Licence No.</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Licence"
              editable={false}
              placeholderTextColor="#4F504F"
              defaultValue={userDetails?.lisenceNumber}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Name</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              editable={false}
              placeholderTextColor="#4F504F"
              defaultValue={userDetails?.userName}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Door No.</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Door"
              editable={false}
              placeholderTextColor="#4F504F"
              defaultValue={userDetails?.doorNumber}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>City</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="City"
              editable={false}
              placeholderTextColor="#4F504F"
              defaultValue={userDetails?.city}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>State</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="State"
              editable={false}
              placeholderTextColor="#4F504F"
              defaultValue={userDetails?.state}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Pincode</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Pincode"
              editable={false}
              placeholderTextColor="#4F504F"
             defaultValue={JSON.stringify(userDetails?.pincode)}
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.text}>Mobile</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Mobile"
              editable={false}
              keyboardType="numeric"
              placeholderTextColor="#4F504F"
              defaultValue={userDetails?.mobile}
            />
          </View>
        </View>
        <View style={styles.inputViewLast}>
          <Text style={styles.text}>Email</Text>
          <View style={styles.inputTextView}>
            <Text>:</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              editable={false}
              placeholderTextColor="#4F504F"
              defaultValue={userDetails?.email}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    shadowColor: 'rgba(175,170,170,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.9,
    elevation: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  inputView: {
    width: '89%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    paddingTop: 30,
  },
  inputViewLast: {
    width: '86%',
    height: 70,
    borderBottomColor: '#B4B3B3',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    color: '#4F504F',
    textAlign: 'left',
    lineHeight: 42,
    width: 90,
  },
  inputText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4F504F',
    textAlign: 'center',
    width: '80%',
  },
  inputTextView: {
    alignItems: 'center',
    width: '68%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
