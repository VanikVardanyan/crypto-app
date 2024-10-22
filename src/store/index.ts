import { configureStore } from "@reduxjs/toolkit";
import candlestickReducer from "./slice/candlestickSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    candles: candlestickReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const Dispatch = () => useDispatch<AppDispatch>();

export default store;
