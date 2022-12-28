import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import NearBySearch from './NearBySearch';
import {useSelector} from 'react-redux';
import { getNearCity } from '../services/Places';

function SearchByPlace({navigation, data,text,setText,searchPlace,setSearchPlace,setPlaceResults,setList}) {
  const coord = useSelector(state => state.auth.setCoord);
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const resp = await getNearCity(coord);
      setPlaceData(resp);
    }, 500);
  }, []);

  return (
    <View>
      <View style={styles.searchByPlaceName}>
        <View style={styles.nearBy}>
          <Text style={styles.nearByText}>Near by places</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.nearByList}>
            {placeData.length > 0 ? (
              placeData.map(ele => {
                return <NearBySearch setList= {setList} setPlaceResults= {setPlaceResults} setText= {setText} setSearchPlace= {setSearchPlace} key={ele._id} item={ele} />;
              })
            ) : (
              <ActivityIndicator color="purple" />
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.nearBy}>
        <Text style={styles.nearByText}>Suggestions</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('parameterHeader', {
            name: 'getTopPlace',
            headerName: 'Top picks',
          });
        }}>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Top pick</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('parameterHeader', {
            name: 'getPopularPlace',
            headerName: 'Popular',
          });
        }}>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Popular</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('parameterHeader', {
            name: 'getRestaurants',
            headerName: 'Lunch',
          });
        }}>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Lunch</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('parameterHeader', {
            name: 'getCafe',
            headerName: 'Coffee',
          });
        }}>
        <View style={styles.nearByPlaceList}>
          <Text style={styles.placeName}>Coffee</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchByPlaceName: {
    width: '100%',
    height: 230,
    backgroundColor: 'white',
  },

  nearByPlaceList: {
    height: 70,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: '#e4e4e4',
    flexDirection: 'row',
    alignItems: 'center',
  },

  placeName: {
    fontFamily: 'Avenir Book',
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },

  nearBy: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#f2f1f1',
  },

  nearByText: {
    marginLeft: 30,
    fontSize: 18,
    fontFamily: 'Avenir Medium',
    color: '#858585',
  },

  nearByList: {
    flex: 1,
  },
});
export default SearchByPlace;
