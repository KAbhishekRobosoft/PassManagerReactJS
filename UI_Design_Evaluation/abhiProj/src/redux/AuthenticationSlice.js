import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    isLoading:true,
    mPin:null
}

const authenticateSite = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    retrieveToken: (state, action) => {
      return{
        ...state,
        mPin:action.payload,
        isLoading:false
      }
    },

    login:(state,action)=>{
        return{
            ...state,
            mPin:action.payload,
            isLoading:false
        }
    },

    logout:(state)=>{
        return{
            ...state,
            mPin:null,
            isLoading:false
        }
    },

  }})

export const {retrieveToken,login,logout} = authenticateSite.actions;
export const reducer1 = authenticateSite.reducer;
