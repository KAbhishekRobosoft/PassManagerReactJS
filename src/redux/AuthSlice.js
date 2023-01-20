import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mPin: null,
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
      return {
        ...state,
        mPin: action.payload.Mpin,
      };
    },

    filterUser: (state, action) => {
      state.userData = state.userTemp.filter((ele) =>
        ele.siteName.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    logout: (state) => {
      return {
        ...state,
        mPin: null,
      };
    },

    register: (state, action) => {
      if (state.userData.length > 0) {
        if (
          state.userData.filter((ele) => ele.Number === action.payload.Number)
            .length > 0
        ) {
          return false;
        } else {
          state.userData.push(action.payload);
          state.userTemp.push(action.payload);
          return true;
        }
      } else {
        state.userData.push(action.payload);
        state.userTemp.push(action.payload);
        return true;
      }
    },
  },
});

export const { retrieveToken, login, logout, register, filterUser } =
  authenticateSite.actions;
export const reducer1 = authenticateSite.reducer;
