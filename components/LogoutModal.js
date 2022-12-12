import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import { logOut,deSetRegistered } from '../redux/AuthSlice';
import { removeBikeType } from '../redux/AccessoriesSlice';
import { removeBikeData } from '../redux/AccessoriesSlice';
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogoutModal({navigation}) {
  const dispatch = useDispatch();
  const hadBike = useSelector(state => state.auth.userCredentials);
  const [modalVisible, setModalVisible] = useState(false);
  const {width, height} = useWindowDimensions();
  const top = width > height ? (Platform.OS === 'ios' ? 22 : 22) : 10;
  const bottom = width > height ? (Platform.OS === 'ios' ? 60 : 60) : Platform.OS === "ios" ? 80 : 60;

  async function checkOut() {
    try {
      dispatch(removeBikeType());
      dispatch(removeBikeData());
      dispatch(deSetRegistered());
      Toast.show('Logged Out');
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.buttonStyle, {top: top}]}>
        <Image
          source={require('../assets/images/more.png')}
          style={{
            tintColor: 'white',
            width: 22,
            height: 22,
            resizeMode: 'contain',
          }}
        />
      </Pressable>

      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={[styles.contentView,{bottom:bottom}]}>
          <View style={styles.content}>
            {hadBike.haveBike ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ED7E2B', '#F4A264']}
                style={{borderRadius: 10,width:'80%',}}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('AddBikeDetails');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    borderRadius: 10,
                  }}>
                  <Icon
                    color="white"
                    style={{right: 10}}
                    size={25}
                    name="bicycle-outline"
                  />
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 16,
                      left: 5,
                      color: 'white',
                    }}>
                    Add Bike
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ED7E2B', '#F4A264']}
                style={{borderRadius: 10, opacity: 0.6,width:"80%"}}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 50,
                    borderRadius: 10,
                  }}>
                  <Icon
                    color="white"
                    style={{right: 10}}
                    size={25}
                    name="bicycle-outline"
                  />
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 16,
                      left: 5,
                      color: 'white',
                    }}>
                    Add Bike
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF0000', '#F36870']}
              style={{borderRadius: 10, top: 10,width:"80%"}}>
              <TouchableOpacity
                onPress={() => {
                  checkOut();
                  dispatch(logOut());
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 50,
                  borderRadius: 10,
                }}>
                <Icon
                  color="white"
                  style={{right: 10}}
                  size={25}
                  name="log-out-outline"
                />
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                    left: 5,
                    color: 'white',
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    alignItems:"center"
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonStyle: {
    height: 90,
    width: 90,
    borderRadius: 100,
    left: 30,
  },
});

export default LogoutModal;
