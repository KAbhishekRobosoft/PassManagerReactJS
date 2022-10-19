import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import ListDisplay from '../component/ListDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/AuthenticationSlice';

function FlatList({navigation}) {
  const [text, setText] = useState(false);
  const dispatch= useDispatch()
  let data = useSelector(state => state.addDetails);

  async function logOutFromAccount(){
    try {
      await AsyncStorage.removeItem('mPin');
    } catch (e) {
      console.log(e);
    }
    dispatch(logout());
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.main_con}>
      <View style={styles.bgm1}>
        <View style={styles.imgView}>
          <Pressable>
            <Image source={require('../images/burger.png')} />
          </Pressable>
        </View>
        <View style={styles.con1}>
          <Text style={styles.listText}>PASS{'\n'}MANAGER</Text>
        </View>

        <View style={styles.searchView}>
          <Pressable
            onPress={() => {
              setText(true);
            }}>
            <Image source={require('../images/search.png')} />
          </Pressable>
        </View>

        <View style={styles.syncView}>
          <Pressable>
            <Image source={require('../images/sync.png')} />
          </Pressable>
        </View>

        <View style={styles.profileView}>
          <Pressable onPress= {logOutFromAccount}>
            <Image source={require('../images/profile.png')} />
          </Pressable>
        </View>
      </View>

      <View style={styles.workCon}>
        {!text && (
          <View style={styles.txtView}>
            <Text style={styles.workText}>Sites</Text>
            <View style={styles.underLine}></View>
          </View>
        )}
        {text && (
          <View style={styles.txtInpView}>
            <TextInput
              style={styles.txtInp}
              placeholder="Type Keywords to search"
            />
            <Pressable onPress={() => setText(false)}>
              <Icon name="arrow-right" size={20} />
            </Pressable>
          </View>
        )}
        {!text && (
          <View style={styles.dropView}>
            <View style= {styles.textView1}>
              <Text style={styles.text2}>Social Media</Text>
            </View>

            <View style={styles.textView2}>
              <Text style={styles.text3}>07</Text>
            </View>

            <View style={styles.textView3}>
              <Image source={require('../images/copy.png')} />
            </View>
          </View>
        )}
      </View>

      <View style={styles.listBack}>
        <ScrollView>
          {data.map(ele => {
            {console.log(ele)}
            let img = ele.siteName.toLowerCase();
            return <ListDisplay navigation= {navigation} key={ele.id} img={img} ele={ele} />;
          })}
        </ScrollView>
        <View style={styles.AddView}>
          <Pressable onPress={() => navigation.navigate('AddSite')}>
            <Image source={require('../images/add.png')} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
  },

  textView1:{
    marginRight:10,
    marginTop:20
  },

  textView2:{
    marginTop:20,
    marginRight:10,
    backgroundColor:"#0e85ff",
    width:30,
    overflow:"hidden",
    borderRadius:20,
  },

  textView3:{
    marginRight:18,
    marginTop:20
  },

  text2:{
    fontSize:19.2,
  },

  text3:{
    fontSize:19.2,
    textAlign:"center"
  },

  dropView: {
    flexDirection: 'row',
    alignItems:"center"
  },

  listImg: {
    width: 40,
    height: 30,
  },

  listBack: {
    flex: Platform.OS === 'ios' ? 14 : 20,
  },

  underLine: {
    width: 29,
    backgroundColor: 'orange',
    height: 3,
    marginTop: 3,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  dropdown: {
    width: 180,
    marginRight: 20,
    height: 50,
    marginTop: 20,
  },

  rowComp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  txtView: {
    marginTop: 20,
    marginLeft: 20,
  },

  workText: {
    fontSize: 25,
  },

  txtInpView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    height: 55,
    marginTop: Platform.OS === "android" ? 12 : 0,
    marginBottom:Platform.OS === "ios" ? 14 : 0
  },

  workCon: {
    flexDirection: 'row',
    flex: 1.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bgm1: {
    flexDirection: 'row',
    backgroundColor: '#0e85ff',
    alignItems: 'center',
    width: '100%',
    height: 100,
    flex: 2,
  },

  searchView: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginLeft: 60,
  },

  txtInp: {
    fontSize: 15,
  },

  AddView: {
    marginTop: 500,
    marginLeft: 300,
    position: 'absolute',
  },

  profileView: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginLeft: 30,
  },

  syncView: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginLeft: 30,
  },

  imgView: {
    marginTop: Platform.OS === 'ios' ? 40 : 15,
    marginLeft: 30,
  },

  con1: {
    marginLeft: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 8,
  },

  listText: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FlatList;
