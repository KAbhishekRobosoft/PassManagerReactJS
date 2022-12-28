import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  TextInput,
  StatusBar
} from 'react-native';
import {addFeedback} from '../services/UserCredentials';
import {LargeButton} from '../components/Button';
import {getVerifiedKeys} from '../utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/AuthSlice';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function FeedBack({navigation}) {
  const {height, width} = useWindowDimensions();
  const [text, setText] = useState('');
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const textRef = useRef(null);

  const height1 =
    width > height
      ? Platform.OS === 'ios'
        ? 280
        : 190
      : Platform.OS === 'ios'
      ? 200
      : 210;

  const top =
    width > height
      ? Platform.OS === 'ios'
        ? 280
        : 280
      : Platform.OS === 'ios'
      ? 360
      : 360;

  async function addFeedback1() {
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const resp = await addFeedback(cred, text);
    if (resp !== undefined) {
      if (resp.message === 'feedback added successfully') {
        textRef.current.clear();
        Toast.show('Feedback added successfully');
      } else {
        Toast.show('Network Error');
      }
    }
  }

  return (
    <SafeAreaView style={styles.feedBackCon}>
       <StatusBar backgroundColor="#370F24" />
      <KeyboardAwareScrollView bounces={false}>
        <View style={styles.reviewHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={styles.iconHeader}>
              <Image
                style={styles.backIcon}
                source={require('../assets/images/back_icon.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.aboutText}>Feedback</Text>
        </View>

        <View>
          <Text style={styles.writeReview}>Write your FeedBack</Text>
          <TextInput
            ref={textRef}
            style={[styles.inputStyle, {height: height1}]}
            multiline={true}
            numberOfLines={8}
            onChangeText={val => {
              setText(val);
            }}
          />
        </View>

        <View style={{marginTop: top}}>
          <LargeButton
            title="Submit"
            backgroundColor="#351347"
            width="100%"
            borderRadius="0"
            fontFamily="Avenir Medium"
            onPress={() => {
              if (text.length > 0) {
                addFeedback1();
              } else {
                Toast.show('Please enter proper feedback');
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  feedBackCon: {
    flex: 1,
  },
  reviewHeader: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#370F24',
  },

  inputStyle: {
    marginTop: 15,
    width: '90%',
    borderWidth: 1,
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: 'Avenir Book',
    lineHeight: 20,
    fontSize: 18,
    color: '#8D8D8D',
    padding: 10,
  },

  writeReview: {
    marginTop: 25,
    marginLeft: 20,
    fontFamily: 'Avenir Book',
    color: '#351347',
    fontSize: 20,
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    height: 20,
    width: 20,
  },

  aboutText: {
    fontSize: 20,
    fontFamily: 'Avenir Book',
    color: 'white',
    width: '80%',
    textAlign: 'center',
  },
});

export default FeedBack;
