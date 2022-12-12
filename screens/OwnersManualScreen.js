import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../components/Buttons';
import {DropDownInputField} from '../components/InputFields';
import {useDispatch, useSelector} from 'react-redux';
import {fliteredBikeDetails} from '../redux/AccessoriesSlice';
import Toast from 'react-native-simple-toast';


const OwnersManualScreen = ({navigation}) => {
  useEffect(() => {}, [selected]);
  const Data = useSelector(state => state.shop.bikeType);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const submit = () => {
    if (selected ===1) {
     Toast.show('Select Vehicle Type')
    } else {
      dispatch(fliteredBikeDetails(selected));
      navigation.navigate('OwnersManualDetail');
     
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={[styles.header, styles.shadow]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="md-arrow-back"
            color="white"
            size={25}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>Owners Manual</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.dropDrowView}>
          <DropDownInputField
            data={Data}
            values={selected}
            setSelected={value => setSelected(value)}
            placeholder="Vehicle Type"
            defaultOption={{key: 1, value: 'Vehicle Type'}}
       
          />
        </View>
        <View style={styles.btn}>
          <ButtonLarge title="Go" onPress={submit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnersManualScreen;

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
  scrollView: {
    height: '90%',
  },
  btn: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  dropDrowView: {
    width: '80%',
    alignSelf: 'center',
  },
});
