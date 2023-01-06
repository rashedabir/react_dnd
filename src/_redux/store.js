import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = configureStore(
  {
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
  applyMiddleware(thunk)
);
