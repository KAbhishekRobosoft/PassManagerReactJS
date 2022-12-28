const BASE_URL = 'https://four-square-three.vercel.app/api';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

export const register = async values => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email: values.email.toLowerCase(),
      phoneNumber: values.mobileNumber,
      password: values.password,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred');
  }
};

export const checkIn = async values => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: values.email.toLowerCase(),
      password: values.password,
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const refreshToken = async token => {
  let res = await fetch(`${BASE_URL}/getAccessToken`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};

export const uploadImage = async (payload, token) => {
  try {
    let res = await fetch(`${BASE_URL}/addProfileImage`, {
      method: 'post',
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    return data;
  } catch (er) {
    Toast.show('Error');
  }
};

export const sendOtp = async email => {
  try {
    const response = await axios.post(`${BASE_URL}/sendOtp`, {
      email: email.toLowerCase(),
    });
    return response.data;
  } catch (error) {
    Toast.show('Error occurred');
  }
};

export const verifyOtp = async otp => {
  try {
    const response = await axios.post(`${BASE_URL}/verifyOtp`, {
      otp: otp,
    });
    return response.data.message;
  } catch (error) {
    Toast.show('Error Occurred');
  }
};

export const resetPassword = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/forgotPassword`, {
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred');
  }
};

export const getProfile = async token => {
  let res = await fetch(`${BASE_URL}/getProfile`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};

export const aboutUs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAboutUs`);
    return response.data[0];
  } catch (error) {
    Toast.show('Error Occurred');
  }
};

export const addFeedback = async (token, text) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/addFeedback`,
      {
        feedback: text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};
