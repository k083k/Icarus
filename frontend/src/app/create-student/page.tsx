'use client'
import React, {useEffect, useState} from 'react';
import CreateStudentForm from "@/components/students/CreateStudentForm";
import Nav from "@/components/navs/Nav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptop} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import withRoleGuard from "@/hoc/withRoleGuard";
import Icarus from "@/app/layouts/icarus";


const CreateStudent = () => {

    const [titles, setTitles] = useState([]);
    const [suffixes, setSuffixes] = useState([]);
    const [genders, setGender] = useState([]);
    const [grades, setGrade] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/data',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const {title, suffix, gender, grade} = await response.json();
                setTitles(title);
                setSuffixes(suffix);
                setGender(gender)
                setGrade(grade)
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
                        <FontAwesomeIcon className='rounded-full dark:text-white text-gray-600 bg-neutral-800/25 p-2 border-2 h-16 w-16 my-3' icon={faLaptop}/>
                    </a>
                    <h1 className="text-xl mb-5 font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create New Student
                    </h1>
                    <CreateStudentForm titles={titles} suffixes={suffixes} genders={genders} grades={grades}/>
                </div>
            </section>
        </Icarus>
    )
}

export default withRoleGuard(['Admin'])(CreateStudent);