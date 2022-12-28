import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';
import VirtualList from '../components/VirtualList';
import ReviewList from '../components/ReviewList';
import {getReviews} from '../services/Places';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

function ReviewScreen({navigation, route}) {
  const [reviewData, setReviewData] = useState([]);
  const state = useSelector(state => state.auth.initialState);
  const authData = useSelector(state => state.auth);
  const state2 = useSelector(state => state.auth.initialState2);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const resp = await getReviews(route.params.id);
        setReviewData(resp.reviewText);
      } catch (er) {
        Toast.show('Network Error');
      }
    }, 500);
  }, [state2]);

  const renderItem = ({item}) => {
    return <ReviewList item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.reviewContainer}>
       <StatusBar backgroundColor="#370F24" />
      <View style={styles.reviewHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.iconHeader}>
            <Image
              style={styles.backIcon}
              source={require('../assets/images/back_icon.png')}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.reviewHotelText}>{route.params.name}</Text>
        {authData.userToken !== null && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('addReview', {id: route.params.id});
            }}>
            <View style={styles.iconHeader}>
              <Image
                style={styles.review}
                source={require('../assets/images/review.png')}
              />
            </View>
          </TouchableOpacity>
        )}
        {authData.userToken === null && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}>
            <View style={styles.iconHeader}>
              <Image
                style={styles.review}
                source={require('../assets/images/review.png')}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {reviewData.length > 0 ? (
        <View style={styles.reviewView}>
          <VirtualList
            data={reviewData}
            renderItem={renderItem}
            keyExtractor={item => item.reviewerId}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{fontFamily: 'Avenir Book', fontSize: 18}}>
            No reviews posted
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    flex: 1,
  },

  reviewView: {
    flex: 1,
  },

  reviewHotelText: {
    fontFamily: 'Avenir Book',
    color: 'white',
    fontSize: 20,
  },

  reviewHeader: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#370F24',
  },

  review: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginRight: 10,
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    height: 20,
    width: 20,
  },
});

export default ReviewScreen;
