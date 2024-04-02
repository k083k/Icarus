'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptop} from "@fortawesome/free-solid-svg-icons";
import RegisterForm from "@/components/auth/RegisterForm";
import {fetchGenders, fetchRoles} from "@/services/apiService";
import { Role, Gender } from "@/types"; // Importing the Role and Gender interfaces



export default function Register() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [genders, setGenders] = useState<Gender[]>([]);

    useEffect(() => {
        fetchRolesData();
        fetchGendersData();
    }, []);

    const fetchRolesData = async () => {
        try {
            const data = await fetchRoles(); // Call fetchRoles function from apiService
            setRoles(data); // Set fetched roles data to state
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchGendersData = async () => {
        try {
            const data = await fetchGenders(); // Call fetchGenders function from apiService
            setGenders(data); // Set fetched genders data to state
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