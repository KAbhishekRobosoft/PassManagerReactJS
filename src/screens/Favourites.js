import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StatusBar
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TextInputComponent from '../components/TextInputComponent';
import VirtualList from '../components/VirtualList';
import {searchAllFavourites} from '../services/Places';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import FavouriteList from '../components/FavouriteList';
import {searchTextFavourites} from '../services/Places';
import {setInitialState1} from '../redux/AuthSlice';

function Favourites({navigation}) {
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState([]);
  const coord = useSelector(state => state.auth.setCoord);
  const [state, setState] = useState(false);
  const state1 = useSelector(state => state.auth.initialState1);
  const [favChanged, setFavChanged] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const resp = await searchAllFavourites(cred, coord);

      setFavourite(resp);
    }, 500);
  }, [state1, state]);

  async function searchFavourite(text) {
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const resp = await searchTextFavourites(cred, coord, text);
    setFavourite(resp);
  }

  const renderItem = ({item}) => {
    return (
      <FavouriteList
        state={state}
        setState={setState}
        item={item}
        state1= {state1}
        navigation={navigation}
        setFavChanged={setFavChanged}
        name="search"
      />
    );
  };

  const {height, width} = useWindowDimensions();
  const right = width > height ? (Platform.OS === 'ios' ? 40 : 30) : 0;
  return (
    <SafeAreaView style={styles.favouriteContainer}>
       <StatusBar backgroundColor="#370F24" />
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => {
            if (favChanged === true) dispatch(setInitialState1(state1));
            setState(false);
            setFavChanged(false)
            navigation.goBack();
          }}>
          <View style={styles.iconHeader}>
            <Image
              style={styles.backImg}
              source={require('../assets/images/back_icon.png')}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.searchInput}>
          <Text style={styles.favouriteText}>Favourites</Text>
          <View style={{marginTop: 20}}>
            <TextInputComponent
              onChangeText={val => {
                searchFavourite(val);
              }}
              placeholder="Search"
              name="search-outline"
            />
          </View>
        </View>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('filter',{name:"favourite"})
        }}>
          <View style={[styles.iconHeader, {marginRight: right}]}>
            <Image
              style={styles.filterIcon}
              source={require('../assets/images/filter_icon.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      {favourite.length > 0 ? (
        <View style={{flex: 1}}>
          <VirtualList
            data={favourite}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontFamily: 'Avenir Book'}}>
            No Favourites added
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchHeader: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#370F24',
  },

  backImg: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },

  favouriteContainer: {
    flex: 1,
  },
  filterIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },

  favouriteText: {
    fontSize: 18,
    marginTop: 8,
    color: 'white',
    fontFamily: 'Avenir Medium',
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterDone: {
    color: 'white',
    fontFamily: 'Avenir Book',
    fontSize: 16,
    marginRight: 5,
  },
});
export default Favourites;
