import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { fetchCandles } from "@/store/slice/candlestickSlice";
import { Dispatch } from "@/store";
import { getCandlestickSelector } from "@/store/selectors";
import { TimeIntervals } from "@/store/slice/candlestickSlice/types";
import { RequestStatus } from "@/store/types";
import { Select, Skeleton } from "antd";
import { buildChartData, optionsChart } from "./ui/chartDataBuilder";
import "./styles.css";

Chart.register(...registerables);
const { Option } = Select;

const CandlestickChart: React.FC = () => {
  const dispatch = Dispatch();
  const { candles, status, interval } = useSelector(getCandlestickSelector);

  useEffect(() => {
    dispatch(fetchCandles(interval));
  }, []);

  const handleIntervalChange = (value: TimeIntervals) => {
    dispatch(fetchCandles(value));
  };

  const chartData = buildChartData(candles);

  return (
    <div>
      <Select defaultValue={TimeIntervals.OneHour} className="select" onChange={handleIntervalChange}>
        <Option value={TimeIntervals.OneMinute}>1 Minute</Option>
        <Option value={TimeIntervals.FifteenMinutes}>15 Minutes</Option>
        <Option value={TimeIntervals.OneHour}>1 Hour</Option>
        <Option value={TimeIntervals.FourHours}>4 Hours</Option>
        <Option value={TimeIntervals.OneDay}>1 Day</Option>
      </Select>

      {status === RequestStatus.LOADING ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <div className="lineWrapper">
          <Line data={chartData} options={optionsChart} width={700} />
        </div>
      )}
    </div>
  );
};

export default CandlestickChart;
