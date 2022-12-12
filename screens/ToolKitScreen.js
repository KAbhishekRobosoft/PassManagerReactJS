import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modals} from '../components/Modals';

export const ToolKit = ({navigation}) => {
  const [text, setText] = useState('');
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [isModalVisible5, setModalVisible5] = useState(false);

  const handleToggle1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const handleToggle2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const handleToggle3 = () => {
    setModalVisible3(!isModalVisible3);
  };
  const handleToggle4 = () => {
    setModalVisible4(!isModalVisible4);
  };
  const handleToggle5 = () => {
    setModalVisible5(!isModalVisible5);
  };

  const search = async value => {
    setText(value);
  };

  return (
    <SafeAreaView style={styles.safeareaView}>
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
        <Text style={styles.headerText}>Tool Kit</Text>
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
                <Text style={styles.text}>What is the trouble</Text>
              </View>
            ) : (
              <></>
            )}
          </>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            name="search"
            placeholder="What is the trouble?"
            placeholderTextColor={'rgba(141,138,138,0.87)'}
            value={text}
            onChangeText={value => search(value)}
            style={styles.textInput}
          />
          <Image
            source={require('../assets/images/search.png')}
            style={styles.search}
          />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Pressable onPress={handleToggle1}>
          <View style={styles.flatView}>
            <Image
              source={require('../assets/images/Onsite.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Onsite Minor Repairs</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleToggle2}>
          <View style={styles.flatView}>
            <Image
              source={require('../assets/images/Accident.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Vehicle Accident</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleToggle3}>
          <View style={styles.flatView}>
            <Image
              source={require('../assets/images/Battery.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Battery Drain</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleToggle4}>
          <View style={styles.flatView}>
            <Image
              source={require('../assets/images/Break.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Breakdown</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleToggle5}>
          <View style={styles.flatView}>
            <Image
              source={require('../assets/images/Chain.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Loose Chain</Text>
          </View>
        </Pressable>
      </ScrollView>
      <Modals
        isVisible={isModalVisible1}
        press={handleToggle1}
        title="Onsite Minor Repairs"
        text="If your Royal Enfield motorcycle breaks down due to a minor
            mechanical or electrical fault and an immediate repair on the spot
            is deemed possible, Royal Enfield shall assist the user by arranging
            for a technician to reach the breakdown location. Royal Enfield will
            bear the labour and conveyance costs. However, the cost of material
            and spare parts, if required, to repair the motorcycle on the spot
            and any other incidental conveyance to obtain such material and
            spare parts, will have to be borne by the user. This service will be
            provided when the motorcycle is not in a position to be ridden to
            the nearest Service Centre (Unlimited KM)."
      />
      <Modals
        isVisible={isModalVisible2}
        press={handleToggle2}
        title="Vehicle Accident"
        text="If your Royal Enfield motorcycle breaks down due to a minor
            mechanical or electrical fault and an immediate repair on the spot
            is deemed possible, Royal Enfield shall assist the user by arranging
            for a technician to reach the breakdown location. Royal Enfield will
            bear the labour and conveyance costs. However, the cost of material
            and spare parts, if required, to repair the motorcycle on the spot
            and any other incidental conveyance to obtain such material and
            spare parts, will have to be borne by the user. This service will be
            provided when the motorcycle is not in a position to be ridden to
            the nearest Service Centre (Unlimited KM)."
      />
      <Modals
        isVisible={isModalVisible3}
        press={handleToggle3}
        title="Batter Drain"
        text="Battery 
        management and maintenance is an essential step in getting the most out of your bike.
        A good battery will last for almost the entire lifetime of the bike and can go a long way in helping you 
        have a pleasant experience with your automobile."
      />
      <Modals
        isVisible={isModalVisible4}
        press={handleToggle4}
        title="Breakdown"
        text="Battery 
        management and maintenance is an essential step in getting the most out of your bike. 
        A good battery will last for almost the entire lifetime of the bike and can go a long way in 
        helping you have a pleasant experience with your automobile."
      />
      <Modals
        isVisible={isModalVisible5}
        press={handleToggle5}
        title="Loose Chain"
        text="To tighten the chain on a fixed-gear bike, start by flipping the bike over or placing 
        it on a bike stand. Loosen the rear axle and then pull back on the rear tire to make the chain 
        tighter. Make sure the chain isn't too tight or too loose, then tighten the rear tire again"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    backgroundColor: 'white',
  },
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
    paddingBottom: 3,
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
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#B4B3B3',
  },
  placeholder: {
    marginTop: 7,
  },
  flatView: {
    height: 54,
    marginHorizontal: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
  },
  image: {
    resizeMode: 'contain',
    width: 24,
    height: 28,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#4F504F',
    marginLeft: 15,
  },
  textSearchSomethingView: {
    alignItems: 'center',
    marginTop: '50%',
  },
  textSearchSomethingText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: 'rgba(0,0,0,0.54)',
  },
});
