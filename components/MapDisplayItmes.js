import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import GetLocation from 'react-native-get-location';
import {getNearbyPlaces} from '../services/Maps';
import {shareLocation} from '../services/Maps';
import {getVerifiedKeys} from '../utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/AuthSlice';
import PopUpMenu from './PopUpMenu';
import {endTrip} from '../services/Trips';
import Toast from 'react-native-simple-toast';
import {setInitialState} from '../redux/MileStoneSlice';

export const MapNavBar = ({
  navigation,
  setAtm,
  setFood,
  setFuel,
  setSleep,
  setData,
  id,
  mobile,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);

  return (
    <View style={styles.navBar}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          name="md-arrow-back"
          color={'grey'}
          size={25}
          style={styles.icon}
        />
      </Pressable>
      <Pressable
        onPress={async () => {
          setAtm(true);
          setSleep(false);
          setFuel(false);
          setFood(false);
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(async location => {
              const res = await getNearbyPlaces(
                'atm',
                location.latitude,
                location.longitude,
              );
              setData(res.results);
            })
            .catch(error => {
              Toast.show('Turn on the location');
            });
        }}>
        <Image
          source={require('../assets/images/insertcard.png')}
          style={{
            height: 24,
            width: 24,
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setAtm(false);
          setSleep(false);
          setFuel(true);
          setFood(false);
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(async location => {
              const res = await getNearbyPlaces(
                'fuel',
                location.latitude,
                location.longitude,
              );
              setData(res.results);
            })
            .catch(error => {
              Toast.show('Turn on the location');
            });
        }}>
        <Image
          source={require('../assets/images/gasstation.png')}
          style={{
            height: 24,
            width: 21,
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setAtm(false);
          setSleep(true);
          setFuel(false);
          setFood(false);
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(async location => {
              const res = await getNearbyPlaces(
                'lodge',
                location.latitude,
                location.longitude,
              );
              setData(res.results);
            })
            .catch(error => {
              Toast.show('Turn on the location');
            });
        }}>
        <Image
          source={require('../assets/images/bed.png')}
          style={{
            height: 18,
            width: 24,
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setAtm(false);
          setSleep(false);
          setFuel(false);
          setFood(true);
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(async location => {
              const res = await getNearbyPlaces(
                'hotel',
                location.latitude,
                location.longitude,
              );
              setData(res.results);
            })
            .catch(error => {
              Toast.show('Turn on the location');
            });
        }}>
        <Image
          source={require('../assets/images/restaurant.png')}
          style={styles.icon}
        />
      </Pressable>
      <PopUpMenu
        color="orange"
        size={25}
        options={[
          {
            title: 'End Trip',
            action: async () => {
              if (auth.userCredentials.mobile === mobile) {
                const cred = await getVerifiedKeys(auth.userToken);
                dispatch(setToken(cred));
                const resp = await endTrip(id, cred);
                if (resp !== undefined) {
                  navigation.navigate('BottomTabLoginNavigation');
                  dispatch(setInitialState(state));
                  Toast.show('Trip Ended');
                } else {
                  Toast.show("Couldn't end the trip");
                }
              } else {
                Toast.show('Only admin can end the trip');
              }
            },
          },
          {
            title: 'Clear',
            action: () => {
              setAtm(false);
              setSleep(false);
              setFuel(false);
              setFood(false);
            },
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(172,165,165,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  icon: {
    height: 24,
    width: 24,
  },
  gradientCreateButton: {
    height: 45,
    shadowColor: 'rgba(126,118,118,0.5)',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  
  },

  indicatorContiner: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
  },
});

export default MapNavBar;

export const MapBottomBar = ({musicControlIcon, musicControl, id}) => {
  const {height, width} = useWindowDimensions();
  const top = width > height ? (Platform.OS === 'ios' ? '10%' : '1%') : 0;
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#ED7E2B', '#F4A264']}
      style={[styles.gradientCreateButton]}>
      <Pressable
        style={{}}
        onPress={() => {
          musicControl();
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(async location => {
              const cred = await getVerifiedKeys(authData.userToken);
              dispatch(setToken(cred));
              const resp = await shareLocation(
                id,
                [{latitude: location.latitude, longitude: location.longitude}],
                cred,
              );
              if (resp !== undefined) {
                Toast.show('Location updation successfull');
              }
            })
            .catch(error => {
              Toast.show('Network Error');
            });
        }}>
        <Icon
          name={musicControlIcon}
          color={'white'}
          size={30}
          style={{height: 35, width: 35}}
        />
      </Pressable>
    </LinearGradient>
  );
};

export const MapChatButton = ({
  setLatitude,
  setLongitude,
  navigation,
  tripName,
  id,
  mobile,
  rider,
}) => {
  const {height, width} = useWindowDimensions();
  const top =
    width > height
      ? Platform.OS === 'ios'
        ? 80
        : 80
      : Platform.OS === 'ios'
      ? 480
      : 490;
  const left = width > height ? (Platform.OS === 'ios' ? '85%' : '85%') : '75%';
  const state = useSelector(state => state.milestone.initialState);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        top: top,
        left: left,
      }}>
      <Pressable
        onPress={() => {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(async location => {
              setLatitude(location.latitude);
              setLongitude(location.longitude);
              dispatch(setInitialState(state));
            })
            .catch(error => {
              Toast.show('Turn on the location');
            });
        }}>
        <View style={styles.indicatorContiner}>
          <Icon1 name="gps-fixed" color={'#A4A4A4'} size={25} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('ChatScreen', {
            tripName: tripName,
            id: id,
            mobile: mobile,
            riders: rider,
          });
        }}>
        <Image source={require('../assets/images/wechat.png')} />
      </Pressable>
    </View>
  );
};
