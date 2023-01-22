import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mPin: null,
  userId: null,
  userData: [],
  userTemp: [],
};

const authenticateSite = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveToken: (state, action) => {
      return {
        ...state,
        mPin: action.payload,
      };
    },

    login: (state, action) => {
      state.mPin = action.payload.mPin;
      state.userId = action.payload.id;
    },

    logout: (state) => {
      state.mPin = null;
      state.userId = null;
    },

    register: (state, action) => {
      state.userData.push(action.payload);
      state.userTemp.push(action.payload);
    },
  },
});

export const { retrieveToken, login, logout, register } =
  authenticateSite.actions;
export const reducer1 = authenticateSite.reducer;
