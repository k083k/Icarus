// BarChart.js
import React, {useEffect, useRef} from 'react';
import {Chart} from "chart.js/auto";

const BarChart = ({gradeCounts}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext('2d');
            chartRef.current.chart = new Chart(context, {
                type: 'bar',
                data: {
                    labels: Object.keys(gradeCounts),
                    datasets: [{
                        label: 'Number of Students',
                        data: Object.values(gradeCounts),
                        backgroundColor: ['#98d59a', '#aac9e0', '#7e2771', '#229cff'],
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                            position: 'top',
                            align: 'center',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [gradeCounts]);

    return (
        <canvas className='cursor-pointer' ref={chartRef} width={100} height={100}/>
    )
};

export default BarChart;
