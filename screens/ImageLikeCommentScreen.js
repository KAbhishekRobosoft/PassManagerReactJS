import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  deSetLoading,
  setInitialState,
  setLoading,
} from '../redux/MileStoneSlice';
import {addLike} from '../services/Trips';
import {getParticularPhoto} from '../services/Trips';
import {getVerifiedKeys} from '../utils/Functions';
import {setToken} from '../redux/AuthSlice';
import {addComments} from '../services/Trips';
import Toast from 'react-native-simple-toast';
import {deleteComment} from '../services/Trips';

const ImageLikeCommentScreen = ({navigation, route}) => {

  const [refreshing, setRefreshing] = useState(false);
  const [comments, Setcomments] = useState(false);
  const [distinctComments, SetdistinctComments] = useState(false);
  const [likeView, setLikeView] = useState(false);
  const [imgData, setImgData] = useState({});
  const state = useSelector(state => state.milestone.initialState);
  const {height, width} = useWindowDimensions();
  const keyboard= width > height ? (Platform.OS === 'ios' ? 10 : 0) : (Platform.OS === 'ios' ? 50 : 50);
  const top = width > height ? (Platform.OS === 'ios' ? '80%' : '80%') : '95%';
  const loading = useSelector(state => state.milestone.isLoading);
  const authData = useSelector(state => state.auth);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const textRef = useRef(null);

  useEffect(() => {
    dispatch(deSetLoading());
    setTimeout(async () => {
      const cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const response = await getParticularPhoto(cred, route.params.id);
      setImgData(response);
      dispatch(setLoading());
    });
  }, [state]);
  const likeAdd = async () => {
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const resp = await addLike(cred, imgData.photos._id);

    if (resp !== undefined) {
      Toast.show('Like Status Changed');
      dispatch(setInitialState(state));
    } else {
      Toast.show("Couldn't like the Image");
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const cred = await getVerifiedKeys(authData.userToken);
      dispatch(setToken(cred));
      const response = await getParticularPhoto(cred, route.params.id);
      setImgData(response);
      dispatch(setLoading());
    } catch (er) {
      Toast.show('Error occurred while refreshing');
    }
    setRefreshing(false);
  }, []);

  async function comment() {
    const cred = await getVerifiedKeys(authData.userToken);
    dispatch(setToken(cred));
    const resp = await addComments(cred, imgData.photos._id, commentText);
    if (resp !== undefined) {
      textRef.current.clear();
      Toast.show('Comment added successfully');
      dispatch(setInitialState(state));
    } else {
      Toast.show('Failed to add a comment');
    }
  }

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  const position = new Animated.ValueXY({x: 0, y: 50});
  Animated.timing(position, {
    toValue: {x: 0, y: 0},
    duration: 400,
    useNativeDriver: true,
  }).start();
  const position1 = new Animated.ValueXY({x: 0, y: 100});
  Animated.timing(position1, {
    toValue: {x: 0, y: 100},
    duration: 700,
    useNativeDriver: true,
  }).start();

  return (
    <SafeAreaView style={styles.main}>
      {JSON.stringify(imgData) !== '{}' ? (
        <>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name="md-arrow-back"
                color="grey"
                size={25}
                style={styles.icon}
              />
            </Pressable>
          </View>
          <View>
            <KeyboardAvoidingView
              keyboardVerticalOffset={keyboard}
              behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <View style={styles.imgContainer}>
                  <Image
                    style={styles.img}
                    source={{uri: route.params.image}}
                  />
                  <View style={styles.likeCommentView}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 68,
                        justifyContent: 'space-between',
                      }}>
                      <Pressable
                        onPress={() => {
                          setLikeView(!likeView);
                          Setcomments(false);
                          SetdistinctComments(false);
                        }}>
                        <Text style={styles.text}>
                          {imgData.photos.likeCount} Likes
                        </Text>
                      </Pressable>

                      {imgData.liked ? (
                        <Pressable onPress={() => likeAdd()}>
                          <Icons name="heart" color="red" size={18} />
                        </Pressable>
                      ) : (
                        <Pressable onPress={() => likeAdd()}>
                          <Icons name="heart-o" color="grey" size={18} />
                        </Pressable>
                      )}
                    </View>
                    <Pressable
                      onPress={() => {
                        Setcomments(!comments);
                        setLikeView(false);
                        SetdistinctComments(false);
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: 130,

                          justifyContent: 'space-around',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.text}>
                          {' '}
                          {imgData.photos.commentCount} Comments
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        SetdistinctComments(!distinctComments);
                        setLikeView(false);
                        Setcomments(false);
                      }}>
                      <Icons name="comment" color="grey" size={18} />
                    </Pressable>
                  </View>
                  {comments ? (
                    <Animated.View
                      style={[
                        {
                          height: 200,
                          width: '100%',
                          alignSelf: 'center',
                          transform: [
                            {translateX: position.x},
                            {translateY: position.y},
                          ],
                          backgroundColor: 'black',
                          borderRadius: 20,
                          marginVertical: 15,
                          shadowColor: 'rgba(142,142,142,0.5)',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowRadius: 4,
                          shadowOpacity: 0.9,
                          elevation: 4,
                          opacity: 0.9,
                          borderRadius: 20,
                          marginVertical: 15,
                        },
                        styles.bottomshadow,
                      ]}>
                      {imgData.photos.commentData?.length === 0 ? (
                        <View
                          style={{
                            justifyContent: 'center',

                            alignItems: 'center',
                            height: 200,
                          }}>
                          <Text style={{fontWeight: 'bold', color: 'black'}}>
                            No Comments
                          </Text>
                        </View>
                      ) : (
                        <ScrollView
                          style={{padding: 5}}
                          showsVerticalScrollIndicator={false}>
                          {imgData.photos.commentData?.length > 0 &&
                            imgData.photos.commentData.map(item => {
                              return (
                                <View
                                  key={item._id}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingBottom: 3,
                                  }}>
                                  <View>
                                    <Pressable
                                      onPress={() => {
                                        if (
                                          authData.userCredentials.mobile !==
                                          item.commentedNumber
                                        )
                                          navigation.navigate('viewProfile', {
                                            mobile: item.commentedNumber,
                                          });
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          height: 45,
                                          paddingHorizontal: 10,
                                        }}>
                                        {item.hasOwnProperty(
                                          'commentedUserImage',
                                        ) ? (
                                          <Image
                                            style={{
                                              height: 25,
                                              width: 25,
                                              borderRadius: 30,
                                            }}
                                            source={{
                                              uri:
                                                'https' +
                                                item.commentedUserImage.substring(
                                                  4,
                                                ),
                                            }}
                                          />
                                        ) : (
                                          <Image
                                            style={{
                                              height: 25,
                                              width: 30,
                                              borderRadius: 30,
                                            }}
                                            source={require('../assets/images/photoless.png')}
                                          />
                                        )}

                                        <Text
                                          style={{
                                            fontWeight: 'bold',
                                            fontFamily: 'Roboto-Regular',
                                            color: '#ED7E2B',
                                            marginLeft: 10,
                                            fontSize: 15,
                                          }}>
                                          {item.commentedNumber ===
                                          authData.userCredentials.mobile
                                            ? 'You'
                                            : item.commentedBy}
                                        </Text>
                                      </View>
                                    </Pressable>
                                    <Text
                                      style={{
                                        fontFamily: 'Roboto-Regular',
                                        fontWeight: 'bold',
                                        left: 45,
                                        color: 'black',
                                      }}>
                                      {item.commented}
                                    </Text>
                                  </View>
                                  {item.commentedNumber ===
                                  authData.userCredentials.mobile ? (
                                    <TouchableOpacity
                                      onPress={async () => {
                                        const cred = await getVerifiedKeys(
                                          authData.userToken,
                                        );
                                        dispatch(setToken(cred));
                                        const resp = await deleteComment(
                                          cred,
                                          imgData.photos._id,
                                          item._id,
                                        );
                                        if (resp !== undefined) {
                                          Toast.show(
                                            'Comment deleted successfully',
                                          );
                                          dispatch(setInitialState(state));
                                        } else {
                                          Toast.show(
                                            'Failed to delete a comment',
                                          );
                                        }
                                      }}>
                                      <Icon1
                                        style={{marginRight: 10}}
                                        name="trash"
                                        size={18}
                                        color="black"
                                      />
                                    </TouchableOpacity>
                                  ) : null}
                                </View>
                              );
                            })}
                        </ScrollView>
                      )}
                    </Animated.View>
                  ) : null}
                  {distinctComments ? (
                    <Animated.View
                      style={[
                        {
                          height: 200,
                          width: '100%',
                          alignSelf: 'center',
                          transform: [
                            {translateX: position.x},
                            {translateY: position.y},
                          ],
                          backgroundColor: 'black',
                          borderRadius: 20,
                          marginVertical: 15,
                          shadowColor: 'rgba(142,142,142,0.5)',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowRadius: 4,
                          shadowOpacity: 0.9,
                          elevation: 4,
                          opacity: 0.9,
                          borderRadius: 20,
                          marginVertical: 15,
                        },
                        styles.bottomshadow,
                      ]}>
                      {imgData.distinctComment?.length === 0 ? (
                        <View
                          style={{
                            justifyContent: 'center',

                            alignItems: 'center',
                            height: 200,
                          }}>
                          <Text style={{fontWeight: 'bold', color: 'black'}}>
                            No Distinct Comments
                          </Text>
                        </View>
                      ) : (
                        <ScrollView
                          style={{padding: 5}}
                          showsVerticalScrollIndicator={false}>
                          {imgData.distinctComment?.length > 0 &&
                            imgData.distinctComment.map(item => {
                              return (
                                <View
                                  key={item._id}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingBottom: 3,
                                  }}>
                                  <View>
                                    <Pressable
                                      onPress={() => {
                                        if (
                                          authData.userCredentials.mobile !==
                                          item.mobile
                                        )
                                          navigation.navigate('viewProfile', {
                                            mobile: item.mobile,
                                          });
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          height: 35,
                                          paddingHorizontal: 10,
                                        }}>
                                        {item.hasOwnProperty('profileImage') ? (
                                          <Image
                                            style={{
                                              height: 25,
                                              width: 30,
                                              borderRadius: 30,
                                            }}
                                            source={{
                                              uri:
                                                'https' +
                                                item.profileImage.substring(4),
                                            }}
                                          />
                                        ) : (
                                          <Image
                                            style={{
                                              height: 25,
                                              width: 30,
                                              borderRadius: 30,
                                            }}
                                            source={require('../assets/images/photoless.png')}
                                          />
                                        )}

                                        <Text
                                          style={{
                                            fontWeight: 'bold',
                                            fontFamily: 'Roboto-Regular',
                                            color: '#ED7E2B',
                                            marginLeft: 10,
                                            fontSize: 15,
                                          }}>
                                          {item.mobile ===
                                          authData.userCredentials.mobile
                                            ? 'You'
                                            : item.userName}
                                        </Text>
                                      </View>
                                    </Pressable>
                                  </View>
                                </View>
                              );
                            })}
                        </ScrollView>
                      )}
                    </Animated.View>
                  ) : null}
                  {likeView ? (
                    <Animated.View
                      style={[
                        {
                          height: 200,
                          width: '100%',
                          alignSelf: 'center',
                          transform: [
                            {translateX: position.x},
                            {translateY: position.y},
                          ],
                          shadowColor: 'rgba(142,142,142,0.5)',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowRadius: 4,
                          shadowOpacity: 0.9,
                          elevation: 4,
                          opacity: 0.9,
                          borderRadius: 20,
                          marginVertical: 15,
                        },
                        styles.bottomshadow,
                      ]}>
                      {imgData.photos.likedBy?.length === 0 ? (
                        <View
                          style={{
                            justifyContent: 'center',

                            alignItems: 'center',
                            height: 200,
                          }}>
                          <Text style={{fontWeight: 'bold', color: 'black'}}>
                            No Likes
                          </Text>
                        </View>
                      ) : (
                        <ScrollView
                          style={{paddingHorizontal: 10}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              top: 10,
                            }}>
                            <Icons
                              name="heart"
                              color="red"
                              size={18}
                              //style={styles.icon}
                            />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontFamily: 'Roboto-Regular',
                                marginLeft: 10,
                                fontSize: 16,
                                color: '#ED7E2B',
                                textAlign: 'center',
                              }}>
                              Liked By
                            </Text>
                          </View>
                          {imgData.photos.likedBy?.length > 0
                            ? imgData.photos.likedBy.map(item => {
                                return (
                                  <View
                                    key={item._id}
                                    style={{
                                      margin: 5,
                                      height: 20,
                                      paddingHorizontal: 10,
                                      //borderWidth:1
                                    }}>
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto-Regular',
                                        fontSize: 15,
                                        top: 8,
                                        color: '#ED7E2B',
                                        //borderWidth:1
                                      }}>
                                      {item.likedNumber ===
                                      authData.userCredentials.mobile
                                        ? 'You'
                                        : item.likedName}
                                    </Text>
                                  </View>
                                );
                              })
                            : null}
                        </ScrollView>
                      )}
                    </Animated.View>
                  ) : null}
                </View>

                <Animated.View
                  style={[
                    styles.bottomContainer,
                    styles.bottomshadow,
                    {
                      transform: [
                        {translateX: position1.x},
                        {translateY: position1.y},
                      ],
                    },
                  ]}>
                  <View style={styles.iconContainer}>
                    <TextInput
                      style={styles.input}
                      ref={textRef}
                      placeholder="Comment"
                      placeholderTextColor="grey"
                      onChangeText={val => {
                        setCommentText(val);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: '2%',
                    }}>
                    <Pressable onPress={() => comment()}>
                      <Image
                        source={require('../assets/images/send.png')}
                        style={{height: 48, width: 48}}
                      />
                    </Pressable>
                  </View>
                </Animated.View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default ImageLikeCommentScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    height: 64,
    justifyContent: 'center',
    backgroundColor:'rgba(52, 52, 52, 0.1)',
    flexDirection:"row",
    width:"100%",
    borderWidth:1
  },
  imgContainer: {
    height: 550,
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    height: '66%',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    borderColor: 'grey',
  },
  icon: {
    marginHorizontal: 20,
  },
  bottomContainer: {
    height: 60,
    marginHorizontal: '6%',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(142,142,142,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 4,
    opacity: 0.9,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 140,
  },
  bottomshadow: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  input: {
    color: '#7F7F7F',
    fontSize: 16,
    fontFamily: 'Roboto',
    letterSpacing: 0.8,
    marginLeft: '6%',
    width: '80%',
    height: 70
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '3%',
    width: '80%',
  },
  likeCommentView: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  text: {
    color: 'grey',
    fontFamily: 'Roboto-Regular',
  },
  textLike: {
    color: '#FF5C4D',
    fontFamily: 'Roboto-Regular',
  },
  textComment: {
    color: '#FF9636',
    fontFamily: 'Roboto-Regular',
  },
});
