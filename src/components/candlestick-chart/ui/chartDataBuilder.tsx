import { ICandle } from "@/store/slice/candlestickSlice/types";

export const buildChartData = (candles: ICandle[]) => {
  return {
    labels: candles.map((candle: ICandle) => new Date(candle.timestamp).toLocaleString()),
    datasets: [
      {
        label: "Close Price",
        data: candles.map((candle: ICandle) => candle.close),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };
};

export const optionsChart = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 5,
      },
    },
  },
};
