import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Text,
  ScrollView,
  Keyboard,
  StatusBar
} from 'react-native';
import TextInputComponent from '../components/TextInputComponent';
import {TextField} from 'rn-material-ui-textfield';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {filterSearch} from '../services/Places';
import VirtualList from '../components/VirtualList';
import ListDisplay from '../components/HotelListDisplay';
import {filterFavourites} from '../services/Places';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import FavouriteList from '../components/FavouriteList';

function FilterScreen({navigation, route}) {
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [filterScreen, setFilterScreen] = useState(true);
  const [favFilterScreen, setFavFilterScreen] = useState(true);
  const [popular, setPopular] = useState(false);
  const [distance, setDistance] = useState(false);
  const [rating, setRating] = useState(false);
  const [rupee1, setRupee1] = useState(false);
  const [rupee2, setRupee2] = useState(false);
  const [rupee3, setRupee3] = useState(false);
  const [rupee4, setRupee4] = useState(false);
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [selected5, setSelected5] = useState(false);
  const [selected6, setSelected6] = useState(false);
  const [selected7, setSelected7] = useState(false);
  const [selected8, setSelected8] = useState(false);
  const [distanceText, setDistanceText] = useState('');
  const [filterData, setFilterData] = useState([]);
  const state1 = useSelector(state => state.auth.inititalState1);
  const color1 = selected1 ? 'black' : '#b4b4b4';
  const color2 = selected2 ? 'black' : '#b4b4b4';
  const color3 = selected3 ? 'black' : '#b4b4b4';
  const color4 = selected4 ? 'black' : '#b4b4b4';
  const color5 = selected5 ? 'black' : '#b4b4b4';
  const color6 = selected6 ? 'black' : '#b4b4b4';
  const color7 = selected7 ? 'black' : '#b4b4b4';
  const color8 = selected8 ? 'black' : '#b4b4b4';
  const {height, width} = useWindowDimensions();
  const right = width > height ? (Platform.OS === 'ios' ? 40 : 30) : 0;
  const coord = useSelector(state => state.auth.setCoord);
  const fieldRef = useRef(null);

  async function displayFilter() {
    let obj = {
      latitude: coord.latitude,
      longitude: coord.longitude,
      text: searchText,
    };
    if (popular === true) obj['sortBy'] = 'popularityCount';
    if (rating === true) obj['sortBy'] = 'rating';
    if (distance === true) obj['sortBy'] = 'distance';
    if (selected1 === true) obj['acceptedCredit'] = true;
    if (selected2 === true) obj['delivery'] = true;
    if (selected3 === true) obj['dogFriendly'] = true;
    if (selected4 === true) obj['familyFriendly'] = true;
    if (selected5 === true) obj['inWalkingDistance'] = true;
    if (selected6 === true) obj['outdoorDining'] = true;
    if (selected7 === true) obj['parking'] = true;
    if (selected8 === true) obj['wifi'] = true;
    if (rupee1 === true) obj['price'] = 1;
    if (rupee2 === true) obj['price'] = 2;
    if (rupee3 === true) obj['price'] = 3;
    if (rupee4 === true) obj['price'] = 4;
    if (distanceText !== '') obj['radius'] = parseInt(distanceText);

    if (route.params.name === 'search') {
      const resp = await filterSearch(obj);
      if (resp !== undefined) {
        setFilterData(resp);
        setDistanceText('');
        if (distanceText.length > 0) fieldRef.current.clear();
        setFilterScreen(false);
      }
    } else {
      const cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const resp = await filterFavourites(obj, cred);
      if (resp !== undefined) {
        setFilterData(resp);
        setDistanceText('');
        if (distanceText.length > 0) fieldRef.current.clear();
        setFavFilterScreen(false);
      }
    }
  }

  const renderItem = ({item}) => {
    return <ListDisplay state1= {state1} item={item} navigation={navigation} />;
  };

  const renderItem1 = ({item}) => {
    return <FavouriteList name={route.params.name} item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.filterContainer}>
       <StatusBar backgroundColor="#370F24" />
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => {
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
          <View>
            <TextInputComponent
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={val => {
                setSearchText(val);
              }}
              placeholder="Search"
              name="search-outline"
            />
          </View>
          <View style={{marginTop: 10}}>
            <TextInputComponent placeholder="Near Me" name="compass-outline" />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            displayFilter();
          }}>
          <View style={[styles.iconHeader, {marginRight: right}]}>
            <Text style={styles.filterDone}>Done</Text>
          </View>
        </TouchableOpacity>
      </View>
      {route.params.name === 'search' && filterScreen && (
        <>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.filterSort}>
              <View style={styles.nearBy}>
                <Text style={styles.nearByText}>Sort by</Text>
              </View>
              <View style={styles.filterParameter}>
                {!popular && (
                  <TouchableOpacity
                    onPress={() => {
                      setPopular(true);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/popular.png')}
                    />
                  </TouchableOpacity>
                )}
                {popular && (
                  <TouchableOpacity
                    onPress={() => {
                      setPopular(false);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/popular_selected.png')}
                    />
                  </TouchableOpacity>
                )}

                {!distance && (
                  <TouchableOpacity
                    onPress={() => {
                      setDistance(true);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/distance.png')}
                    />
                  </TouchableOpacity>
                )}
                {distance && (
                  <TouchableOpacity
                    onPress={() => {
                      setDistance(false);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/distance_selected.png')}
                    />
                  </TouchableOpacity>
                )}
                {!rating && (
                  <TouchableOpacity
                    onPress={() => {
                      setRating(true);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/rating.png')}
                    />
                  </TouchableOpacity>
                )}
                {rating && (
                  <TouchableOpacity
                    onPress={() => {
                      setRating(false);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/rating_selected.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.filterBy}>
              <View style={styles.nearBy}>
                <Text style={styles.nearByText}>Sort by</Text>
              </View>
              <TextField
                ref={fieldRef}
                label="Set Radius"
                keyboardType="default"
                labelFontSize={16}
                baseColor="#b5abab"
                textColor="white"
                onChangeText={val => {
                  setDistanceText(val);
                }}
                lineWidth={1}
                labelTextStyle={{
                  fontFamily: 'Avenir Book',
                  padding: 3,
                  marginRight: 5,
                }}
                style={{fontSize: 18, color: 'black'}}
                containerStyle={{
                  width: '85%',
                  alignSelf: 'center',
                  height: 75,
                  marginTop: 20,
                }}
                tintColor="#b5abab"
              />
              <View style={styles.filterMoney}>
                {!rupee1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee1(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn1.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee1(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn1_selected.png')}
                    />
                  </TouchableOpacity>
                )}

                {!rupee2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee2(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn2.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee2(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn2_selected.png')}
                    />
                  </TouchableOpacity>
                )}
                {!rupee3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee3(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn3.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee3(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn3_selected.png')}
                    />
                  </TouchableOpacity>
                )}
                {!rupee4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee4(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn4.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee4(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn4_selected.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View>
              <View style={styles.nearBy}>
                <Text style={styles.nearByText}>Features</Text>
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color1}]}>
                  Accepts credit cards
                </Text>
                {!selected1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected1(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected1(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color2}]}>
                  Delivery
                </Text>
                {!selected2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected2(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="add-outline" size={26} />
                    </View>
                  </TouchableOpacity>
                )}
                {selected2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected2(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color3}]}>
                  Dog friendly
                </Text>
                {!selected3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected3(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected3(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color4}]}>
                  Family-friendly places
                </Text>
                {!selected4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected4(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected4(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color5}]}>
                  In walking distance
                </Text>
                {!selected5 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected5(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected5 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected5(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color6}]}>
                  Outdoor seating
                </Text>
                {!selected6 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected6(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected6 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected6(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color7}]}>Parking</Text>
                {!selected7 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected7(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected7 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected7(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color8}]}>Wi-Fi</Text>
                {!selected8 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected8(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected8 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected8(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}

      {favFilterScreen && route.params.name === 'favourite' && (
        <>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.filterSort}>
              <View style={styles.nearBy}>
                <Text style={styles.nearByText}>Sort by</Text>
              </View>
              <View style={styles.filterParameter}>
                {!popular && (
                  <TouchableOpacity
                    onPress={() => {
                      setPopular(true);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/popular.png')}
                    />
                  </TouchableOpacity>
                )}
                {popular && (
                  <TouchableOpacity
                    onPress={() => {
                      setPopular(false);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/popular_selected.png')}
                    />
                  </TouchableOpacity>
                )}

                {!distance && (
                  <TouchableOpacity
                    onPress={() => {
                      setDistance(true);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/distance.png')}
                    />
                  </TouchableOpacity>
                )}
                {distance && (
                  <TouchableOpacity
                    onPress={() => {
                      setDistance(false);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/distance_selected.png')}
                    />
                  </TouchableOpacity>
                )}
                {!rating && (
                  <TouchableOpacity
                    onPress={() => {
                      setRating(true);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/rating.png')}
                    />
                  </TouchableOpacity>
                )}
                {rating && (
                  <TouchableOpacity
                    onPress={() => {
                      setRating(false);
                    }}>
                    <Image
                      style={styles.popularImg}
                      source={require('../assets/images/rating_selected.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.filterBy}>
              <View style={styles.nearBy}>
                <Text style={styles.nearByText}>Sort by</Text>
              </View>
              <TextField
                ref={fieldRef}
                label="Set Radius"
                keyboardType="default"
                labelFontSize={16}
                baseColor="#b5abab"
                textColor="white"
                onChangeText={val => {
                  setDistanceText(val);
                }}
                lineWidth={1}
                labelTextStyle={{
                  fontFamily: 'Avenir Book',
                  padding: 3,
                  marginRight: 5,
                }}
                style={{fontSize: 18, color: 'black'}}
                containerStyle={{
                  width: '85%',
                  alignSelf: 'center',
                  height: 75,
                  marginTop: 20,
                }}
                tintColor="#b5abab"
              />
              <View style={styles.filterMoney}>
                {!rupee1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee1(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn1.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee1(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn1_selected.png')}
                    />
                  </TouchableOpacity>
                )}

                {!rupee2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee2(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn2.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee2(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn2_selected.png')}
                    />
                  </TouchableOpacity>
                )}
                {!rupee3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee3(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn3.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee3(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn3_selected.png')}
                    />
                  </TouchableOpacity>
                )}
                {!rupee4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee4(true);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn4.png')}
                    />
                  </TouchableOpacity>
                )}
                {rupee4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setRupee4(false);
                    }}>
                    <Image
                      style={styles.moneyImg}
                      source={require('../assets/images/ruppe_btn4_selected.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View>
              <View style={styles.nearBy}>
                <Text style={styles.nearByText}>Features</Text>
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color1}]}>
                  Accepts credit cards
                </Text>
                {!selected1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected1(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected1(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color2}]}>
                  Delivery
                </Text>
                {!selected2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected2(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="add-outline" size={26} />
                    </View>
                  </TouchableOpacity>
                )}
                {selected2 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected2(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color3}]}>
                  Dog friendly
                </Text>
                {!selected3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected3(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected3 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected3(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color4}]}>
                  Family-friendly places
                </Text>
                {!selected4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected4(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected4 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected4(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color5}]}>
                  In walking distance
                </Text>
                {!selected5 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected5(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected5 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected5(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color6}]}>
                  Outdoor seating
                </Text>
                {!selected6 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected6(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected6 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected6(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color7}]}>Parking</Text>
                {!selected7 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected7(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected7 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected7(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.nearByPlaceList}>
                <Text style={[styles.placeName, {color: color8}]}>Wi-Fi</Text>
                {!selected8 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected8(true);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={styles.addIcon}
                        name="add-outline"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                {selected8 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected8(false);
                    }}>
                    <View
                      style={{
                        height: 40,
                        marginRight: 10,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.filterSelected}
                        source={require('../assets/images/filter_selected.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}

      {route.params.name === 'search' &&
        (!filterScreen && filterData.length > 0 ? (
          <View style={{flex: 1}}>
            <VirtualList
              data={filterData}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{fontFamily: 'Avenir Book', fontSize: 20, color: 'black'}}>
              No results found
            </Text>
          </View>
        ))}

      {route.params.name === 'favourite' &&
        (!favFilterScreen && filterData.length > 0 ? (
          <View style={{flex: 1}}>
            <VirtualList
              data={filterData}
              renderItem={renderItem1}
              keyExtractor={item => item._id}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{fontFamily: 'Avenir Book', fontSize: 20, color: 'black'}}>
              No results found
            </Text>
          </View>
        ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
  },

  moneyImg: {
    height: 60,
    width: 98,
  },

  searchHeader: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#370F24',
  },

  filterSort: {
    width: '100%',
    height: 110,
  },

  filterSelected: {
    height: 20,
    width: 20,
  },

  filterBy: {
    height: 220,
  },

  filterMoney: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'center',
  },

  nearByPlaceList: {
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: '#e4e4e4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  placeName: {
    fontFamily: 'Avenir Book',
    fontSize: 18,
    marginLeft: 20,
  },

  popularImg: {
    height: 60,
    width: 130,
  },

  filterIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },

  nearBy: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#f2f1f1',
  },

  nearByText: {
    marginLeft: 30,
    fontSize: 16,
    fontFamily: 'Avenir Medium',
    color: '#858585',
  },

  searchInput: {
    width: '70%',
    justifyContent: 'center',
  },

  filterDone: {
    color: 'white',
    fontFamily: 'Avenir Book',
    fontSize: 16,
    marginRight: 5,
  },

  backImg: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterParameter: {
    flexDirection: 'row',
    height: 62,
    justifyContent: 'center',
  },
});

export default FilterScreen;
