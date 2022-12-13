import {Formik, Field} from 'formik';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {setUserData} from '../redux/AuthSlice';
import {getVerifiedKeys} from '../utils/Functions';
import pdf from 'react-native-html-to-pdf';
import {PlaceholderTextFieldOwnerManual} from '../components/InputFields';
import {updateOwnerDetails} from '../services/OwnerAndBike';
import Share from 'react-native-share';
import {BikeDetails} from '../components/BikeDetailsComponent';
import Toast from 'react-native-simple-toast';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const OwnerManualEdit = ({navigation}) => {
  const userDetails = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);
  const bikedata = useSelector(state => state.shop.allBikeData);

  const update = async values => {
    const obj = {
      city: values.city,
      state: values.state,
      doorNumber: values.doorNumber,
      pincode: values.pincode,
      lisenceNumber: values.licence,
    };
    let cred = await getVerifiedKeys(authData.userToken);

    await updateOwnerDetails(obj, cred);

    const obj2 = {
      city: values.city,
      state: values.state,
      doorNumber: values.doorNumber,
      pincode: values.pincode,
      lisenceNumber: values.licence,
      userName: values.name,
      mobile: values.mobile,
      email: values.email,
    };
    dispatch(setUserData(obj2));
    Toast.show('Updated Successfully');
    navigation.navigate('OwnersManualDetail');
  };

  const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Personal and Bike Details</title>
            <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
            <style>
            ${htmlStyles}
            </style>
          </head>
          <body>
            <header>
              <h1>Personal and Bike Details</h1>
              <address>
                <p></p>
                <p></p>
                <p></p>
              </address>
            </header>
            <article>
           
              <h1><span>Personal Details</span></h1>
              <table >
              <tr>
                <th><span>Date :-</span></th>
                <td><span>${new Date()}</span></td>
              </tr>
                <tr>
                  <th><span>Licence No :- </span></th>
                  <td><span>${userDetails.lisenceNumber}</span></td>
                </tr>
                <tr>
                  <th><span>Name :- </span></th>
                  <td><span>${userDetails.userName}</span></td>
                </tr>
                <tr>
                  <th><span>Door No :- </span></th>
                  <td><span>${userDetails.doorNumber}</span></td>
                </tr>
                <tr>
                  <th><span>City :- </span></th>
                  <td><span>${userDetails.lisenceNumber}</span></td>
                </tr>
                <tr>
                  <th><span>Name :- </span></th>
                  <td><span>${userDetails.city}</span></td>
                </tr>
                <tr>
                  <th><span>State :- </span></th>
                  <td><span>${userDetails.state}</span></td>
                </tr>
                <tr>
                  <th><span>PinCode :- </span></th>
                  <td><span>${userDetails.pincode}</span></td>
                </tr>
                <tr>
                  <th><span>Mobile :- </span></th>
                  <td><span>${userDetails.mobile}</span></td>
                </tr>
                <tr>
                  <th><span>Email :- </span></th>
                  <td><span>${userDetails.email}</span></td>
                </tr>
              </table>

            </article>
              
              <table>
            <tr>
              <th><span>Engine :- </span></th>
              <td><span>${bikedata[0].engineNumber}</span></td>
            </tr>
            <tr>
              <th><span>Frame No :- </span></th>
              <td><span>${bikedata[0].frameNumber}</span></td>
            </tr>
            <tr>
              <th><span>Battery Make :- </span></th>
              <td><span>${bikedata[0].batteryMake}</span></td>
            </tr>
            <tr>
              <th><span>Registration No :- </span></th>
              <td><span>${bikedata[0].registerNumber}</span></td>
            </tr>
            <tr>
              <th><span>Model :- </span></th>
              <td><span>${bikedata[0].model}</span></td>
            </tr>
            <tr>
              <th><span>Color :- </span></th>
              <td><span>${bikedata[0].color}</span></td>
            </tr>
            <tr>
              <th><span>Dealer Code :- </span></th>
              <td><span>${bikedata[0].dealerCode}</span></td>
            </tr>
            </table>

          </body>
        </html>
      `;

  const createPDF = async () => {
    let options = {
      html: htmlContent,
      fileName: 'test',
      directory: 'Download',
      base64: true,
    };

    let file = await pdf.convert(options);

    shareOptions = {
      message: 'PDF',
      url: `data:application/pdf;base64,${file.base64}`,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      Toast.show('Shared Successfully');
    } catch (error) {
        console.log('error while sharing');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.mainView}>
          <View style={[styles.header]}>
            <View style={styles.subHeader}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <View style={styles.iconHeader}>
                  <Icon name="md-arrow-back" color={'white'} size={25} />
                </View>
              </Pressable>
              <Text style={styles.headerText}>Owners Manual</Text>
            </View>
            <Pressable onPress={createPDF}>
            <View style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/share.png')}
                style={styles.editImage}
              />
              </View>
            </Pressable>
          </View>
          <ScrollView style={{height: '88%'}}>
            <View style={styles.personalDetailView}>
              <Formik
                initialValues={{
                  licence: userDetails.lisenceNumber,
                  name: userDetails.userName,
                  doorNumber: userDetails.doorNumber,
                  city: userDetails.city,
                  state: userDetails.state,
                  pincode: JSON.stringify(userDetails.pincode),
                  mobile: userDetails.mobile,
                  email: userDetails.email,
                }}
                onSubmit={values => update(values)}>
                {({values, handleSubmit, isValid, resetForm}) => (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        marginHorizontal: '5%',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.personaldetailText}>
                        Personal Details
                      </Text>
                      <Pressable onPress={handleSubmit}>
                        <Image source={require('../assets/images/save.png')} />
                      </Pressable>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                      }}>
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="licence"
                        placeholder="Licence No."
                        keyboardType="numeric"
                        value={values.licence}
                        editable={false}
                        onTouchStart={() => Toast.show('Cant Be Edited')}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="name"
                        placeholder="Name"
                        keyboardType="default"
                        value={values.name}
                        editable={false}
                        defaultValue={userDetails.name}
                        onTouchStart={() => Toast.show('Cant Be Edited')}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="doorNumber"
                        placeholder="Door No."
                        keyboardType="numeric"
                        value={values.doorNumber}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="city"
                        placeholder="City"
                        keyboardType="default"
                        value={values.city}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="state"
                        placeholder="State"
                        keyboardType="default"
                        value={values.state}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="pincode"
                        placeholder="Pincode"
                        keyboardType="numeric"
                        value={values.pincode}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="mobile"
                        placeholder="Mobile"
                        keyboardType="default"
                        value={values.mobile}
                        editable={false}
                        onTouchStart={() => Toast.show('Cant Be Edited')}
                      />
                      <Field
                        component={PlaceholderTextFieldOwnerManual}
                        name="email"
                        placeholder="Email"
                        keyboardType="default"
                        value={values.email}
                        editable={false}
                        onTouchStart={() => Toast.show('Cant Be Edited')}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <View style={{marginTop: 10, bottom: 8}}>
              <BikeDetails header="Bike Details" />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    backgroundColor: '#F2944E',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
    fontFamily: 'Roboto-Medium',
  },
  iconHeader: {
    height: 64,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage: {
    resizeMode: 'contain',
    marginHorizontal: 25,
    width: 24,
    height: 27,
  },
  personalDetailView: {
    height: 584,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginTop: 30,
    shadowColor: 'rgba(175,170,170,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 10,
    borderRadius: 8,
  },
  personaldetailText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    lineHeight: 26,
    color: '#ED7F2C',
    width: '90%',
  },
});

export default OwnerManualEdit;

const htmlStyles = `
*{
  border: 10;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}
h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; alignitems:center;text-align: center; text-transform: uppercase; }
/* table */
table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: center; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }
/* page */
html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }
body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
/* article */
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }
/* table meta & balance */
table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
/* table meta */
table.meta th { width: 40%; }
table.meta td { width: 60%; }
/* table items */
table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }
table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }
/* table balance */
table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }
/* aside */
aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;
