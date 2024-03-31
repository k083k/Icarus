'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotAuthorizedPage = () => {
    const router = useRouter();

    // Optional: You may want to redirect the user after a certain delay
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/'); // Redirect to login page after 3 seconds
        }, 5000);

        return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }, [router]);

    return (
        <div className='flex flex-row h-screen justify-center items-center font-extrabold text-3xl'>
            <div>
                <h1>403 Forbidden |&nbsp;</h1>
            </div>
            <div>
                <h1> Not Authorized</h1>
            </div>
        </div>
    );
};

export default NotAuthorizedPage;
