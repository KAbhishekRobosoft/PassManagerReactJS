import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  TextInput,
  StatusBar
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import {LargeButton} from '../components/Button';
import {addReview, addReviewImage} from '../services/Places';
import {getVerifiedKeys} from '../utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/AuthSlice';
import {setInitialState2} from '../redux/AuthSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function AddReviewScreen({navigation, route}) {
  const [imgArray, setImgArray] = useState([]);
  const {height, width} = useWindowDimensions();
  const [text, setText] = useState('');
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const state2 = useSelector(state => state.auth.initialState2);
  const [revewing, setReviewing] = useState(false);

  const left =
    width > height
      ? Platform.OS === 'ios'
        ? 280
        : 280
      : Platform.OS === 'ios'
      ? 90
      : 90;

  const top =
    width > height
      ? Platform.OS === 'ios'
        ? 280
        : 280
      : Platform.OS === 'ios'
      ? 230
      : 250;

  const height1 =
    width > height
      ? Platform.OS === 'ios'
        ? 280
        : 190
      : Platform.OS === 'ios'
      ? 200
      : 190;

  const sendReview = async () => {
    let cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    let resp;
    let resp1;
    if (imgArray.length > 0) {
      const payload = new FormData();
      payload.append('_id', route.params.id);
      for (let i = 0; i < imgArray.length; i++) {
        payload.append(imgArray[i].name, {
          uri: imgArray[i].path,
          type: imgArray[i].mime,
          name: `${imgArray[i].filename}.${imgArray[i].mime.substring(
            imgArray[i].mime.indexOf('/') + 1,
          )}`,
        });
      }
      resp = await addReviewImage(payload, cred);
    }
    resp1 = await addReview(cred, text, route.params.id);

    if (resp1 !== undefined) {
      if (resp1.message === 'Already reviewed this particular place') {
        setImgArray([]);
        setText('');
        Toast.show('Already Reviewed');
      } else {
        setReviewing(true);
        setImgArray([]);
        setText('');
        dispatch(setInitialState2(state2))
        navigation.goBack()
        Toast.show('Review Added');
      }
    }
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(async image => {
        const obj = {
          id: uuid.v4(),
          name: 'image',
          path: image.path,
          fileName: image.filename,
          mime: image.mime,
        };
        setImgArray(prevVal => [...prevVal, obj]);
      })
      .catch(er => Toast.show('User cancelled selection'));
  };

  return (
    <KeyboardAwareScrollView enableAutomaticScroll={true}>
      <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#370F24" />
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
          <Text style={[styles.reviewHotelText, {marginLeft: left}]}>
            Add Review
          </Text>
        </View>
        <View>
          <Text style={styles.writeReview}>Write Review</Text>
          <TextInput
            onChangeText={val => {
              setText(val);
            }}
            style={[styles.inputStyle, {height: height1}]}
            multiline={true}
            numberOfLines={8}
          />
          <Text style={styles.addPhotosText}>Add a photos to your review</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'center',
              marginTop: 20,
              flexWrap: 'wrap',
            }}>
            {imgArray.length > 0
              ? imgArray.map(ele => {
                  return (
                    <Image
                      key={ele.id}
                      style={styles.postedImage}
                      source={{uri: ele.path}}
                    />
                  );
                })
              : null}
            <TouchableOpacity
              onPress={() => {
                if (imgArray.length < 5) {
                  pickImage();
                } else {
                  Toast.show('Maximum of 5 images can be posted');
                }
              }}>
              <Image
                style={styles.cameraImg}
                source={require('../assets/images/camera.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: top}}>
          <LargeButton
            title="Submit"
            backgroundColor="#351347"
            width="100%"
            borderRadius="0"
            fontFamily="Avenir Medium"
            onPress={() => {
              if (text.length > 0 && !/^\s*$/.test(text)) {
                sendReview();
              } else {
                Toast.show('Please enter your reviews');
              }
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  reviewHotelText: {
    fontFamily: 'Avenir Book',
    color: 'white',
    fontSize: 20,
  },

  cameraImg: {
    height: 70,
    width: 70,
    marginLeft: 5,
    marginTop: 5,
  },

  postedImage: {
    height: 70,
    width: 70,
    borderRadius: 6,
    marginLeft: 3,
  },

  addPhotosText: {
    fontFamily: 'Avenir Book',
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    color: '#351347',
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

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  backIcon: {
    height: 20,
    width: 20,
  },

  reviewHeader: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#370F24',
  },

  writeReview: {
    marginTop: 25,
    marginLeft: 20,
    fontFamily: 'Avenir Book',
    color: '#351347',
    fontSize: 20,
  },
});
export default AddReviewScreen;
