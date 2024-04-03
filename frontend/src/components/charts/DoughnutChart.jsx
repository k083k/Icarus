import React, {useEffect, useRef} from 'react';
import {Chart} from "chart.js/auto"
import {useRouter} from "next/navigation";


export default function DoughnutChart({data}) {
    const router = useRouter();
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext('2d');
            chartRef.current.chart = new Chart(context, {
                type: 'doughnut',
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
                    onClick: handleClick
                }
            });
        }
    }, [data]);


    const handleClick = (event, elements) => {
        if (elements.length) {
            const clickedElementIndex = elements[0].index;
            switch (clickedElementIndex) {
                case 0:
                    router.push('/students');
                    break;
                case 1:
                    router.push('/teachers');
                    break;
                case 2:
                    router.push('/admins');
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <canvas className='cursor-pointer' ref={chartRef}/>
        </>
    )
}