import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICandle, CandleResponseType, CandlestickSlices, ICandlestickState, TimeIntervals } from "./types";
import { RequestStatus } from "../../types";
import { binanceApi } from "./api";

const initialState: ICandlestickState = {
  candles: [],
  status: RequestStatus.IDLE,
  error: null,
  interval: TimeIntervals.OneHour,
};

export const fetchCandles = createAsyncThunk<ICandle[], TimeIntervals>(
  CandlestickSlices.fetchCandles,
  async (interval: TimeIntervals) => {
    const response = await binanceApi.getCandlestickData(interval);

    return response.data.map((candle: CandleResponseType) => ({
      timestamp: candle[0],
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
    }));
  }
);

const candlestickSlice = createSlice({
  name: CandlestickSlices.name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandles.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchCandles.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.candles = action.payload;
      })
      .addCase(fetchCandles.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export default candlestickSlice.reducer;
