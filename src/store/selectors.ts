import { IApplicationState } from "./types";

export const getCandlestickSelector = (state: IApplicationState) => state.candles;
