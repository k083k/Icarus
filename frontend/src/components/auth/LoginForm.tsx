'use client'
import React, {SyntheticEvent, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/v1/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        if (response.ok) {
            // Fetch userRole from cookies
            const userRoleCookie = document.cookie
                .split(';')
                .find(cookie => cookie.trim().startsWith('userRole='));

            if (userRoleCookie) {
                const userRole = userRoleCookie.split('=')[1];

                // Redirect based on userRole
                switch (userRole) {
                    case 'Admin':
                        router.push('/admin-dashboard');
                        break;
                    case 'Teacher':
                        router.push('/teacher-dashboard');
                        break;
                    default:
                        router.push('/');
                }
            } else {
                // If userRole is not found in cookies, redirect to the default page
                router.push('/');
            }
        }
    }

    return (
        <div
            className="w-full bg-neutral-800/25 rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            email</label>
                        <input type="email" name="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>
                    <div className="relative">
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Password</label>
                        <div className="relative">
                            <input type={passwordVisible ? "text" : "password"} name="password" id="password"
                                   placeholder="•••••••••••••••"
                                   className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                   onChange={(e) => {
                                       setPassword(e.target.value);
                                   }}
                                   required/>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye}
                                             className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                             onClick={togglePasswordVisibility}/>
                        </div>
                    </div>
                    <button type="submit"
                            className="w-full text-white bg-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Sign In
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Forgot you password?&nbsp;
                        <a href="/register-teacher" className="font-medium text-gray-700 hover:underline dark:text-blue-500">Register
                            here</a>
                    </p>
                </form>
            </div>
        </div>

    );
}
