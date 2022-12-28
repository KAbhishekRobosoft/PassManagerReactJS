const BASE_URL = 'https://four-square-three.vercel.app/api';
import axios from 'axios';

export const getNearPlace = async values => {
  try {
    const response = await axios.post(`${BASE_URL}/getNearPlace`, {
      latitude: values.latitude,
      longitude: values.longitude,
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const getParameter = async (apiStat, values) => {
  try {
    const response = await axios.post(`${BASE_URL}/${apiStat}`, {
      latitude: values.latitude,
      longitude: values.longitude,
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const getParticularInfo = async id => {
  try {
    const response = await axios.post(`${BASE_URL}/getParticularPlace`, {
      _id: id,
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const addFavourites = async (id, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/addFavourite`,
      {
        _id: id,
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

export const searchAllFavourites = async (token, coord) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/searchFavourite`,
      {
        text: '',
        latitude: coord.latitude,
        longitude: coord.longitude,
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

export const searchParticularPlace = async (coord, text) => {
  try {
    const response = await axios.post(`${BASE_URL}/searchPlace`, {
      latitude: coord.latitude,
      longitude: coord.longitude,
      text: text,
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const getNearCity = async values => {
  try {
    const response = await axios.post(`${BASE_URL}/getNearCity`, {
      latitude: values.latitude,
      longitude: values.longitude,
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const getFavourites = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/getFavouriteId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const addRatings = async (token, placeId, rating) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/addRating`,
      {
        _id: placeId,
        rating: rating,
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

export const getReviews = async placeId => {
  try {
    const response = await axios.post(`${BASE_URL}/getReview`, {
      _id: placeId,
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const searchTextFavourites = async (token, coord, text) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/searchFavourite`,
      {
        text: text,
        latitude: coord.latitude,
        longitude: coord.longitude,
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

export const addReview = async (token, text, id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/addReview`,
      {
        _id: id,
        review: text,
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

export const addReviewImage = async (payload, token) => {
  try {
    let res = await fetch(`${BASE_URL}/addReviewImage`, {
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

export const filterSearch = async obj => {
  try {
    const response = await axios.post(`${BASE_URL}/filterSearch`, obj);
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};

export const filterFavourites = async (obj, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/favFilter`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (er) {
    console.log('Error');
  }
};
