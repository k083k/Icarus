import React, {useEffect, useRef} from 'react';
import {Chart} from "chart.js/auto"
import {useRouter} from "next/navigation";


export default function PieChart({data}) {
    const router = useRouter();
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
                    labels: data.labels,
                    datasets: [{
                        data: data.values,
                        backgroundColor: data.colors,
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'left',
                            align: 'end',
                        }
                    },
                }
            });
        }
    }, [data]);


    return (
        <>
            <canvas className='cursor-pointer' ref={chartRef}/>
        </>
    )
}