'use client'
import React, { useEffect, useState } from 'react';
import withRoleGuard from '@/hoc/withRoleGuard';
import Icarus from '@/app/layouts/icarus';
import StudentsTable from '@/components/students/StudentsTable';
import { fetchStudents } from '@/services/apiService';

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudentsData() {
            try {
                const data = await fetchStudents();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students data:', error);
            }
        }
        fetchStudentsData();
    }, []);

    return (
        <Icarus>
            <h1 className='mb-2 font-bold p-6 font-serif text-4xl text-black dark:text-white'>Students</h1>
            <StudentsTable students={students} />
        </Icarus>
    );
};

export default withRoleGuard(['Admin'])(Students);
