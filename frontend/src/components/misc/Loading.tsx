'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { loadingAnim} from "../../../public/anim";


export default function Loading() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <div className="container bg-cover bg-center">
                    <DynamicLottie animationData={loadingAnim}/>
                </div>
            )}</>
    )
}

const DynamicLottie = dynamic(() => import('lottie-react'), {
    ssr: false
});