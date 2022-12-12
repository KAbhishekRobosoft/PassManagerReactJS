import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const PopUpMenu = ({color, options, size}) => {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const [modal1, setmodal1] = React.useState(false);
  const {height, width} = useWindowDimensions();
  const left = width > height ? (Platform.OS === 'ios' ? '85%' : '80%') : '71%';

  const resizeBox = to => {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Icon
          name="ellipsis-vertical"
          color={color}
          size={size}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Modal
        transparent
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}>
        <SafeAreaView style={{flex: 1}} onTouchStart={() => resizeBox(0)}>
          <Animated.View
            style={[
              styles.popupContainer,
              styles.header,
              styles.shadow,
              {left},
              {transform: [{scale}]},
            ]}>
            {options.map((option, index) => (
              <TouchableOpacity key={index} onPress={option.action}>
                <Text style={styles.title}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '6%',
  },
  header: {
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
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  popupContainer: {
    height: 124,
    width: 115,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: '#4E4E4E',
    fontSize: 14,
    fontFamily: 'Roboto',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },

  bottompopupContainer: {
    height: 90,
    width: 150,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default PopUpMenu;

export const BottomPopUpMenu = () => {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const options = [
    {
      title: 'AddBikeDetails',
      icon: 'motorbike',
      action: () => alert('Notifications'),
    },
    {
      title: 'Sign Out',
      icon: 'exit-to-app',
      action: () => alert('Sign Out'),
    },
  ];

  const {height, width} = useWindowDimensions();
  const left = width > height ? (Platform.OS === 'ios' ? '80%' : '75%') : '61%';
  const top = width > height ? (Platform.OS === 'ios' ? '65%' : '60%') : '81%';

  const resizeBox = to => {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Icon
          name="ellipsis-horizontal-sharp"
          color={'red'}
          size={30}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Modal
        transparent
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}>
        <SafeAreaView style={{flex: 1}} onTouchStart={() => resizeBox(0)}>
          <Animated.View
            style={[
              styles.bottompopupContainer,
              styles.header,
              styles.shadow,
              {left},
              {top},
              {transform: [{scale}]},
            ]}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.action}
                style={styles.option}>
                <Text style={styles.title}>{option.title}</Text>
                <Icon1 name={option.icon} color={'#4E4E4E'} size={20} />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};
