import React, { useEffect, useState } from 'react';
import Image from "next/image";
import {CalendarIcon, ClockIcon} from "../../../public/icons";

const DateTimeDisplay = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    const formattedDate = currentDateTime.toLocaleString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    const formattedTime = currentDateTime.toLocaleTimeString();

    return (
        <div className='flex flex-row justify-around items-center'>
            <div className='flex flex-row justify-between items-center'>
                <Image src={ CalendarIcon } alt={'calendar Icon'} height={30} width={30}/>&nbsp;&nbsp;
                <h1>{formattedDate}</h1>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <Image src={ ClockIcon } alt={'clock Icon'} height={30} width={30}/>&nbsp;&nbsp;
                <h2>{formattedTime}</h2>
            </div>
        </div>
    );
};

export default DateTimeDisplay;
