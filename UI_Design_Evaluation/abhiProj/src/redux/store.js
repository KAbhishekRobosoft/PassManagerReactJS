import { configureStore} from "@reduxjs/toolkit";
import { reducer } from "./AddDataSlice";
import { reducer1 } from "./AuthenticationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";


const persistConfig= {
    key:"root",
    version:1,
    storage:AsyncStorage
}

const AuthConfig= {
    key:"authSite",
    storage:AsyncStorage,
    whitelist:["mPin"]
}

const reducer2= combineReducers({
    addDetails:reducer,
    authSite:persistReducer(AuthConfig,reducer1)
})

const persistedReducer= persistReducer(persistConfig,reducer2)

const store= configureStore({
    reducer:persistedReducer,
    middleware: [thunk,logger]
})

export default store