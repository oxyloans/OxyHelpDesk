// src/components/Chart.tsx
import React from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


const Chart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      id: 'bar-chart',
    },
    xaxis: {
      categories: ['Active', 'Monthly', 'Quarterly', ' Halfyearly', 'Yearly', 'Fiveyears', 'Tenyears' ,'LifeTime'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',  
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Deals Data',
      align: 'left',
    },
    colors: ['#FF4560'],
  };

  const series = [
    {
      name: 'Deals data',
      data: [30, 40, 45, 50, 49, 60, 70 , 40]
    },
  ];

  return (
    <div className="App">
      <ApexCharts options={options} series={series} type="bar" height={220} />
    </div>
  );
};

export default Chart;
