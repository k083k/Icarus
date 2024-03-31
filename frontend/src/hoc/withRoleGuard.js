import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import dynamic from 'next/dynamic';
import {loader} from "../../public/anim/";


const DynamicLottie = dynamic(() => import('lottie-react'), {
    ssr: false
});

const withRoleGuard = (allowedRoles) => (WrappedComponent) => {


    const RequireRole = (props) => {
        const router = useRouter();
        const {auth, userRole, loading} = useAuth();

        useEffect(() => {
            if (!loading && (!auth || !allowedRoles.includes(userRole))) {
                console.log("UserRole in withRoleGuard: ", userRole)
                router.push('/not-authorized'); // Redirect to home or any other route
            }
        }, [loading, router, auth, userRole]);

        if (loading) {
            return (
                <div className='flex flex-col h-screen justify-center items-center'>
                    <DynamicLottie animationData={loader} className='w-32 h-32'/>
                </div>
            )
        }

        return !loading && auth && allowedRoles.includes(userRole) ? <WrappedComponent {...props} /> : null;
    };

    return RequireRole;
};

export default withRoleGuard;
