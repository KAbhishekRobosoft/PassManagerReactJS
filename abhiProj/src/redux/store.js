import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./AddDataSlice";
import { reducer1 } from "./AuthenticationSlice";

const store= configureStore({
    reducer:{
       addDetails:reducer,
       authSite:reducer1
    }
})

export default store