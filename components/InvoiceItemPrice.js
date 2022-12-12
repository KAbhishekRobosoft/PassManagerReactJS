import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const InvoiceItem = ({ele}) => {
  return (
    <View style={styles.ProducttextContainer}>
      <Text style={styles.productText}>{ele.itemName}</Text>
      <View style={styles.unitContainer}>
        <Text style={styles.productText}>{ele.itemQuantity}</Text>
        <Text style={styles.productText}>{ele.itemPrice}/-</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProducttextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    alignItems: 'center',
    marginTop: '3%',
  },

  productText: {
    height: 20,
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#5B5B5B',
    letterSpacing: 0,
    fontWeight: '500',
  },

  unitContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
});

export default InvoiceItem;
