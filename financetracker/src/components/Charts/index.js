import React from 'react'
import { Line } from '@ant-design/charts';

const ChartComponent = () => {
    const data = [
        { year: 2018, value: 100 },
        { year: 2019, value: 200 },
        { year: 2020, value: 300 },
        { year: 2021, value: 400 },
        { year: 2022, value: 500 },
    ];
    const config = {
        data,
        width: 600,
        height: 300,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: "#aaa",
            },
        },
    };

    let chart;
  return (
    <div>
     <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
    </div>
  )
}

export default ChartComponent