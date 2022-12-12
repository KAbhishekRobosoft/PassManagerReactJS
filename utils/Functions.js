import { refreshToken } from '../services/UserCredentials';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function isTokenExpired(token) {
  var jwt_decode = require('jwt-decode')
  var decoded = jwt_decode(token);
  const time= new Date(decoded.exp)
  const time2= new Date(Date.now() / 1000)
  if (time.getTime() <= time2.getTime()) {
    return true;
  } else {
    return false;
  }
}

export async function getVerifiedKeys(key) {
 
  if (key) {
    if (isTokenExpired(key)) {
      let response = await refreshToken(key);
      await AsyncStorage.setItem('token',response.access_token)
      return response.access_token;
    } else {
      return key;
    }
  } else {
    return 'Enter access token';
  }
}

export const month = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export const month1 = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

