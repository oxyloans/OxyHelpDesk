
import React from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
  type?: 'line' | 'bar' | 'area' | 'pie'; // Extend this as needed
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ options, series, type = 'bar', height = 220 }) => {
  return (
    <div className="chart-container">
      <ApexCharts options={options} series={series} type={type} height={height} />
    </div>
  );
};

export default Chart;
