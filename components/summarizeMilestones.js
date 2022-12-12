import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid'

export const TripSummaryList = ({data}) => {
  
  return (
    <View key={uuid.v4()}>
      {data !== 0
        ? data.map(item => {
          
            return (
              <View
                style={styles.mainView}
                key={uuid.v4()}>
                <View style={styles.dotView}>
                  <View>
                    <Image source={require('../assets/images/Oval.png')} />
                  </View>
                </View>
                <View style={styles.milestoneView}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.45}}
                    colors={['#fbe5d4', 'rgba(255,255,255,0)']}
                    style={styles.gradient}>
                    <Text style={styles.numbers}>
                      Milestone {item.milestone}
                    </Text>
                    <View style={styles.lineView1}></View>
                    <View style={styles.fromToView}>
                      <TextInput style={styles.textUdupi}>{item.source[0].place}</TextInput>
                      <View
                        style={{flexDirection: 'column', paddingHorizontal: 6}}>
                        <Text style={styles.descriptionOverLine}>
                          {item.distance}{' '}km{' '}{item.duration}hr
                        </Text>
                        <View style={styles.lineView2}></View>
                      </View>
                      <TextInput style={styles.textUdupi}>{item.destination[0].place}</TextInput>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            );
          })
        : null}
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dotView: {
    width: '15%',
    alignItems: 'center',
    height: 30,
    marginTop: -15,
  },
  gradient: {
    borderRadius: 13,
    alignItems: 'center',
    height: 113,
    width: '100%',
    padding: 20,
  },
  milestoneView: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    height: 123,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 13,
    elevation: 2,
    justifyContent: 'space-around',
  },
  numbers: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: '#ED7E2B',
  },
  lineView1: {
    borderWidth: 0.5,
    height: 1,
    width: '113%',
    borderColor: 'rgba(151,151,151,0.4)',
    marginTop: 10,
  },
  lineView2: {
    borderWidth: 0.1,
    height: 1,
    width: '100%',
    borderColor: 'rgba(151,151,151,0.4)',
    backgroundColor: 'rgba(151,151,151,0.4)',
  },
  fromToView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  textUdupi: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 21,
    color: 'rgba(58,57,57,0.87)',
  },
  descriptionOverLine: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: 'rgba(118,116,116,0.45)',
    paddingHorizontal: 3,
  },
});
