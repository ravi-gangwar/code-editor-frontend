"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "@/slices/user";
import editorReducer from "@/slices/editor";
import { api } from "@/slices/rtk-query/apis";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["editor"],
};

const rootReducer = combineReducers({
  user: userReducer,
  editor: editorReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
