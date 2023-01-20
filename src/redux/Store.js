import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./CrudSice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { reducer1 } from "./AuthSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: ["posts"],
};

const authConfig = {
  key: "auth",
  version: 1,
  storage: storage,
  blacklist: ["isLoading"],
};

const reducer2 = combineReducers({
  addDetails: reducer,
  authSite:persistReducer(authConfig,reducer1),
});

const persistedReducer = persistReducer(persistConfig, reducer2);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
