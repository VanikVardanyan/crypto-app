import axios from "axios";
import { TimeIntervals } from "./types";

export const binanceApi = {
  getCandlestickData: (interval: TimeIntervals) =>
    axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=1000`),
};
