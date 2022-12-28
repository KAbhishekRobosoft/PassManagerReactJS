import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import ListDisplay from '../components/HotelListDisplay';
import VirtualList from './VirtualList';
import { getParameter } from '../services/Places';
import { useSelector } from 'react-redux';

function ParameterWithHeaderList({navigation,route}) {
  const coord= useSelector(state=>state.auth.setCoord)
  const [placeData,setPlaceData]= useState([])
  const {height, width} = useWindowDimensions();
  const left =
    width > height
      ? Platform.OS === 'ios'
        ? 100
        : 100
      : Platform.OS === 'ios'
      ? 50
      : 50;

  useEffect(()=>{
    setTimeout(async ()=>{
        const resp= await getParameter(route.params.name,coord)
        setPlaceData(resp)
    })
  })
  const renderItem = ({item,route}) => {
    return <ListDisplay navigation={navigation} item={item} />;
  };

  return (
    <SafeAreaView style={styles.parameterContainer}>
    {placeData.length > 0 ? <>
      <View style={styles.reviewHeader}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
          <View style={styles.iconHeader}>
            <Image
              style={styles.backIcon}
              source={require('../assets/images/back_icon.png')}
            />
          </View>
        </TouchableOpacity>
        <Text style={[styles.reviewHotelText, {marginLeft: left}]}>{route.params.headerName}</Text>
      </View>
      <View style={styles.parameterList}>
        <VirtualList data={placeData} renderItem={renderItem} />
      </View>
      </>:(<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large" color="purple" />
      </View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parameterContainer: {
    flex: 1,
  },

  parameterList: {
    flex: 1,
  },

  reviewHotelText: {
    fontFamily: 'Avenir Book',
    color: 'white',
    fontSize: 20,
  },

  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10
  },

  backIcon: {
    height: 20,
    width: 20,
  },

  reviewHeader: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#370F24',
  },
});
export default ParameterWithHeaderList;
