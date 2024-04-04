'use client'
import React, { useEffect, useRef } from 'react';
import { Chart } from "chart.js/auto";

const PieChart = ({ data, labels, colors }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext('2d');
            chartRef.current.chart = new Chart(context, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors,
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'top',
                            align: 'center',
                        }
                    },
                }
            });
        }
    }, [data, labels, colors]);

    return (
        <canvas className='cursor-pointer' ref={chartRef} width={50} height={50} />
    );
};

export default PieChart;
