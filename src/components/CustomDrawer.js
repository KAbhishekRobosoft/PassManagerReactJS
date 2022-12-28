import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logOut} from '../redux/AuthSlice';
import {useDispatch, u, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {getProfile} from '../services/UserCredentials';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {setLoader, desetLoader} from '../redux/AuthSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImage} from '../services/UserCredentials';
import {setInitialState} from '../redux/AuthSlice';

function CustomDrawer(props) {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const authData = useSelector(state => state.auth);

  const height1 =
    width > height
      ? Platform.OS === 'ios'
        ? '50%'
        : '50%'
      : Platform.OS === 'ios'
      ? '28%'
      : '28%';

  const marginRight =
    width > height
      ? Platform.OS === 'ios'
        ? 70
        : 70
      : Platform.OS === 'ios'
      ? 8
      : 8;

  const marginTop =
    width > height
      ? Platform.OS === 'ios'
        ? 20
        : 20
      : Platform.OS === 'ios'
      ? 30
      : 20;

  useEffect(() => {
    if (authData.userToken !== null) {
      dispatch(setLoader());
      setTimeout(async () => {
        const cred = await getVerifiedKeys(authData.userToken);
        dispatch(setToken(cred));
        const response = await getProfile(cred);
        if (response !== undefined) {
          setUserData(response);
          dispatch(desetLoader());
        } else {
          Toast.show('Unable to get data');
        }
      }, 500);
    }
  }, [authData.initialState]);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(async image => {
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
          dispatch(setInitialState(authData.initialState));
          Toast.show('Profile Updated');
        }
      })
      .catch(er => Toast.show('User cancelled selection'));
  };

  return (
    <View style={styles.drawerView}>
      <ImageBackground
        blurRadius={20}
        style={styles.imgBack}
        source={require('../assets/images/drawerBack.png')}>
        {authData.userToken !== null ? (
          !authData.stateLoader && JSON.stringify(userData) !== '{}' ? (
            <View
              style={[
                styles.profileView,
                {height: height1, marginTop: marginTop},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  pickImage();
                }}>
                <Image
                  style={styles.profilePic}
                  source={{uri: 'https' + userData.userImage.substring(4)}}
                />
              </TouchableOpacity>
              <Text style={styles.profileText}>
                {userData.email.substring(0, userData.email.indexOf('@'))}
              </Text>
            </View>
          ) : (
            <View
              style={{
                height: height1,
                alignItems: 'center',
                marginTop: 20,
                width: '100%',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )
        ) : (
          <View
            style={[
              styles.profileView,
              {height: height1, marginTop: marginTop},
            ]}>
            <Image
              style={styles.profilePic1}
              source={require('../assets/images/noAccProfile.png')}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('login');
              }}>
              <View style={styles.iconHeader}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Avenir Book',
                    color: '#96888c',
                  }}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <DrawerContentScrollView {...props}>
          <View style={{marginVertical: 5}}>
            {authData.userToken !== null && <DrawerItemList {...props} />}
            {authData.userToken === null && (
              <>
                <View style={[styles.logoutView, {marginRight: marginRight}]}>
                  <TouchableOpacity style={styles.logout}>
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 8,
                        tintColor: 'grey',
                      }}
                      source={require('../assets/images/drawerFav.png')}
                    />
                    <Text style={styles.invalidText}>Favourites</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.logoutView, {marginRight: marginRight}]}>
                  <TouchableOpacity style={styles.logout}>
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 8,
                        tintColor: 'grey',
                      }}
                      source={require('../assets/images/feedback.png')}
                    />
                    <Text style={styles.invalidText}>Feedback</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.logoutView, {marginRight: marginRight}]}>
                  <TouchableOpacity
                    onPress={async () => {
                      props.navigation.navigate('aboutUs');
                    }}
                    style={styles.logout}>
                    <Image
                      style={{height: 25, width: 25, marginLeft: 8}}
                      source={require('../assets/images/aboutUs.png')}
                    />
                    <Text style={styles.buttonText}>About us</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.logoutView, {marginRight: marginRight}]}>
                  <TouchableOpacity style={styles.logout}>
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginLeft: 10,
                        tintColor: 'grey',
                      }}
                      source={require('../assets/images/logout.png')}
                    />
                    <Text style={styles.invalidText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {authData.userToken !== null && (
              <View style={[styles.logoutView, {marginRight: marginRight}]}>
                <TouchableOpacity
                  onPress={async () => {
                    Alert.alert(
                      'Confirm',
                      'Are you sure you want to Logout ?',
                      [
                        {
                          text: 'Yes',
                          onPress: async () => {
                            try {
                              await AsyncStorage.removeItem('token');
                              dispatch(logOut());
                            } catch (e) {
                              console.log(e);
                            }
                          },
                        },
                        {
                          text: 'No',
                          onPress: () => {
                            Toast.show('Logout cancelled');
                          },
                        },
                      ],
                    );
                  }}
                  style={styles.logout}>
                  <Image
                    style={{height: 25, width: 25, marginLeft: 15}}
                    source={require('../assets/images/logout.png')}
                  />
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </DrawerContentScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerView: {
    flex: 1,
  },

  buttonText: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'Avenir Medium',
    color: 'white',
  },

  logoutIcon: {
    marginLeft: 11,
  },

  logoutView: {
    borderBottomWidth: 1,
    borderBottomColor: '#52434D',
    width: '80%',
    alignSelf: 'center',
  },

  logout: {
    alignItems: 'center',
    width: '90%',
    height: 80,
    flexDirection: 'row',
  },

  profileText: {
    fontFamily: 'Avenir Book',
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 10,
  },

  profilePic: {
    height: 80,
    width: 80,
    marginTop: 40,
    borderRadius: 40,
  },

  iconHeader: {
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:8
  },

  profilePic1: {
    height: 80,
    width: 80,
    marginTop: 50,
    borderRadius: 40,
  },

  imgBack: {
    flex: 1,
  },

  profileView: {
    alignItems: 'center',
    width: '100%',
  },

  invalidText: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'Avenir Medium',
    color: 'grey',
  },
});

export default CustomDrawer;
