import {createSlice} from '@reduxjs/toolkit';

const initialState =[]

const addSiteReducer = createSlice({
  name: 'site',
  initialState,
  reducers: {
    addData:(state, action) => {
      state.push(action.payload)
    },

    updateData:(state,action)=>{
      return state.map(ele=>{
          if(ele.id === action.payload.id){
              return{
                  ...ele,
                  dropdown:action.payload.dropdown,
                  notes:action.payload.notes,
                  password:action.payload.password,
                  siteName:action.payload.siteName,
                  url:action.payload.url,
                  userName:action.payload.userName 
              }    
          }
          return ele
      })
  },

    deleteData:(state,action)=>{
      return state.filter(item => item.id !== action.payload)
    }
  }})

export const {addData, updateData,deleteData} = addSiteReducer.actions;
export const reducer = addSiteReducer.reducer;
