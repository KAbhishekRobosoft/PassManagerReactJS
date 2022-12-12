import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Toast
} from 'react-native';

import { uploadImage } from '../services/UserCredentials';
import SmallButton from '../components/SmallButton';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setImage} from '../redux/AuthSlice';
import {setToken} from '../redux/AuthSlice';
import {getVerifiedKeys} from '../utils/Functions';
import { profileData } from '../services/Profile';
import { setLoading } from '../redux/MileStoneSlice';
import { deSetLoading } from '../redux/MileStoneSlice';

function RegisterUserIntro({navigation}) {
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);
  const [personData, setPersonData] = useState({});
  const loading= useSelector(state=>state.milestone.isLoading)

  useEffect(() => {
    dispatch(deSetLoading())
    setTimeout(async () => {
      const cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const data = await profileData(cred, authData.userCredentials.mobile);
      setPersonData(data);
      dispatch(setLoading())
    }, 500);
  }, []);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(async image => {
      const payload = new FormData();
      payload.append('image', {
        uri: image.path,
        type: image.mime,
        name: `${image.filename}.${image.mime.substring(
          image.mime.indexOf('/') + 1,
        )}`,
      });
      let cred = await getVerifiedKeys(authData.userToken);
      const resp = await uploadImage(payload, cred);
      if (resp.hasOwnProperty('message')) {
        dispatch(setImage('https' + resp.url.substring(4)));
        navigation.navigate('ImageSuccess');
      }
    }).catch(er=>Toast.show("User cancelled selection"))
  };

  const {width, height} = useWindowDimensions();
  const marginTop = height > width ? (Platform.OS === 'ios' ? 220 : 200) : 118;

  if(loading){
    return(
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large" color="orange" />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.rUserCon}>
      <View style={styles.rUserBut}>
        <SmallButton
          onPress={() => {
            navigation.navigate('ImageSuccess');
          }}
          name="Skip"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rUserSubCon}>
          <View style={styles.rUserSubCon}>
            <Image
              style={styles.rUserImg}
              source={require('../assets/images/photoless.png')}
            />
            <Text style={styles.rUserName}>
              Hey {personData?.userDetails?.userName}!!
            </Text>
            <Text style={styles.rUserSug1}>to make it more cool select</Text>
            <Text style={styles.rUserSug2}>your avatar.</Text>
          </View>
          <View style={[styles.rUserPicOptions, {marginTop: marginTop}]}>
            <View style={styles.rUserOptions1}>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{alignItems: 'center'}}>
                <Image
                  style={styles.galleryImg1}
                  source={require('../assets/images/gallery.png')}
                />
                <Text style={styles.galleryText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.rUserOptions2}>
              <View>
                <Image
                  style={styles.galleryImg}
                  source={require('../assets/images/photo-camera.png')}
                />
                <Text style={styles.galleryText}>Take photo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rUserCon: {
    flex: 1,
  },

  galleryText: {
    marginTop: 12,
    color: '#F7931E',
  },

  galleryImg: {
    width: 35,
    height: 28,
    left:15
  },

  galleryImg1: {
    width: 35,
    height: 28,
  },

  rUserOptions1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 155,
    borderRightWidth: 1,
    borderRightColor: '#e7e7e7',
  },

  rUserOptions2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 155,
  },

  rUserPicOptions: {
    flexDirection: 'row',
    width: '100%',
    height: 155,
    marginVertical: 10,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  rUserName: {
    marginTop: 42,
    lineHeight: 23,
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
  },

  rUserSug1: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F504F',
  },

  rUserSug2: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F504F',
  },

  rUserImg: {
    height: 180,
    width: 246,
    marginTop: 13,
  },
  rUserSubCon: {
    flex: 1,
    alignItems: 'center',
  },

  rUserBut: {
    alignSelf: 'flex-end',
    marginTop: 19,
    marginRight: 20,
  },
});

export default RegisterUserIntro;
