import { createSlice } from "@reduxjs/toolkit";

//Creation of initial state for reducer
const addSiteReducer = createSlice({
  name: "site",
  initialState: {
    userData: [],
    userTemp: [],
    count: 0,
    heightSize: 0,
  },

  //Reducer function
  reducers: {
    setCount: (state, action) => {
      state.count = state.count + 1
    },

    setHeightSize: (state, action) => {
      state.heightSize = action.payload;
    },

    addData: (state, action) => {
      state.userData.push(action.payload);
      state.userTemp.push(action.payload);
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
      state.userTemp = state.userData;
    },
    //Deletion of a object in state
    // deleteData: (state, action) => {
    //   state.userData = state.userData.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   state.userTemp = state.userData;
    // },

    //Search FUnctionality
    filterData: (state, action) => {
      state.userData = state.userTemp.filter((ele) =>
        ele.siteName.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    //Category Functionality
    filterCategory: (state, action) => {
      if (action.payload === "All") state.userData = state.userTemp;
      else {
        console.log(action.payload);
        state.userData = state.userTemp.filter(
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
  setHeightSize
} = addSiteReducer.actions;
export const reducer = addSiteReducer.reducer;
