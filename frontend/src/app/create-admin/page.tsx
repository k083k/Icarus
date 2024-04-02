'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLaptop} from "@fortawesome/free-solid-svg-icons";
import CreateAdminForm from "@/components/admins/CreateAdminForm";
import {useRouter} from "next/navigation";
import withRoleGuard from "@/hoc/withRoleGuard";
import Icarus from "@/app/layouts/icarus";
import {fetchGenders} from "@/services/apiService";


const CreateTeacher = () => {
    const router = useRouter();
    const [genders, setGender] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const genderData = await fetchGenders();
            setGender(genderData);
        } catch (error) {
            console.error('Error fetching gender data:', error);
        }
    };

    return (
        <Icarus>
            <section>
                <div className="flex flex-col items-center justify-center mx-auto lg:py-0 overflow-hidden">
                    <a href="/">
                        <FontAwesomeIcon
                            className='rounded-full dark:text-white text-gray-600 bg-neutral-800/25 p-2 border-2 h-16 w-16 my-3'
                            icon={faLaptop}/>
                    </a>
                    <h1 className="text-xl mb-5 font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create New Admin
                    </h1>
                    <CreateAdminForm genders={genders}/>
                </div>
            </section>
        </Icarus>
    )
}

export default withRoleGuard(['Admin'])(CreateTeacher);