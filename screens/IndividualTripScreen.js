import React, {useEffect, useState, useCallback} from 'react';
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
  Text,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AllTripList from '../components/AllTripList';
import {getBikeDetails, getOwnerDetails} from '../services/OwnerAndBike';
import {UserTrips} from '../services/Trips';
import {getVerifiedKeys} from '../utils/Functions';
import {SearchUserTrips} from '../services/Trips';
import {setToken, setUserData} from '../redux/AuthSlice';
import Toast from 'react-native-simple-toast';
import {addBikeData, addBikeType} from '../redux/AccessoriesSlice';
import {setInitialState} from '../redux/MileStoneSlice';
import {deSetLoading, setLoading} from '../redux/MileStoneSlice';

const AllTrips = ({navigation}) => {
  const [tripDetails, setTripDetails] = useState([]);
  const [tripDetails2, setTripDetails2] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchTrips, setSearchTrips] = useState([]);
  const authData = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);
  const [refreshing, setRefreshing] = useState(false);
  const loading = useSelector(state => state.milestone.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      try {
        const key = await getVerifiedKeys(authData.userToken);
        dispatch(setToken(key));
        const tripdata = await UserTrips(key);
        setTripDetails(tripdata);
        setTripDetails2(tripdata);
        dispatch(setLoading());
        let bikeResponse = await getBikeDetails(key);
        let BikeTypes = bikeResponse.map(e => {
          return e.vehicleType;
        });
        dispatch(addBikeType(BikeTypes));
        dispatch(addBikeData(bikeResponse));
        const response = await getOwnerDetails(key);
        dispatch(setUserData(response[0]));
      } catch (er) {
        Toast.show('Error Occurred');
      }
    }, 500);
  }, [state]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const tripdata = await UserTrips(cred);
      if (tripdata !== undefined) {
        Toast.show('Loading Created Trips');
        setTripDetails(tripdata);
      } else {
        Toast.show('Unable to Load Trips');
      }
    } catch (error) {
      Toast.show('Error occured in Refreshing');
    }
    setRefreshing(false);
  }, []);

  const renderItem = details => {
    return <AllTripList navigation={navigation} data={details.item} />;
  };

  const handleSearch = async value => {
    const key = await getVerifiedKeys(authData.userToken);
    const response = await SearchUserTrips(key, value);
    setTripDetails(response);
    setSearchTrips(response);
    setSearch(true);
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
              You have not created any trips at the moment.
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
        onPress={() => {
          navigation.navigate('CreateTrip');
          dispatch(setInitialState(state));
        }}>
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
    backgroundColor: 'white',
  },

  inputText: {
    marginLeft: 10,
    width: '70%',
    height: 40
  },
  NoTripText: {
    color: '#4F504F',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    marginVertical: 10,
  },
  searchIcon: {
    tintColor: 'grey',
    alignSelf: 'center',
    marginLeft: 12,
  },
  img: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    position: 'absolute',
    bottom: 15,
    right: 20,
    height: 65,
    paddingBottom: 15,
  },
  displayText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 50,
  },
  NoTripView: {
    marginTop: 90,
    borderWidth: 1,
  },
  NoResultText: {
    color: '#4F504F',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    marginTop: '50%',
  },
});

export default AllTrips;
