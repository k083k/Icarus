import {useState, useEffect, SyntheticEvent} from 'react';
import Image from "next/image";
import { roles } from "@/app/data/roles";
import useAuth from "@/hooks/useAuth";
import {loader} from "../../../public/anim";
import dynamic from "next/dynamic";
import {CorporateManAvatar, AvatarWoman} from "../../../public/avatars";
import {logoutIcon} from "../../../public/icons";
import {logoutUser} from "@/services/apiService";
import {useRouter} from "next/navigation";

const DynamicLottie = dynamic(() => import('lottie-react'), {
    ssr: false
});
const Sidebar = () => {
    const router = useRouter();
    const { userGender, userName, userRole, loading } = useAuth(); // Get user role from useAuth hook
    const [isSlim, setIsSlim] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false); // State to track dark mode

    useEffect(() => {
        // Check if the system prefers dark mode
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        // Listen for changes in system color scheme
        const darkModeChangeListener = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
            setIsDarkMode(event.matches);
        };
        darkModeMediaQuery.addListener(darkModeChangeListener);

        return () => {
            // Cleanup: remove event listener
            darkModeMediaQuery.removeListener(darkModeChangeListener);
        };
    }, []); // Run effect only once on component mount

    const handleMouseEnter = () => {
        setIsSlim(false);
    };

    const handleMouseLeave = () => {
        setIsSlim(true);
    };

    if (loading) {
        return (
            <div className='flex flex-col h-screen justify-center items-center'>
                <DynamicLottie animationData={loader} className='w-32 h-32'/>
            </div>
        )
    }

    const logout = async (e: SyntheticEvent) => {
        e.preventDefault();

        await logoutUser();

        router.push('/login');
    }

    return (
        <div
            className={`flex flex-col justify-center fixed left-0 top-0 font-nunito z-[5] h-full dark:bg-black bg-white shadow-dark-mild transition-width duration-300 ${isSlim ? 'w-20' : 'w-60'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* User information section */}
            <div className="flex flex-col items-center justify-center mb-4 px-4">
                {isSlim ? (
                    <div className="mx-auto">
                        {/* Use appropriate avatar based on user's gender */}
                        {userGender === 'male' ? (
                            <Image src={CorporateManAvatar} alt="User Avatar" width={30} height={30}
                                   className="rounded-full"/>
                        ) : (
                            <Image src={AvatarWoman} alt="User Avatar" width={30} height={30} className="rounded-full"/>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div className="mx-auto mb-2">
                            {userGender === 'male' ? (
                                <Image src={CorporateManAvatar} alt="User Avatar" width={50} height={50}
                                       className="rounded-full"/>
                            ) : (
                                <Image src={AvatarWoman} alt="User Avatar" width={50} height={50}
                                       className="rounded-full"/>
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-black dark:text-white">{userName}</p>
                            <p className="text-xs text-gray-500">{userRole}</p>
                        </div>
                    </div>
                )}
            </div>

            <ul className="py-4 mt-12 mb-12">
                {roles[userRole].map((item, index) => (
                    <li key={index} className="mb-4">
                        {isSlim ? (
                            <a href={item.url}
                               className="flex items-center justify-center text-white hover:bg-gray-700 p-3 rounded-lg">
                                <Image src={isDarkMode ? item.darkIcon : item.lightIcon} alt={item.label} width={30}
                                       height={30}/>
                            </a>
                        ) : (
                            <a href={item.url}
                               className="flex items-center mb text-black dark:text-white hover:bg-neutral-800/25 dark:hover:bg-zinc-200/60 p-3 rounded cursor-pointer">
                                <Image src={isDarkMode ? item.darkIcon : item.lightIcon} alt={item.label} width={30}
                                       height={30}/> &nbsp;&nbsp;&nbsp;
                                {item.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>

            <div className='flex items-center mt-12 justify-center'>
                <a href="#" onClick={logout} className="flex text-black dark:text-white p-3 rounded">
                    <Image src={logoutIcon} alt={'Log Out'} width={70} height={70}/> &nbsp;&nbsp;&nbsp;
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
