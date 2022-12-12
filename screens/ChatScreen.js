import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  TextInput,
  ImageBackground,
  useWindowDimensions,
  FlatList,
  RefreshControl,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ReceiverContainer, SenderChatDetails} from '../components/chatDetails';
import PopUpMenu from '../components/PopUpMenu';
import Toast from 'react-native-simple-toast';
import {getVerifiedKeys} from '../utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/AuthSlice';
import {setInitialState} from '../redux/MileStoneSlice';
import { getChat } from '../services/Chats';
import { sendChat } from '../services/Chats';
import { uploadChatImage } from '../services/Chats';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { clearChat } from '../services/Chats';

const ChatScreen = ({navigation, route}) => {
  const textRef = useRef(null);
  const auth = useSelector(state => state.auth);
  const [text, setText] = useState('');
  const state = useSelector(state => state.milestone.initialState);
  const dispatch = useDispatch();
  const [chat, setChat] = useState([]);
  const [modal1, setmodal1] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const number = useSelector(state => state.auth.userCredentials.mobile);
  const authData = useSelector(state => state.auth);
  const {height, width} = useWindowDimensions();
  const top =
    width > height
      ? Platform.OS === 'ios'
        ? '80%'
        : '80%'
      : Platform.OS === 'ios'
      ? '95%'
      : '90%';

  useEffect(() => {
    setTimeout(async () => {
      const cred = await getVerifiedKeys(auth.userToken);
      dispatch(setToken(cred));
      const resp = await getChat(cred, route.params.id);
      setChat(resp.chatDetails);
      if (resp !== undefined) {
        Toast.show('Getting Chats');
      } else {
        Toast.show('Unable to get chats');
      }
    }, 500);
  }, [state]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const resp = await getChat(cred, route.params.id);
    if (resp !== undefined) {
      Toast.show('Getting Chats');
      setChat(resp.chatDetails);
    } else {
      Toast.show('Unable to get chats');
    }
    setRefreshing(false);
  }, []);

  const pickImage = () => {
    let resp;
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(async image => {
        const payload = new FormData();
        const file = [
          {key: 'id', value: route.params.id},
          {
            key: 'image',
            value: {
              uri: image.path,
              type: image.mime,
              name: `${image.filename}.${image.mime.substring(
                image.mime.indexOf('/') + 1,
              )}`,
            },
          },
        ];
        file.map(ele => {
          payload.append(ele.key, ele.value);
        });
        let cred = await getVerifiedKeys(auth.userToken);
        resp = await uploadChatImage(payload, cred);
        if (resp !== undefined) {
          let resp1 = await sendChat(
            cred,
            route.params.id,
            'https' + resp.url.substring(4),
          );
          Toast.show('Image Posted');
          dispatch(setInitialState(state));
        }
      })
      .catch(er => Toast.show('Error occured'));
  };

  const handleToggle = () => {
    setmodal1(!modal1);
  };

  const handleClearChat = async () => {
    let cred = await getVerifiedKeys(authData.userToken);
    if (route.params.mobile === number) {
      let response = await clearChat(route.params.id, cred);
      if (response !== undefined) {
        Toast.show('Chats Cleared');
        dispatch(setInitialState(state));
      }
    } else {
      Toast.show('You cannot clear the chat as you are not admin');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable onPress={() => handleToggle()}>
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
          <Text style={styles.headerText}>{route.params.tripName}</Text>
          <PopUpMenu
            options={[
              {
                title: 'Group Info',
                action: () => {
                  handleToggle();
                },
              },
              {
                title: 'Notifications',
                action: () => {
                  alert('bye');
                },
              },
              {
                title: 'Clear Chat',
                action: () => {
                  handleClearChat();
                },
              },
            ]}
            color="white"
            size={30}
          />
        </View>
      </Pressable>

      <ImageBackground
        source={require('../assets/images/chat.png')}
        style={styles.image}></ImageBackground>

      <View style={{height: '80%'}}>
        <FlatList
          data={chat}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            if (item.memberNumber === auth.userCredentials.mobile) {
              return <SenderChatDetails chat={item} />;
            } else {
              return <ReceiverContainer chat={item} />;
            }
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <View style={[styles.bottomContainer, styles.bottomshadow, {top}]}>
        <View style={styles.iconContainer}>
          <Pressable>
            <Image
              source={require('../assets/images/smile.png')}
              style={{height: 30, width: 30}}
            />
          </Pressable>
          <TextInput
            ref={textRef}
            style={styles.input}
            onChangeText={val => setText(val)}
            placeholder="Type a Message"
            placeholderTextColor="grey"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: '2%',
          }}>
          <Pressable onPress={pickImage}>
            <Image
              source={require('../assets/images/document.png')}
              style={{height: 27, width: 24, marginRight: 10}}
            />
          </Pressable>
          <Pressable
            onPress={async () => {
              const cred = await getVerifiedKeys(auth.userToken);
              dispatch(setToken(cred));
              const resp = await sendChat(cred, route.params.id, text);
              if (resp.message === 'chat saved successfully!!') {
                Toast.show('Refreshing');
                textRef.current.clear();
                dispatch(setInitialState(state));
              }
            }}>
            <Image
              source={require('../assets/images/send.png')}
              style={{height: 48, width: 48}}
            />
          </Pressable>
        </View>
      </View>
      {modal1 ? (
        <Modal
          isVisible={true}
          backdropOpacity={0.3}
          avoidKeyboard={true}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <View style={styles.modalView}>
            <Pressable onPress={() => handleToggle()}>
              <Icon
                name="close"
                size={27}
                color={'#A4A4A4'}
                style={styles.times}
              />
            </Pressable>
            <Image
              source={require('../assets/images/appicon.png')}
              style={styles.imageIcon}
            />
            <Text style={styles.GroupInfoText}>Group Info</Text>
            <ScrollView style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.adminText}>Admin</Text>
                <Text style={styles.adminMobileText}>
                  : {route.params.mobile}
                </Text>
              </View>
              {route.params.riders.map(ele => {
                return (
                  <View key={ele._id} style={styles.ridersView}>
                    <Text style={styles.ridersNameText}>{ele.riderName}</Text>
                    <Text style={styles.ridersNumberText}>
                      : {ele.riderPhoneNumber}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </Modal>
      ) : (
        <></>
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
    justifyContent: 'space-between',
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
    fontFamily: 'Roboto-Medium',
    right: '95%',
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
    position: 'absolute',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
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
    marginLeft: '3%',
    width: '80%',
  },

  image: {
    height: 341,
    width: 427,
    top: '50%',
    position: 'absolute',
    right: '2%',
    opacity: 0.9,
  },

  iconContainer: {
    flexDirection: 'row',
    marginLeft: '3%',
    width: '72%',
    alignItems: 'center',
  },
  GroupInfoText: {
    fontFamily: 'roboto-Medium',
    fontSize: 18,
  },
  modalView: {
    backgroundColor: 'white',
    height: 200,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  adminText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    width: '20%',
    color: '#ED7E2B',
  },
  adminMobileText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#ED7E2B',
  },
  ridersView: {
    flexDirection: 'row',
  },
  ridersNameText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    width: '20%',
  },
  ridersNumberText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
  imageIcon: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  times: {
    resizeMode: 'contain',
    marginLeft: '90%',
  },
});

export default ChatScreen;
