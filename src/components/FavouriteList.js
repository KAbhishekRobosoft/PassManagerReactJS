import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {addFavourites} from '../services/Places';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

function FavouriteList({
  item,
  navigation,
  state,
  setState,
  setFavChanged,
  name
}) {
  const {height, width} = useWindowDimensions();
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();

  async function deleteFavourite(id) {
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const resp = await addFavourites(id, cred);
    if (resp !== undefined) {
      setState(!state);
      setFavChanged(true)
    }
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
        ? '85%'
        : '85%'
      : Platform.OS === 'ios'
      ? '69%'
      : '69%';

  const margin =
    width > height
      ? Platform.OS === 'ios'
        ? 10
        : 10
      : Platform.OS === 'ios'
      ? 5
      : 5;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('particular', {
          distance: Math.round(
            ((item.distance.calculated / 1609) * 100) / 100,
          ).toFixed(2),
          id: item.placeId,
        });
      }}>
      <View style={[styles.listContainer, styles.shadowProp, {margin: margin}]}>
        <View style={styles.listDisplay}>
          <Image
            style={styles.listImg}
            source={{uri: 'https' + item.placeImage.substring(4)}}
          />
          <View style={{width: width2}}>
            <View style={[styles.textWithImage, {width: width1}]}>
              <Text style={styles.listName}>{item.placeName}</Text>
              {name === "search" && <TouchableOpacity
                onPress={() => {
                  Alert.alert('Confirm', 'Are you sure you want to delete ?', [
                    {
                      text: 'Yes',
                      onPress: async () => {
                        deleteFavourite(item.placeId);
                        setFavChanged(true);
                      },
                    },
                    {
                      text: 'No',
                      onPress: () => {
                        Toast.show('Task declined');
                      },
                    },
                  ]);
                }}>
                <Image
                  style={styles.favouriteImg}
                  source={require('../assets/images/close_icon_grey_hdpi.png')}
                />
              </TouchableOpacity>}
            </View>
            {item.rating >= 4 && <View style={styles.ratingView1}>
              <Text style={styles.listRating}>
                {parseFloat(item.rating * 2).toFixed(1)}
              </Text>
            </View>}
            {item.rating < 4 && <View style={styles.ratingView}>
              <Text style={styles.listRating}>
                {parseFloat(item.rating * 2).toFixed(1)}
              </Text>
            </View>}
            <View style={styles.typeDist}>
              <Text style={styles.typeText}>
                Indian .{' '}
                {item.placepPriceRange === 4
                  ? '₹₹₹₹'
                  : item.placePriceRange === 3
                  ? '₹₹₹'
                  : item.placePriceRange === 2
                  ? '₹₹'
                  : '₹'}
              </Text>
              <Text style={styles.distText}>
                {Math.round(
                  ((item.distance.calculated / 1609) * 100) / 100,
                ).toFixed(2)}{' '}
                Km
              </Text>
            </View>
            <View style={styles.addressView}>
              <Text style={styles.addressText}>
                {item.placeAddress.trim()}, {item.city}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: 125,
    width: '97.5%',
    backgroundColor: 'white',
    borderColor: 'white',
  },

  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 2,
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


  listImg: {
    height: 125,
    width: 120,
  },

  addressText: {
    color: 'grey',
  },

  addressView: {
    marginLeft: 20,
  },

  favouriteImg: {
    height: 15,
    width: 15,
    marginLeft: 10,
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
    backgroundColor: '#73cf42',
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

export default FavouriteList;
