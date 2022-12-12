import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {profileData} from '../services/Profile';
import {getVerifiedKeys} from '../utils/Functions';
import {setLoading, deSetLoading} from '../redux/MileStoneSlice';
import {setToken} from '../redux/AuthSlice';
import {setInitialState} from '../redux/MileStoneSlice';
import Toast from 'react-native-simple-toast';
import {followRider} from '../services/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewProfileScreen = ({navigation, route}) => {
  const [personData, setPersonData] = useState({});
  const token = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.milestone.isLoading);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      dispatch(deSetLoading());
      const cred = await getVerifiedKeys(token.userToken);
      dispatch(setToken(cred));
      const data = await profileData(cred, route.params.mobile);
      setPersonData(data);
      dispatch(setLoading());
    }, 500);
  }, [state]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const cred = await getVerifiedKeys(token.userToken);
      dispatch(setToken(cred));
      const data = await profileData(cred, route.params.mobile);
      Toast.show('Updating Profile');
      setPersonData(data);
    } catch (error) {
      Toast.show('Error occured in Refreshing');
    }
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {JSON.stringify(personData) !== '{}' && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#ED7E2C', '#F7B557']}
            style={styles.gradientCreateButton}>
            <ImageBackground
              source={require('../assets/images/profilebike.png')}
              resizeMode="cover"
              style={styles.backgroundImage}></ImageBackground>
            <Pressable
              onPress={() => {
                navigation.goBack();
                dispatch(setInitialState(state));
              }}>
              <Icon
                name="md-arrow-back"
                color="white"
                size={25}
                style={styles.icon}
              />
            </Pressable>
            <View style={styles.profileContainer}>
              {personData.userDetails.hasOwnProperty('profileImage') ? (
                <Image
                  source={{
                    uri:
                      'https' +
                      personData.userDetails.profileImage.substring(4),
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../assets/images/photoless.png')}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.profileName}>
                {personData?.userDetails?.userName}
              </Text>
              <Text style={styles.bioText}>
                {personData?.userDetails?.aboutUser}
              </Text>
              {personData.userDetails.followers.filter(
                ele => ele.followerPhone === token.userCredentials.mobile,
              ).length === 0 ? (
                <Pressable
                  onPress={async () => {
                    const cred = await getVerifiedKeys(token.userToken);
                    dispatch(setToken(cred));
                    const resp = await followRider(cred, route.params.mobile);
                    if (resp !== undefined) {
                      dispatch(setInitialState(state));
                      Toast.show('Follow status updated');
                    } else {
                      Toast.show('Error Occurred');
                    }
                  }}>
                  <View style={styles.followContainer}>
                    <Text style={styles.followText}>Follow</Text>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={async () => {
                    const cred = await getVerifiedKeys(token.userToken);
                    dispatch(setToken(cred));
                    const resp = await followRider(cred, route.params.mobile);
                    if (resp !== undefined) {
                      dispatch(setInitialState(state));
                      Toast.show('Follow status updated');
                    } else {
                      Toast.show('Error Occurred');
                    }
                  }}>
                  <View style={styles.followContainer1}>
                    <Text style={styles.followText}>Following</Text>
                  </View>
                </Pressable>
              )}
            </View>
          </LinearGradient>
        )}
        <View style={styles.detailContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.detailText}>Rides</Text>
            <Text style={styles.numberText}>{personData?.tripCount}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.textContainer}>
            <Text style={styles.detailText}>Following</Text>
            <Text style={styles.numberText}>
              {personData?.userDetails?.followingCount}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.textContainer}>
            <Text style={styles.detailText}>Followers</Text>
            <Text style={styles.numberText}>
              {personData?.userDetails?.followersCount}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  gradientCreateButton: {
    height: 341,
    shadowColor: 'rgba(0,0,0,0.5)',
  },

  backgroundImage: {
    opacity: 0.06,
    flex: 1,
    height: 301,
    flexWrap: 'nowrap',
    marginTop: 20,
    left: '37%',
    position: 'absolute',
    width: '100%',
  },

  profileContainer: {
    alignItems: 'center',
    height: 300,
    width: '100%',
  },

  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 65,
    marginBottom: 10,
    borderColor: '#FFFFFF',
  },

  followContainer: {
    height: 28,
    borderColor: '#FFFFFF',
    borderRadius: 15.5,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  followText: {
    color: '#FFFFFF',
    height: 19,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '500',
    letterSpacing: 0,
  },

  profileName: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0,
  },

  bioText: {
    color: '#FFFFFF',
    height: 28,
    lineHeight: 28,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
    letterSpacing: 0,
    marginBottom: 10,
  },

  detailContainer: {
    height: 71,
    width: '90%',
    alignSelf: 'center',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: 'rgba(95,95,95,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
  },

  line: {
    borderLeftWidth: 1,
    height: 44,
    opacity: 0.19,
    borderColor: '#979797;',
  },

  detailText: {
    color: '#7E7D7D',
    fontFamily: 'Roboto',
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
    marginBottom: 5,
    width: 100,
    textAlign: 'center',
  },

  numberText: {
    color: '#EE8330',
    fontFamily: 'Roboto',
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '500',
    width: 100,
    textAlign: 'center',
  },

  editIcon: {
    tintColor: '#FFFFFF',
    height: 20,
    width: 20,
    marginLeft: '90%',
    marginTop: '5%',
  },

  icon: {
    left: 20,
    top: 10,
  },

  activitiText: {
    color: '#616161',
    height: 28,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '500',
    lineHeight: 28,
    marginLeft: 21,
    bottom: 20,
  },

  followContainer1: {
    height: 28,
    borderColor: '#FFFFFF',
    borderRadius: 15.5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});

export default ViewProfileScreen;
