import React, {useEffect, useRef} from 'react';
import {Chart} from "chart.js/auto"
import {useRouter} from "next/navigation";


export default function BarChart({data}) {
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
                    labels: data.labels,
                    datasets: [{
                        label: 'Number of Students',
                        data: data.values,
                        backgroundColor: data.colors,
                        borderColor: '#000',
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
                }
            });
        }
    }, [data]);


    return (
        <>
            <canvas className='cursor-pointer' ref={chartRef} width={100} height={100}/>
        </>
    )
}