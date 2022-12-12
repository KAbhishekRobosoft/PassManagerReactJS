import React from 'react';
import {
  View,
  SafeAreaView,
  Pressable,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import InvoiceItem from '../components/InvoiceItemPrice';
import {useRoute} from '@react-navigation/native';
import {month1} from '../utils/Functions';
import pdf from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/Ionicons';
import FileViewer from 'react-native-file-viewer';
import uuid from 'react-native-uuid';

import Toast from 'react-native-simple-toast';

const Invoice = ({navigation}) => {
  const route = useRoute();
  const arr = [
    {itemName: 'oil', itemQuantity: 3, itemPrice: 100},
    {itemName: 'brake', itemQuantity: 5, itemPrice: 22},
    {itemName: 'ennn', itemQuantity: 6, itemPrice: 33},
  ];
  const htmlContent = `
  <html>
    <head>
      <meta charset="utf-8">
      <title>INVOICE</title>
      <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
      <style>
      ${htmlStyles}
      </style>
    </head>
    <body>
      <header>
        <h1>INVOICE</h1>
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
          <td><span>${route.params.invoice[0].invoiceDate.substring(8, 10)}, ${
    month1[route.params.invoice[0].invoiceDate.substring(5, 7)]
  },
          ${route.params.invoice[0].invoiceDate.substring(0, 4)}
        </span></td>
        </tr>
          <tr>
            <th><span>Oil:- </span></th>
            <td><span></span>1000/-</td>
          </tr>
       
          <tr>
            <th><span>Battery :- </span></th>
            <td><span></span>1000/-</td>
          </tr>
       
          <tr>
            <th><span>Tyre Pressure:- </span></th>
            <td><span></span>1000/-</td>
          </tr>
       
          <tr>
            <th><span>Indicator:- </span></th>
            <td><span></span>1000/-</td>
          </tr>
          <tr>
            <th><span>Total :- </span></th>
            <td><span></span>4000/-</td>
          </tr>
       
          
        </table>

      </article>
        <h1><span></span></h1>
        <table>
      
      
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

    Alert.alert(
      'Succes',
      'Path' + file.filePath,
      [
        {text: 'cancel', style: 'cancel'},
        {text: 'open', onPress: () => openfile(file.filePath)},
      ],
      {cancelable: true},
    );

    const openfile = fileName => {
      const path = fileName;

      FileViewer.open(path)
        .then(() => {
          Toast.show('Downloded Successfully');
        })
        .catch(error => {
          alert('error in downloading');
        });
    };
    // shareOptions = {
    //   message: 'PDF',
    //   url: `data:application/pdf;base64,${file.base64}`,
    // };
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="md-arrow-back"
              color={'#ED7F2C'}
              size={25}
              style={styles.icon}
            />
          </Pressable>
          <Pressable onPress={createPDF}>
            <Image
              source={require('../assets/images/download.png')}
              style={styles.icon}
            />
          </Pressable>
        </View>
        {route.params.invoice[0].paid ? (
          <View>
            <ImageBackground
              source={require('../assets/images/whitesheet.png')}
              style={styles.backgroundImage}>
              <View style={styles.maintextContainer}>
                <View>
                  <Text style={styles.invoiceText}>Invoice</Text>
                  <Text style={styles.dateText}>
                    {route.params.invoice[0].invoiceDate.substring(8, 10)}{' '}
                    {
                      month1[
                        route.params.invoice[0].invoiceDate.substring(5, 7)
                      ]
                    }
                    , {route.params.invoice[0].invoiceDate.substring(0, 4)}
                  </Text>
                </View>
                <Text style={styles.billNo}>
                  #{route.params.invoice[0].invoiceNumber}
                </Text>
              </View>
              <Text style={styles.ruppesText}>
                Rs {route.params.invoice[0].total}/-
              </Text>
              {route.params.service === 'Free service' ? (
                <Text style={styles.statusText2}>Free Service</Text>
              ) : (
                <View style={styles.statusContainer2}>
                  <Image
                    source={require('../assets/images/checkmark.png')}
                    style={{height: 17, width: 17, marginRight: 2}}
                  />
                  <Text style={styles.statusText2}>Paid</Text>
                </View>
              )}

              <View
                style={{
                  borderWidth: 0.7,
                  marginVertical: 20,
                  width: '90%',
                  alignSelf: 'center',
                  borderColor: 'grey',
                }}></View>
              <View style={styles.ProducttextContainer}>
                <Text style={styles.productText}>PRODUCT</Text>
                <View style={styles.unitContainer}>
                  <Text style={styles.productText}>UNIT</Text>
                  <Text style={styles.productText}>PRICE</Text>
                </View>
              </View>
              {route.params.invoice[0].items.length > 0
                ? route.params.invoice[0].items.map(e => {
                    return <InvoiceItem ele={e} key={e._id} />;
                  })
                : null}

              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalText}>TOTAL</Text>
                <Text style={styles.totalText}>
                  {route.params.invoice[0].total}/-
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 0.7,
                  marginVertical: 20,
                  width: '90%',
                  alignSelf: 'center',
                  borderColor: 'grey',
                }}></View>
            </ImageBackground>
          </View>
        ) : (
          <View>
            <ImageBackground
              source={require('../assets/images/whitesheet.png')}
              style={styles.backgroundImage}>
              <View style={styles.maintextContainer}>
                <View>
                  <Text style={styles.invoiceText}>Invoice</Text>
                  <Text style={styles.dateText}>
                    {route.params.invoice[0].invoiceDate.substring(8, 10)}{' '}
                    {
                      month1[
                        route.params.invoice[0].invoiceDate.substring(5, 7)
                      ]
                    }
                    , {route.params.invoice[0].invoiceDate.substring(0, 4)}
                  </Text>
                </View>
                <Text style={styles.billNo}>
                  #{route.params.invoice[0].invoiceNumber}
                </Text>
              </View>
              <Text style={styles.ruppesText}>
                Rs {route.params.invoice[0].total}/-
              </Text>
              {route.params.service === 'Free service' ? (
                <Text style={styles.statusText2}>Free Service</Text>
              ) : (
                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}>Not Paid</Text>
                </View>
              )}

              <View
                style={{
                  borderWidth: 0.7,
                  marginVertical: 20,
                  width: '90%',
                  alignSelf: 'center',
                  borderColor: 'grey',
                }}></View>
              <View style={styles.ProducttextContainer}>
                <Text style={styles.productText}>PRODUCT</Text>
                <View style={styles.unitContainer}>
                  <Text style={styles.productText}>UNIT</Text>
                  <Text style={styles.productText}>PRICE</Text>
                </View>
              </View>
              {route.params.invoice[0].items.length > 0
                ? route.params.invoice[0].items.map(e => {
                    return <InvoiceItem ele={e} key={e._id} />;
                  })
                : null}

              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalText}>TOTAL</Text>
                <Text style={styles.totalText}>
                  {route.params.invoice[0].total}/-
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 0.7,
                  marginVertical: 20,
                  width: '90%',
                  alignSelf: 'center',
                  borderColor: 'grey',
                }}></View>
            </ImageBackground>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20,
  },

  backicon: {
    height: 18,
    width: 18,
  },

  icon: {
    height: 23,
    width: 26,
  },

  backgroundImage: {
    height: 650,
    shadowColor: 'rgba(175,170,170,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.8,
    elevation: 5,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 30,
  },

  maintextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: '6%',
  },

  invoiceText: {
    height: 28,
    lineHeight: 28,
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#5B5B5B',
  },

  dateText: {
    height: 20,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#5B5B5B',
    marginBottom: 5,
    letterSpacing: 0,
    fontWeight: '500',
  },

  billNo: {
    height: 20,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#B8B8B8',
    marginBottom: 5,
    letterSpacing: 0,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },

  ruppesText: {
    height: 40,
    lineHeight: 40,
    fontSize: 30,
    fontFamily: 'Roboto',
    color: '#ED7F2C',
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: 50,
  },
  statusContainer: {
    borderRadius: 13,
    borderColor: 'red',
    alignSelf: 'center',
    borderWidth: 1,
    height: 28,
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  statusContainer2: {
    borderRadius: 13,
    borderColor: '#19B692',
    alignSelf: 'center',
    borderWidth: 1,
    height: 28,
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  statusText: {
    height: 28,
    lineHeight: 28,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'red',
    alignSelf: 'center',
  },
  statusText2: {
    height: 28,
    lineHeight: 28,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#1CB18F',
    alignSelf: 'center',
  },
  designtext: {
    height: 19,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#C0C0C0',
    marginBottom: 5,
    letterSpacing: 0,
    opacity: 0.44,
    marginHorizontal: '5%',
    marginTop: 15,
  },

  ProducttextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    alignItems: 'center',
  },

  productText: {
    height: 16,
    lineHeight: 19,
    fontSize: 12,
    fontFamily: 'Roboto',
    color: 'rgba(184,184,184,0.87)',
    letterSpacing: 0,
    fontWeight: '500',
  },

  unitContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },

  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    marginTop: 30,
  },

  totalText: {
    height: 16,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#5B5B5B',
    letterSpacing: 0,
    fontWeight: '500',
  },
});

export default Invoice;

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
