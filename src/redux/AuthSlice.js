import {createSlice} from '@reduxjs/toolkit';

const authenticateSlice = createSlice({
  name: 'auth',
  initialState: {
    setCoord: {},
    isLoading: null,
    stateLoader: null,
    userToken: null,
    places: [],
    favourites: [],
    reset: false,
    initialState: false,
    initialState1: false,
    initialState2: false,
  },

  reducers: {
    logOut: state => {
      state.userToken = null;
      state.initialState = !state.initialState;
    },

    setToken: (state, action) => {
      state.userToken = action.payload;
    },

    setLoading: state => {
      state.isLoading = true;
    },

    setCoordinate: (state, action) => {
      state.setCoord = action.payload;
    },

    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },

    desetLoading: state => {
      state.isLoading = false;
    },

    setReset: state => {
      state.reset = true;
    },

    deSetReset: state => {
      state.reset = false;
    },

    setUserCredentials: (state, action) => {
      state.userCredentials = action.payload;
    },

    setLoader: state => {
      state.stateLoader = true;
    },

    setInitialState: (state, action) => {
      state.initialState = !action.payload;
    },

    setInitialState1: (state, action) => {
      state.initialState1 = !action.payload;
    },

    setInitialState2: (state, action) => {
      state.initialState2 = !action.payload;
    },

    desetLoader: state => {
      state.stateLoader = false;
    },
  },
});

export const {
  login,
  logOut,
  setToken,
  setImage,
  setCoordinate,
  setLoading,
  setPlaces,
  desetLoading,
  setLoader,
  desetLoader,
  setInitialState,
  setFavourites,
  setReset,
  deSetReset,
  setInitialState1,
  setInitialState2
} = authenticateSlice.actions;
export default authenticateSlice.reducer;
