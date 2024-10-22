import { RequestStatus } from "../../types";

export interface ICandle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export enum TimeIntervals {
  OneMinute = "1m",
  FifteenMinutes = "15m",
  OneHour = "1h",
  FourHours = "4h",
  OneDay = "1d",
}

export interface ICandlestickState {
  candles: ICandle[];
  status: RequestStatus;
  error?: string | null;
  interval: TimeIntervals;
}

export type CandleResponseType = [number, string, string, string, string];

export enum CandlestickSlices {
  name = "candles",
  fetchCandles = "candles/fetchCandles",
}
