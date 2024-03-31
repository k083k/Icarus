import Image from "next/image";
import {AvatarWoman, CorporateManAvatar} from "../../../public/avatars";
import React, {SyntheticEvent, useEffect} from "react";
import {useRouter} from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface AvatarProps {
    auth: boolean;
}

export default function AvatarDropdown({auth}: AvatarProps){
    const router = useRouter();
    const {userGender} = useAuth();

    useEffect(() => {
        const init = async () => {
            const {Dropdown, initTWE} = await import("tw-elements");
            initTWE({Dropdown});
        }
        init();
    }, []);

    const handleLogin = () => {
        router.push('/login');
    }

    const logout = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/v1/logout', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        router.push('/login');
    }

    return (

        <div className="relative flex items-center">
            {auth ? (
                <div className="relative" data-twe-dropdown-ref data-twe-dropdown-alignment="end">
                    <a className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                       id="avatarDropdown" role="button" data-twe-dropdown-toggle-ref
                       aria-expanded="false">
                        <Image src={userGender === 'female' ? AvatarWoman : CorporateManAvatar} className="rounded-full"
                               alt=""
                               loading="lazy" style={{height: '30px', width: '30px'}}/>
                    </a>
                    <ul className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-black bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-white"
                        aria-labelledby="avatarDropdown" data-twe-dropdown-menu-ref>
                        <li>
                            <a className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-black hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-black dark:text-white dark:hover:bg-neutral-800/25 dark:hover:text-black dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                               href="#" data-twe-dropdown-item-ref>My Account</a>
                        </li>
                        <li>
                            <a className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-black hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-black dark:text-white dark:hover:bg-neutral-800/25 dark:hover:text-black dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                               href="#" data-twe-dropdown-item-ref>Settings</a>
                        </li>
                        <li>
                            <a className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-black hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-black dark:text-white dark:hover:bg-neutral-800/25 dark:hover:text-black dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                               data-twe-dropdown-item-ref data-twe-toggle="tooltip"
                               title="Something else here" onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className='relative'>
                    <a onClick={handleLogin}
                       className='rounded-md py-2 px-4 text-white cursor-pointer bg-gradient-to-b from-gray-500 to-gray-600 w-32 text-center hover:from-gray-700 hover:to-gray-800'>
                        Sign In
                    </a>
                </div>
            )}
        </div>
    )
}
