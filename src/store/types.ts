import { ICandlestickState } from "./slice/candlestickSlice/types";

export enum RequestStatus {
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
  IDLE = "idle",
}

export interface IApplicationState {
  candles: ICandlestickState;
}
