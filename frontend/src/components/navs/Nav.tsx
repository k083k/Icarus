import React, {useState} from 'react';
import {faBars, faSchool, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/navigation";
import dynamic from "next/dynamic";
import useAuth from "@/hooks/useAuth";

export default function Nav() {
    const {auth, userRole} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const AvatarDropdown = dynamic(() => import("./AvatarDopdown"), {
        ssr: false,
    });


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="sticky top-0 z-10">
            <nav
                className="flex-no-wrap z-[4] flex w-full items-center justify-between bg-white dark:bg-black py-2 shadow-dark-strong lg:flex-wrap lg:justify-start lg:py-4">
                <div className="container mx-auto flex w-full flex-wrap items-center justify-between px-3">
                    <div className="flex items-center">
                        <a href="/" className='mr-3 text-black dark:text-white'>
                            <FontAwesomeIcon href={"/"} icon={faSchool} style={{height: '30px'}}/>
                        </a>
                    </div>
                    <div className="hidden lg:flex md:items-center">

                        <ul className="list-style-none mx-auto flex flex-col ps-0 lg:flex-row">
                            <li className="mb-4 lg:mb-0 lg:pe-2">
                                <a className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                   href='/'>Home</a>
                            </li>

                            <li className="mb-4 lg:mb-0 lg:pe-2">
                                <a className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                   href="#">About</a>
                            </li>

                            <li className="mb-4 lg:mb-0 lg:pe-2">
                                <a className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                   href="#">Services</a>
                            </li>

                            <li className="mb-4 lg:mb-0 lg:pe-2">
                                <a className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                   href="#">Contact Support</a>
                            </li>

                        </ul>
                    </div>

                    <div className="lg:hidden">
                        <button className="text-white focus:outline-none" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars}/>
                        </button>
                    </div>
                    <AvatarDropdown auth={auth}/>
                </div>

                {menuOpen && (
                    <div className="container mx-auto mt-2 md:hidden">
                        <ul className="flex flex-col space-y-2">
                            {auth && (
                                <li><a href={`/${userRole === 'Teacher' ? 'teacher-dashboard' : 'admin-dashboard'}`}
                                       className="text-white">Dashboard</a></li>
                            )}
                            {!auth && (
                                <li><a href="/frontend/public" className="text-white">Home</a></li>
                            )}
                            {!auth && (
                                <li><a href="/frontend/public" className="text-white">Classes</a></li>
                            )}
                            {auth && userRole === 'Admin' && (
                                <li><a href="/create-student" className="text-white">Create Student</a></li>
                            )}
                            <li><a href="/frontend/public" className="text-white">TimeTable</a></li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
