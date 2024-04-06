'use client'
import React from 'react';
import LoginForm from "@/components/auth/LoginForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptop} from "@fortawesome/free-solid-svg-icons";


export default function Login() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 overflow-hidden font-nunito">
                <a href="/">
                    <FontAwesomeIcon className='rounded-full bg-neutral-800/25 dark:bg-gray-800 p-3 text-gray-900 dark:text-white border-1 h-16 w-16 my-3'
                                     icon={faLaptop}/>
                </a>
                <h1 className="text-xl mb-5 font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Log Into Your Account
                </h1>
                <LoginForm/>
            </div>
        </section>
    )
}