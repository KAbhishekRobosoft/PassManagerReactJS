import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {searchProducts} from '../services/OwnerAndBike';
import {LikeProducts} from '../services/OwnerAndBike';
import {getVerifiedKeys} from '../utils/Functions';
import {setInitialState} from '../redux/MileStoneSlice';
import {setToken} from '../redux/AuthSlice';
import {setLoading, deSetLoading} from '../redux/MileStoneSlice';

export const Accessories = ({navigation}) => {
  const [text, setText] = useState('');
  const [accessories, setAccessories] = useState([]);
  const number = useSelector(state => state.auth.userCredentials.mobile);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);
  const loading = useSelector(state => state.milestone.isLoading);

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      const key = await getVerifiedKeys(auth.userToken);
      dispatch(setToken(key));
      const Data = await searchProducts(text, key);
      setAccessories(Data);
      dispatch(setLoading());
    }, 500);
  }, [state]);

  const handleSearch = async value => {
    setText(value);
    const key = await getVerifiedKeys(auth.userToken);
    dispatch(setToken(key));
    const Data = await searchProducts(value, key);
    setAccessories(Data);
  };

  const handleLike = async items => {
    const key = await getVerifiedKeys(auth.userToken);
    dispatch(setToken(key));
    const product = await LikeProducts(items._id, key);
    dispatch(setInitialState(state));
  };

  const handleUnLike = async items => {
    const key = await getVerifiedKeys(auth.userToken);
    dispatch(setToken(key));
    const product = await LikeProducts(items._id, key);
    dispatch(setInitialState(state));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.header, styles.shadow]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="md-arrow-back"
            color={'white'}
            size={25}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>Accessories</Text>
      </View>
      <View style={styles.container}>
        {text ? (
          <View style={styles.form1}></View>
        ) : (
          <View style={styles.form}></View>
        )}
        <View>
          <>
            {text ? (
              <View style={styles.placeholder}>
                <Text style={styles.text}>What do you want?</Text>
              </View>
            ) : (
              <></>
            )}
          </>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            name="search"
            placeholder="What do you want?"
            placeholderTextColor={'rgba(141,138,138,0.87)'}
            onChangeText={text => handleSearch(text)}
            style={styles.textInput}
          />
          <Image
            source={require('../assets/images/search.png')}
            style={styles.search}
          />
        </View>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {accessories.length > 0
              ? accessories.map(item => {
                  return (
                    <View style={styles.mainView} key={item._id}>
                      <View style={styles.subView}>
                        <Text style={styles.dateText}>18 NOV</Text>
                        {item.likedBy.length > 0 ? (
                          item.likedBy.filter(ele => ele.mobile === number)
                            .length > 0 ? (
                            <Pressable onPress={() => handleUnLike(item)}>
                              <FontAwesome
                                name="thumbs-up"
                                color={'rgba(150,75,0,0.5)'}
                                size={18}
                                solid={true}
                              />
                            </Pressable>
                          ) : (
                            <Pressable onPress={() => handleLike(item)}>
                              <FontAwesome
                                name="thumbs-up"
                                color={'rgba(150,75,0,0.5)'}
                                size={18}
                                solid={false}
                              />
                            </Pressable>
                          )
                        ) : (
                          <Pressable onPress={() => handleLike(item)}>
                            <FontAwesome
                              name="thumbs-up"
                              color={'rgba(150,75,0,0.5)'}
                              size={18}
                              solid={false}
                            />
                          </Pressable>
                        )}
                      </View>
                      <Image
                        source={{uri: 'https' + item.productImage.substring(4)}}
                        style={styles.image}
                      />
                      <View style={styles.costTitleText}>
                        <Text style={styles.titleText}>{item.productName}</Text>
                        <Text style={styles.costText}>
                          Rs {item.productPrice} /-
                        </Text>
                      </View>
                    </View>
                  );
                })
              : null}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#ED7E2B',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
  },
  shadow: {
    backgroundColor: '#ED7E2B',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 25,
    fontFamily: 'Roboto-Medium',
  },
  icon: {
    marginHorizontal: 20,
  },
  textInput: {
    color: '#4F504F',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    height: Platform.OS === 'ios' ? 21 : 30,
    width: '78%',
    paddingBottom: 1,
  },
  form1: {
    marginTop: Platform.OS === 'ios' ? 14 : 15,
  },

  form: {
    marginTop: Platform.OS === 'ios' ? 40 : 30,
  },
  text: {
    height: 17,
    color: Platform.OS === 'ios' ? '#9F9F9F' : '#9F9F9F',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Roboto-Regular',
  },
  search: {
    marginHorizontal: '14%',
    tintColor: 'rgba(0,0,0,0.54)',
    marginTop: Platform.OS === 'ios' ? -2 : 8,
  },
  container: {
    marginHorizontal: 40,
    flexDirection: 'column',
    height: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
  },
  placeholder: {
    marginTop: 7,
  },
  mainView: {
    borderWidth: 1,
    height: 200,
    width: '50%',
    borderColor: 'rgba(150,75,0,0.15)',
  },
  subView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: 'rgba(150,75,0,0.5)',
  },
  image: {
    resizeMode: 'contain',
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginTop: 20,
  },
  costTitleText: {
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    height: 40,
  },
  titleText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: 'rgb(175,50,0)',
  },
  costText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: 'rgb(249, 105, 14)',
  },
});
