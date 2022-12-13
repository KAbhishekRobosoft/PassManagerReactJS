import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDownInputField} from '../components/InputFields';
import {NewServiceRecordDetails} from '../components/ServiceRecordDetails';
import {PastServiceRecordDetails} from '../components/ServiceRecordDetails';
import {DropDownInputField2} from '../components/InputFields';
import {useSelector} from 'react-redux';

const ServiceRecord = ({navigation}) => {
  const [bikeSelected, setBikeSelected] = useState('');
  const [serviceSelected, setServiceSelected] = useState('');

  const bikedata = useSelector(state => state.shop.bikeType);
  const serviceData = useSelector(state => state.shop.serviceData);
  const servicedata = [
    {
      key: 'Free service',
      value: 'Free service',
    },
    {
      key: 'General service',
      value: 'General service',
    },
    {
      key: 'Breakdown assistance',
      value: 'Breakdown assistance',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={[styles.header, styles.shadow]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.iconHeader}>
          <Icon
            name="md-arrow-back"
            color={'white'}
            size={25}
          />
          </View>
        </Pressable>
        <Text style={styles.headerText}>Service Records</Text>
      </View>
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
          <DropDownInputField
            data={bikedata}
            values={bikeSelected}
            setSelected={value => setBikeSelected(value)}
            placeholder="Vehicle Type"
          />
          <DropDownInputField2
            data={servicedata}
            values={serviceSelected}
            setSelected={value => setServiceSelected(value)}
            placeholder="Service Type"
          />
        </View>
        {!bikeSelected == '' && !serviceSelected == '' ? (
          <View>
            {serviceData.length > 0 ? (
              serviceData
                .filter(ele => ele.serviceType === serviceSelected)
                .filter(ele =>  new Date(ele.slotDate) > Date.now())
                .map(ele => (
                  <View key={ele._id}>
                    <NewServiceRecordDetails
                      navigation={navigation}
                      data={ele}
                    />
                  </View>
                ))
            ) : (
              <>
                <Text style={styles.alternateText}>No Service Records found.</Text>
              </>
            )}
            {serviceData.length > 0 ? (
              serviceData
                .filter(ele => ele.serviceType === serviceSelected)
                .filter(ele => new Date(ele.slotDate) < Date.now())
                .map(ele => (
                  <View key={ele._id}>
                    <PastServiceRecordDetails
                      navigation={navigation}
                      data={ele}
                    />
                  </View>
                ))
            ) : (
              <View>
                <Text style={styles.alternateText}></Text>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.alternateText}>
              Select Service and Vehicle Type.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#F2944E',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  shadow: {
    backgroundColor: '#F2944E',
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
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    marginHorizontal: '6%',
  },
  container2: {
    width: '100%',
    paddingHorizontal: '7%',
  },
  alternateText: {
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 70,
    color: '#ED7E2B'
  },
});

export default ServiceRecord;
