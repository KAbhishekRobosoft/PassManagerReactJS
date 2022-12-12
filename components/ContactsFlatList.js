import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectMarked} from '../redux/ContactSlice';
import {selectUnMarked} from '../redux/ContactSlice';
import {addTripContacts} from '../redux/ContactSlice';
import {deleteTripContacts} from '../redux/ContactSlice';
import Toast from 'react-native-simple-toast';

export const ContactFlatList = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.contact.contactsData);
  const contactData = useSelector(state => state.contact.addTripContacts);

  const handleTick = contacts => {
      dispatch(selectMarked(contacts));
      const obj= {id:contacts.recordID,riderName:contacts.givenName,riderPhoneNumber:contacts.phoneNumbers[0].number}
      dispatch(addTripContacts(obj));
  };

  const handleUnTick = contacts => {
    dispatch(selectUnMarked(contacts));
    const obj= {id:contacts.recordID,riderName:contacts.givenName,riderPhoneNumber:contacts.phoneNumbers[0].number}
    dispatch(deleteTripContacts(obj));
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <View style={styles.pressable} key={item.recordID}>
          <View style={styles.circleView}></View>
          <Text style={styles.contactName}>{item.givenName}</Text>
          {!item.marked ? (
            <Pressable
              onPress={() => {
                if(contactData.length === 5)
                  Toast.show('Maximum of 5 Riders can be added')
                  else
                    handleTick(item);
              }}>
              <Image
                source={require('../assets/images/untick.png')}
                style={styles.tickImage}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleUnTick(item)}>
              <Image
                source={require('../assets/images/tick.png')}
                style={styles.tickImage}
              />
            </Pressable>
          )}
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly'
  },
  tickImage: {
    width: 27,
    height: 27,
  },
  contactName: {
    marginLeft: 20,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.87)',
    width: '50%',
    lineHeight: 21,
  },
  circleView: {
    backgroundColor: 'rgba(0,0,0,0.38)',
    width: 41.04,
    height: 41,
    borderRadius: 20,
    marginLeft: 40,
  },
});
