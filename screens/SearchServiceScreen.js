import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import {useRef} from 'react';
import SearchServiceComponent from '../components/SearchServiceComponent';
import { getLocationName } from '../services/Maps';
import { searchServiceCenter } from '../services/Services';
import {getVerifiedKeys} from '../utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/AuthSlice';
import {useEffect} from 'react';
import GetLocation from 'react-native-get-location';
import Toast from 'react-native-simple-toast';

const SearchServiceScreen = ({navigation}) => {
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        const resp = await getLocationName(
          location.latitude,
          location.longitude,
        );
        setcurLoc(resp.name);
      })
      .catch(error => {
        Toast.show('Turn on the Location');
      });
  }, []);
  const [curLoc, setcurLoc] = useState('');
  const route = useRoute();
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [cross, setCross] = useState(false);
  const ref = useRef();
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const search = async value => {
    if (value !== '') {
      setCross(true);
    } else {
      setCross(false);
    }
    setText(value);
    const key = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(key));
    const Data = await searchServiceCenter(value, key);
    setData(Data);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon2 name="md-arrow-back" color={'#ED7E2B'} size={25}/>
        </Pressable>
      </View>
      <View style={styles.searchView}>
        {text ? (
          <View style={styles.form1}></View>
        ) : (
          <View style={styles.form}></View>
        )}
        <View>
          <>
            {text ? (
              <View style={styles.placeholder}>
                <Text style={styles.text}>Search</Text>
              </View>
            ) : (
              <></>
            )}
          </>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            name="search"
            placeholder="Search"
            placeholderTextColor={'rgba(141,138,138,0.87)'}
            value={text}
            ref={ref}
            onChangeText={value => {
              search(value);
              if (value.length === 0) {
                setData([]);
              }
            }}
            style={styles.textInput}
          />
          {cross && (
            <Pressable
              onPress={() => {
                setCross(false);
                setText('');
                setData([]);
                ref.current.clear();
              }}>
              <Icon2
                name="close"
                size={20}
                color={'#A4A4A4'}
                style={styles.times}
              />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.locationView}>
        <Icon
          name="gps-fixed"
          color="#A4A4A4"
          style={styles.locationImage}
          size={16}
        />
        <View style={styles.locationNamesView}>
          <Text style={styles.textUdupi}>{curLoc}</Text>
          <Text style={styles.textCurrentLocation}>current location</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <SearchServiceComponent
          data={data}
          text={text}
          navigation={navigation}
          route={route}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchServiceScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 30,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    top:10,
    // left:10
  },
  scrollView: {
    width: '100%',
    height: '91%',
  },
  searchView: {
    height: 60,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomColor: '#B4B3B3',
    borderBottomWidth: 1,
  },
  form1: {
    marginTop: Platform.OS == 'ios' ? 1 : 15,
  },

  form: {
    marginTop: Platform.OS == 'ios' ? 15 : 30,
  },
  text: {
    height: 17,
    color: Platform.OS == 'ios' ? '#969292' : '#969292',
    fontSize: 14,
    letterSpacing: 0.29,
    lineHeight: 17,
  },
  textInput: {
    width: '80%',
    height: Platform.OS === 'ios' ? 30 : 50,
    color: '#4F504F',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  times: {
    marginHorizontal: '26%',
    marginTop: 5,
  },
  placeholder: {
    marginTop: 7,
  },
  locationView: {
    height: 50,
    width: '85%',
    flexDirection: 'row',
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
    elevation: 5,
    backgroundColor: 'white',
    marginHorizontal: 19,
    marginTop: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  locationImage: {
    marginHorizontal: 7,
    marginVertical: 5,
  },
  locationNamesView: {
    flexDirection: 'column',
  },
  textUdupi: {
    fontFamily: 'Roboto-Regular',
    color: '#717171',
    fontSize: 14,
    lineHeight: 19,
  },
  textCurrentLocation: {
    fontFamily: 'Roboto-Regular',
    color: 'rgba(182,182,182,0.8)',
    fontSize: 12,
    lineHeight: 16,
  },
  serviceCenterView: {
    width: '85%',
    height: 120,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: 'rgba(179,172,172,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    borderRadius: 8,
    justifyContent: 'center',
  },
  textView1: {
    flexDirection: 'row',
    height: 20,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    color: '#ED7E2B',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 21,
  },
  text2: {
    color: '#6F6D6D',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  text3: {
    color: '#6F6D6D',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '5.5%',
    lineHeight: 18,
  },
  rating: {
    flexDirection: 'row',
    marginLeft: '5.5%',
    height: 20,
    width: '30%',
    justifyContent: 'space-between',
  },
  ratingImg: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
