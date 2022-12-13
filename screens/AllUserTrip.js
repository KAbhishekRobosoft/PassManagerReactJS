import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AllTripList from '../components/AllTripList';
import {SearchAllUserInputTrips} from '../services/Trips';
import {getVerifiedKeys} from '../utils/Functions';
import {SearchAllUserTrips} from '../services/Trips';
import {setToken} from '../redux/AuthSlice';
import {setLoading} from '../redux/MileStoneSlice';
import {deSetLoading} from '../redux/MileStoneSlice';
import Toast from 'react-native-simple-toast';

const AllUserTrip = ({navigation}) => {
  const [tripDetails, setTripDetails] = useState([]);
  const [tripDetails2, setTripDetails2] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchTrips, setSearchTrips] = useState([]);
  const authData = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const loading = useSelector(state => state.milestone.isLoading);

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      const key = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(key));
      const tripdata = await SearchAllUserTrips(key);
      setTripDetails(tripdata);
      setTripDetails2(tripdata);
      dispatch(setLoading());
    }, 500);
  }, [state]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const tripdata = await SearchAllUserTrips(cred);
    if (tripdata !== undefined) {
      Toast.show('Loading All Trips');
      setTripDetails(tripdata);
    } else {
      Toast.show('Unable to Load Trips');
    }
    setRefreshing(false);
  }, []);

  const renderItem = details => {
    return <AllTripList data={details.item} navigation={navigation} />;
  };
  const handleSearch = async value => {
    const key = await getVerifiedKeys(authData.userToken);
    const response = await SearchAllUserInputTrips(key, value);
    setTripDetails(response);
    setSearchTrips(response);
    setSearch(true);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.searchView}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          name="Search a Trip"
          placeholder="Search a Trip"
          placeholderTextColor="rgba(166,166,166,0.87)"
          fontFamily="Roboto-Medium"
          fontSize={12}
          alignSelf={'center'}
          marginLeft={6}
          onChangeText={text => handleSearch(text)}
          style={styles.inputText}
        />
      </View>
      {tripDetails2.length === 0 && (
        <ScrollView>
          <View style={styles.NoTripView}>
            <Image
              style={styles.img}
              source={require('../assets/images/Illustration_5.png')}
            />
            <Text style={styles.NoTripText}>
              You are not part of any trip at the moment.
            </Text>
          </View>
        </ScrollView>
      )}

      {tripDetails.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tripDetails}
          keyExtractor={details => details._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {search
        ? searchTrips.length === 0 && (
            <>
              <Text style={styles.NoResultText}>No results found!</Text>
            </>
          )
        : null}

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateTrip')}>
        <Image source={require('../assets/images/addtrip.png')} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchView: {
    height: 40,
    width: '90%',
    marginTop: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
    backgroundColor: 'white',
  },

  inputText: {
    marginLeft: 10,
    width: '100%',
    height: 40
  },

  searchIcon: {
    tintColor: 'grey',
    alignSelf: 'center',
    marginLeft: 12,
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    position: 'absolute',
    bottom: 50,
    right: 20,
    height: 65,
    paddingBottom: 15,
  },
  NoTripView: {
    marginTop: 90,
  },
  img: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  NoTripText: {
    color: '#4F504F',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    marginVertical: 10,
  },
  NoResultText: {
    color: '#4F504F',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    marginTop: '50%',
  },
});

export default AllUserTrip;
