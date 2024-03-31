'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptop} from "@fortawesome/free-solid-svg-icons";
import CreateTeacherForm from "@/components/teachers/CreateTeacherForm";
import {useRouter} from "next/navigation";
import withRoleGuard from "@/hoc/withRoleGuard";
import Icarus from "@/app/layouts/icarus";


const CreateTeacher = () => {
    const router = useRouter();
    const [genders, setGender] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const {gender} = await response.json();
                setGender(gender)
            } else {
                console.error('Failed to data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Icarus>
            <section>
                <div className="flex flex-col items-center justify-center mx-auto lg:py-0 overflow-hidden">
                    <a href="/">
                        <FontAwesomeIcon
                            className='rounded-full bg-neutral-800/25 dark:bg-gray-800 p-3 text-gray-900 dark:text-white border-1 h-16 w-16 my-3'
                            icon={faLaptop}/>
                    </a>
                    <h1 className="text-xl mb-5 font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create New Teacher
                    </h1>
                    <CreateTeacherForm genders={genders}/>
                </div>
            </section>
        </Icarus>
    )
}

export default withRoleGuard(['Admin'])(CreateTeacher);