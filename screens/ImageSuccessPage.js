import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import ButtonLarge from '../components/Buttons';
import {addBikeData, addBikeType} from '../redux/AccessoriesSlice';
import {getBikeDetails} from '../services/OwnerAndBike';
import {getVerifiedKeys} from '../utils/Functions';
import Toast from 'react-native-simple-toast';
import {setToken} from '../redux/AuthSlice';

function ImageSuccessPage({navigation}) {
  const authData = useSelector(state => state.auth);
  const {width, height} = useWindowDimensions();
  const marginRight = width > height ? (Platform.OS === 'ios' ? 60 : 50) : 10;
  const marginTop = width > height ? (Platform.OS === 'ios' ? 15 : 0) : 39;
  const hadBike = useSelector(state => state.auth.userCredentials);
  const bikeData = useSelector(state => state.shop.allBikeData);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      try {
        const key = await getVerifiedKeys(authData.userToken);
        dispatch(setToken(key));
        let bikeResponse = await getBikeDetails(key);
        dispatch(addBikeData(bikeResponse));
      } catch (er) {
        Toast.show('Error Occurred');
      }
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.success_con}>
      <View style={styles.success_subcon}>
        <Pressable style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back_arrow.png')} />
        </Pressable>
       
          <ScrollView
            style={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.content_con}>
              {authData.image === '' && (
                <Image
                  style={styles.rUserImg}
                  source={require('../assets/images/photoless.png')}
                />
              )}
              {authData.image.length > 0 && (
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{width: 246, height: 86}}
                    source={require('../assets/images/blueCircle.png')}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 140,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={styles.rUserImg1}
                      source={{uri: authData.image}}
                    />
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: marginRight,
                        alignSelf: 'flex-end',
                        marginBottom: 10,
                      }}
                      source={require('../assets/images/green_tick.png')}
                    />
                  </View>
                </View>
              )}
              <Text style={styles.sucText1}>Awesome</Text>
              <Text style={styles.sucText2}>Lets move on and make some</Text>
              <Text style={styles.sucText3}>crazy trips</Text>
              <View style={{marginTop: marginTop}}>
                <ButtonLarge
                  onPress={() => {
                    if (hadBike.haveBike) {
                      if (bikeData.length > 0) {
                        navigation.navigate('subStack');
                      } else {
                        navigation.navigate('AddBikeDetails');
                      }
                    } else {
                      navigation.navigate('subStack');
                    }
                  }}
                  title="LETS GET STARTED"
                />
              </View>
            </View>
          </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rUserImg: {
    height: 180,
    width: 246,
    marginTop: 13,
  },

  success_con: {
    flex: 1,
    width: '100%',
  },

  sucText1: {
    marginTop: 42,
    lineHeight: 23,
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
  },

  sucText2: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F504F',
  },

  sucText3: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F504F',
  },

  backArrow: {
    alignSelf: 'flex-start',
    marginLeft: 19,
    marginTop: 16,
  },

  success_subcon: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },

  content_con: {
    flex: 4,
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },

  rUserImg1: {
    borderRadius: 80,
    height: 133,
    width: 133,
    position: 'absolute',
  },
});

export default ImageSuccessPage;
