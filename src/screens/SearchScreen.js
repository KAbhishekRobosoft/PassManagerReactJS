import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  FlatList,
  Text,
 StatusBar
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import TextInputComponent from '../components/TextInputComponent';
import {ScrollView} from 'react-native-gesture-handler';
import SearchByPlace from '../components/SearchByPlace';
import SearchNearMe from '../components/SearchNearMe';
import {LargeButton} from '../components/Button';
import {searchParticularPlace} from '../services/Places';
import {useSelector} from 'react-redux';
import ListDisplay from '../components/HotelListDisplay';
import Card from '../components/Card';
import {mapStyle} from '../utils/Functions';
import uuid from 'react-native-uuid';

function SearchScreen({navigation}) {
  const coords = useSelector(state => state.auth.setCoord);
  const [Viewable, SetViewable] = React.useState([]);
  const ref = React.useRef(null);
  const state1 = useSelector(state => state.auth.initialState1);

  const onViewRef = React.useRef(viewableItems => {
    let Check = [];
    for (var i = 0; i < viewableItems.viewableItems.length; i++) {
      Check.push(viewableItems.viewableItems[i].item);
    }
    SetViewable(Check);
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 80});
  const {height, width} = useWindowDimensions();
  const right = width > height ? (Platform.OS === 'ios' ? 40 : 30) : 0;
  const [searchPlace, setSearchPlace] = useState(false);
  const [searchNearMe, setSearchNearMe] = useState(false);
  const [text, setText] = useState('');
  const coord = useSelector(state => state.auth.setCoord);
  const [list, setList] = useState(false);
  const [placeResults, setPlaceResults] = useState([]);
  const [mapView, setMapView] = useState(false);
  const [mapView1, setMapView1] = useState(false);
  const [markerArr, setMarkerArr] = useState([]);

  const renderItem = ({item}) => {
    return <Card state1={state1} item={item} navigation={navigation} />;
  };

  const getPlace = async text => {
    const resp = await searchParticularPlace(coord, text);
    setPlaceResults(resp);
  };

  const getNearPlaces = async coordinates => {
    const resp = await searchParticularPlace(coordinates, '');
    setPlaceResults(resp);
  };

  return (
    <SafeAreaView style={styles.searchContainer}>
      <StatusBar backgroundColor="#370F24" />
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setList(false);
            setMapView(false);
          }}>
          <View style={styles.iconHeader}>
            <Image
              style={styles.backImg}
              source={require('../assets/images/back_icon.png')}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.searchInput}>
          <View>
            <TextInputComponent
              onFocus={() => {
                setSearchPlace(true);
                setSearchNearMe(false);
                setList(false);
                setMapView(false);
              }}
              onChangeText={val => {
                if (val.length !== 0) {
                  getPlace(val);
                  setSearchPlace(false);
                  if (mapView === false) setList(true);
                }
                if (val.length === 0) {
                  if (mapView === true) setList(false);
                  if (list === true) setMapView(false);
                }
              }}
              placeholder="Search"
              name="search-outline"
            />
          </View>
          <View style={{marginTop: 10}}>
            <TextInputComponent
              placeholder="Near Me"
              name="compass-outline"
              onFocus={() => {
                setSearchPlace(false);
                setSearchNearMe(true);
                setList(false);
                setMapView(false);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('filter', {name: 'search'});
          }}>
          <View style={[styles.iconHeader, {marginRight: right}]}>
            <Image
              style={styles.filterIcon}
              source={require('../assets/images/filter_icon.png')}
            />
          </View>
        </TouchableOpacity>
      </View>

      {searchPlace && (
        <ScrollView bounces={false}>
          <SearchByPlace
            text={text}
            setText={setText}
            searchPlace={searchPlace}
            setSearchPlace={setSearchPlace}
            navigation={navigation}
            setPlaceResults={setPlaceResults}
            setList={setList}
          />
        </ScrollView>
      )}
      {searchNearMe && (
        <SearchNearMe
          setMapView1={setMapView1}
          setPlaceResults={setPlaceResults}
          list={list}
          setList={setList}
          mapView={mapView}
          setMapView={setMapView}
          setSearchNearMe={setSearchNearMe}
        />
      )}
      {list && (
        <View style={styles.listView}>
          {placeResults.length > 0 ? (
            <ScrollView>
              {placeResults.map(ele => {
                return (
                  <ListDisplay
                    navigation={navigation}
                    item={ele}
                    key={ele._id}
                    state1={state1}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 18, fontFamily: 'Avenir Book'}}>
                No Results found
              </Text>
            </View>
          )}
        </View>
      )}
      {list && (
        <View>
          <LargeButton
            title="Map View"
            backgroundColor="#351347"
            width="100%"
            borderRadius="0"
            fontFamily="Avenir Medium"
            onPress={() => {
              setList(false);
              setMapView(true);
            }}
          />
        </View>
      )}
      {mapView &&
        (placeResults.length > 0 ? (
          <View style={styles.container}>
            <MapView
              initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              style={styles.mapStyle}
              customMapStyle={mapStyle}>
              {Viewable.length > 0 &&
                placeResults.map(ele => {
                  return ele._id === Viewable[0]._id ? (
                    <Marker
                      key={ele._id}
                      coordinate={{
                        latitude: ele.location.coordinates[1],
                        longitude: ele.location.coordinates[0],
                        latitudeDelta: 0.6,
                        longitudeDelta: 0.6,
                      }}
                      title={ele.placeName}
                      pinColor="green"
                    />
                  ) : (
                    <Marker
                      key={ele._id}
                      coordinate={{
                        latitude: ele.location.coordinates[1],
                        longitude: ele.location.coordinates[0],
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                      }}
                      title={ele.placeName}
                    />
                  );
                })}
            </MapView>
            <View style={{position: 'absolute', width: '100%', top: 0}}>
              <FlatList
                data={placeResults}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                horizontal
                pagingEnabled
                ref={ref}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
              />
            </View>
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Avenir Book', fontSize: 18}}>
              No Results found
            </Text>
          </View>
        ))}

      {mapView && (
        <LargeButton
          title="List View"
          backgroundColor="#351347"
          width="100%"
          borderRadius="0"
          fontFamily="Avenir Medium"
          onPress={() => {
            setList(true);
            setMapView(false);
          }}
        />
      )}

      {mapView1 && (
        <View style={{flex: 1}}>
          <MapView
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            onPress={e => {
              setMarkerArr([e.nativeEvent.coordinate]);
              getNearPlaces(e.nativeEvent.coordinate);
              setTimeout(() => {
                setList(true);
                setMapView1(false);
              }, 500);
            }}
            style={styles.mapStyle}
            customMapStyle={mapStyle}>
            {markerArr.length > 0 &&
              markerArr.map(ele => {
                return (
                  <Marker
                    key={uuid.v4()}
                    coordinate={{
                      latitude: ele.latitude,
                      longitude: ele.longitude,
                      latitudeDelta: 0.6,
                      longitudeDelta: 0.6,
                    }}
                  />
                );
              })}
          </MapView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
  },

  listView: {
    flex: 1,
    justifyContent: 'center',
  },

  searchHeader: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    backgroundColor: '#370F24',
  },

  filterIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },

  mapView: {
    borderWidth: 1,
    height: '100%',
  },

  searchInput: {
    width: '70%',
    justifyContent: 'center',
  },

  backImg: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  inputContainerStyle: {
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
