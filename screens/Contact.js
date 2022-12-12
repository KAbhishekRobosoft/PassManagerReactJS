import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {selectContacts} from '../redux/ContactSlice';
import {filterContacts} from '../redux/ContactSlice';
import {ContactFlatList} from '../components/ContactsFlatList';

export const ContactDisplay = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.contact.contactsData);
  useEffect(() => {
    getContactBook();
  }, []);

  const getContactBook = () => {
    if (Platform.OS === 'ios') {
      Contacts.getAll()
        .then(contacts => {
          const trimmedContacts = contacts
            .sort((a, b) => a.givenName.localeCompare(b.givenName))
            .filter(c => c.phoneNumbers.length > 0)
            .map(c => {
              return {
                givenName: c.givenName,
                familyName: c.familyName,
                recordID: c.recordID,
                phoneNumbers: c.phoneNumbers,
                marked: false,
              };
            });
          if (data.length === 0) {
            dispatch(selectContacts(trimmedContacts));
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ])
        .then(() => {
          Contacts.getAll().then(contacts => {
            const trimmedContacts = contacts
              .sort((a, b) => a.givenName.localeCompare(b.givenName))
              .filter(c => c.phoneNumbers.length > 0)
              .map(c => {
                return {
                  givenName: c.givenName,
                  recordID: c.recordID,
                  phoneNumbers: c.phoneNumbers,
                  marked: false,
                };
              });
            if (data.length === 0) {
              dispatch(selectContacts(trimmedContacts));
            }
          });
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
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
          <Text style={styles.headerText}>Invite People</Text>
        </View>
        <View style={styles.searchView}>
          <Image
            source={require('../assets/images/search.png')}
            style={{tintColor: 'grey', alignSelf: 'center', marginLeft: 12}}
          />
          <TextInput
            name="searchContacts"
            placeholder="Search Name"
            placeholderTextColor="rgba(166,166,166,0.87)"
            fontFamily="Roboto-Medium"
            fontSize={12}
            alignSelf={'center'}
            marginLeft={6}
            width={'100%'}
            onChangeText={text => dispatch(filterContacts(text))}
          />
        </View>
        <View style={styles.flatView}>
          <ContactFlatList />
        </View>
      </View>
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
  searchView: {
    height: 40,
    width: '90%',
    marginTop: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    opacity: 0.9,
    backgroundColor: 'white',
  },
  flatView: {flex: 1, marginTop: 30},
});

