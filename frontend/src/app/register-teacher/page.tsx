'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptop} from "@fortawesome/free-solid-svg-icons";
import RegisterForm from "@/components/auth/RegisterForm";
import { Role } from"./RegisterFormProps"


export default function Register() {
    const [roles, setRoles] = useState<[]>([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        // Fetch roles data when component mounts
        fetchRoles();
        fetchGenders();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/roles');
            if (!response.ok) {
                throw new Error('Failed to fetch roles');
            }
            const data = await response.json();
            if (!data.roles) {
                throw new Error('Roles data not found in response');
            }
            setRoles(data.roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchGenders = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/data');
            if (!response.ok) {
                throw new Error('Failed to genders');
            }
            const data = await response.json();
            if (!data.gender) {
                throw new Error('genders data not found in response');
            }
            setGenders(data.gender);
        } catch (error) {
            console.error('Error fetching genders:', error);
        }
    };


    return (
        <section>
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 overflow-hidden">
                <a href="/">
                    <FontAwesomeIcon className='rounded-full text-white bg-neutral-800/25 dark:bg-gray-800 p-3 border-1 h-16 w-16 my-3' icon={faLaptop}/>
                </a>
                <h1 className="text-xl mb-5 font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create An Account
                </h1>
                <RegisterForm roles={roles} genders={genders}/>
            </div>
        </section>
    )
}