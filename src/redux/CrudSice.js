import { createSlice } from "@reduxjs/toolkit";

//Creation of initial state for reducer
const addSiteReducer = createSlice({
  name: "site",
  initialState: {
    userData: [],
    userTemp: [],
    particularUser: [],
    particularUserTemp: [],
    count: 0,
    heightSize: 0,
  },

  //Reducer function
  reducers: {
    setCount: (state, action) => {
      state.count = state.count + 1;
    },

    setHeightSize: (state, action) => {
      state.heightSize = action.payload;
    },

    addData: (state, action) => {
      state.userData.push(action.payload);
      state.userTemp.push(action.payload);
      state.particularUser.push(action.payload);
      state.particularUserTemp.push(action.payload);
    },

    filterParticular: (state, action) => {
      state.particularUser = state.userTemp.filter(
        (ele) => ele.userId === action.payload
      );
      state.particularUserTemp = state.particularUser;
    },

    //Updation of state
    updateData: (state, action) => {
      state.userData = state.userData.map((ele) => {
        if (ele.id === action.payload.id) {
          return {
            ...ele,
            sector: action.payload.sector,
            notes: action.payload.notes,
            password: action.payload.password,
            siteName: action.payload.siteName,
            url: action.payload.url,
            userName: action.payload.userName,
          };
        }
        return ele;
      });

      state.particularUser = state.particularUserTemp.map((ele) => {
        if (ele.id === action.payload.id) {
          return {
            ...ele,
            sector: action.payload.sector,
            notes: action.payload.notes,
            password: action.payload.password,
            siteName: action.payload.siteName,
            url: action.payload.url,
            userName: action.payload.userName,
          };
        }
        return ele;
      });
      state.userTemp = state.userData;
      state.particularUserTemp = state.particularUser;
    },

    //Search FUnctionality
    filterData: (state, action) => {
      state.particularUser = state.particularUserTemp.filter((ele) =>
        ele.siteName.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    //Category Functionality
    filterCategory: (state, action) => {
      if (action.payload === "All")
        state.particularUser = state.particularUserTemp;
      else {
        state.particularUser = state.particularUserTemp.filter(
          (ele) => ele.sector === action.payload
        );
      }
    },
  },
});

export const {
  addData,
  updateData,
  deleteData,
  filterData,
  setIsLoading,
  filterCategory,
  addSingleData,
  setCount,
  setHeightSize,
  filterParticular,
} = addSiteReducer.actions;
export const reducer = addSiteReducer.reducer;
