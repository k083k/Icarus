'use client'
import React, {useEffect, useState} from 'react';
import withRoleGuard from "@/hoc/withRoleGuard";
import Icarus from "@/app/layouts/icarus";
import TeachersTable from "@/components/teachers/TeachersTable";

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/teachers', {
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Failed to fetch students data');
                }
            })
            .then(data => {
                setTeachers(data); // Set fetched student data
            })
            .catch(error => {
                console.error('Error fetching students data:', error);
            });
    }, []);

    return (
        <Icarus>
            <h1 className='mb-5 font-serif font-bold p-6 text-4xl text-black dark:text-white'>Teachers</h1>
            <TeachersTable teachers={teachers}/>
        </Icarus>
    )
}

export default withRoleGuard(['Admin'])(Teachers);