import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getVerifiedKeys} from '../utils/Functions';
import {addFavourites} from '../services/Places';
import {setToken} from '../redux/AuthSlice';
import {setInitialState1} from '../redux/AuthSlice';

const Card = ({item, navigation, state1}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const favourites = useSelector(state => state.auth.favourites);
  const authData = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  async function handleFavourite(id) {
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const resp = await addFavourites(id, cred);
    if (resp !== undefined) {
      dispatch(setInitialState1(state1));
    }
    if (loading === true) setLoading(false);
    if (loading1 === true) setLoading1(false);
    if (loading2 === true) setLoading2(false);
  }

  const width1 =
    width > height
      ? Platform.OS === 'ios'
        ? '90%'
        : '90%'
      : Platform.OS === 'ios'
      ? '90%'
      : '90%';

  const width2 =
    width > height
      ? Platform.OS === 'ios'
        ? '75%'
        : '75%'
      : Platform.OS === 'ios'
      ? '69%'
      : '69%';

  const width3 =
    width > height
      ? Platform.OS === 'ios'
        ? '70%'
        : '40%'
      : Platform.OS === 'ios'
      ? '97.5%'
      : '97.5%';

  const margin =
    width > height
      ? Platform.OS === 'ios'
        ? 10
        : 10
      : Platform.OS === 'ios'
      ? 5
      : 5;

  return (
    <View style={[styles.container, {width: width}]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('particular', {
            distance: Math.round(
              ((item.distance.calculated / 1609) * 100) / 100,
            ).toFixed(2),
            id: item._id,
          });
        }}>
        <View
          style={[
            styles.listContainer,
            styles.shadowProp,
            {marginTop: margin, width: width3},
          ]}>
          <View style={styles.listDisplay}>
            <Image
              style={styles.listImg}
              source={{uri: 'https' + item.placeImage.substring(4)}}
            />
            <View style={{width: width2}}>
              <View style={[styles.textWithImage, {width: width1}]}>
              {item.placeName.length > 15 ? <Text style={styles.listName}>{item.placeName.substring(0,16)}...</Text> : <Text style={styles.listName}>{item.placeName}</Text>}

                {authData.userToken !== null ? (
                  favourites.favouritePlaces.length > 0 ? (
                    favourites.favouritePlaces.filter(
                      ele => ele.placeId === item._id,
                    ).length > 0 ? (
                      !loading ? (
                        <TouchableOpacity
                          onPress={() => {
                            handleFavourite(item._id);
                            setLoading(true);
                          }}>
                          <View style={styles.iconHeader} key={item._id}>
                            <Image
                              style={styles.favouriteImg}
                              source={require('../assets/images/favourite_icon_selected.png')}
                            />
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.iconHeader}>
                          <ActivityIndicator color="yellow" />
                        </View>
                      )
                    ) : !loading1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          handleFavourite(item._id);
                          setLoading1(true);
                        }}>
                        <View style={styles.iconHeader} key={item._id}>
                          <Image
                            style={styles.favouriteImg}
                            source={require('../assets/images/favourite_icon.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.iconHeader}>
                        <ActivityIndicator color="yellow" />
                      </View>
                    )
                  ) : !loading2 ? (
                    <TouchableOpacity
                      onPress={() => {
                        handleFavourite(item._id);
                        setLoading2(true);
                      }}>
                      <View style={styles.iconHeader}>
                        <Image
                          style={styles.favouriteImg}
                          source={require('../assets/images/favourite_icon.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.iconHeader}>
                      <ActivityIndicator color="yellow" />
                    </View>
                  )
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('login');
                    }}>
                    <View>
                      <Image
                        style={styles.favouriteImg}
                        source={require('../assets/images/favourite_icon.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              {item.rating >= 4 && (
                <View style={styles.ratingView1}>
                  <Text style={styles.listRating}>
                    {parseFloat(item.rating * 2).toFixed(1)}
                  </Text>
                </View>
              )}
              {item.rating < 4 && (
                <View style={styles.ratingView}>
                  <Text style={styles.listRating}>
                    {parseFloat(item.rating * 2).toFixed(1)}
                  </Text>
                </View>
              )}
              <View style={styles.typeDist}>
                <Text style={styles.typeText}>
                  Indian .
                  {item.priceRange === 4
                    ? '₹₹₹₹'
                    : item.priceRange === 3
                    ? '₹₹₹'
                    : item.priceRange === 2
                    ? '₹₹'
                    : '₹'}
                </Text>

                <Text style={styles.distText}>
                  {(item.distance.calculated / 1609).toFixed(2)} Km
                </Text>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.addressText}>
                  {item.address.trim()}, {item.city}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },

  listContainer: {
    height: 125,
    backgroundColor: 'white',
    borderColor: 'white',
    alignSelf: 'center',
  },
  ratingView1: {
    backgroundColor: '#7dd350',
    width: '11%',
    height: '16%',
    marginTop: 5,
    marginLeft: 20,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
  },

  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 2,
  },

  listImg: {
    height: 123,
    width: 120,
  },

  addressText: {
    color: 'grey',
  },

  addressView: {
    marginLeft: 20,
  },

  favouriteImg: {
    height: 21,
    width: 21,
  },

  textWithImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  typeDist: {
    flexDirection: 'row',
    marginTop: 5,
  },

  ratingView: {
    backgroundColor: '#a9da43',
    width: '10%',
    height: '16%',
    marginTop: 5,
    marginLeft: 20,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
  },

  listDisplay: {
    flexDirection: 'row',
    width: '100%',
  },

  typeText: {
    color: 'grey',
    marginLeft: 20,
    fontFamily: 'Avenir Book',
  },

  distText: {
    fontFamily: 'Avenir Book',
    marginLeft: 10,
    color: 'grey',
  },

  listRating: {
    fontFamily: 'Avenir Book',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  listName: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'Avenir Book',
    color: 'black',
    marginTop: 5,
  },
});
