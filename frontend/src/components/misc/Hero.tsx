'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {HomeHeroAnim} from "../../../public/anim";


export default function Hero() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <div className="container mx-auto flex flex-col justify-center items-center">
                    <DynamicLottie animationData={HomeHeroAnim}/>
                </div>
            )}</>
    )
}

const DynamicLottie = dynamic(() => import('lottie-react'), {
    ssr: false
});