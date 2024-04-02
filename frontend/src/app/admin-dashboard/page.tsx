'use client'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import withRoleGuard from "@/hoc/withRoleGuard";
import Card from "@/components/misc/Card";
import Icarus from "@/app/layouts/icarus";
import {fetchAdmins, fetchStudents, fetchTeachers} from "@/services/apiService";


const AdminDashboard = () => {
    const router = useRouter();
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);

    useEffect(() => {
        // Fetch total number of students
        fetchStudents().then(students => {
            setTotalStudents(students.length);
        }).catch(error => {
            console.error('Error fetching students:', error);
        });

        // Fetch total number of teachers
        fetchTeachers().then(teachers => {
            setTotalTeachers(teachers.length);
        }).catch(error => {
            console.error('Error fetching teachers:', error);
        });

        fetchAdmins().then(admins => {
            setTotalAdmins(admins.length);
        }).catch(error => {
            console.error('Error fetching admins:', error);
        });
    }, []);

    return (
        <Icarus>
            <div className='w-full h-1/3 flex justify-center gap-2 mb-2'>
                <Card className='bg-amber-500 dark:bg-emerald-600 w-1/3'>
                    <div className='flex flex-col h-full font-bold py-6'>
                        <h1 className='text-center border text-xl uppercase mb-6'>Students</h1>
                        <p className='text-center border text-5xl'>{totalStudents}</p>
                    </div>
                </Card>
                <Card className='bg-green-700 dark:bg-green-800 w-1/3'>
                    <div className='flex flex-col h-full font-bold py-6'>
                        <h1 className='text-center border text-xl uppercase mb-6'>Teachers</h1>
                        <p className='text-center border text-5xl'>{totalTeachers}</p>
                    </div>
                </Card>
                <Card className='bg-rose-700 dark:bg-rose-800 w-1/3'>
                    <div className='flex flex-col h-full font-bold py-6'>
                        <h1 className='text-center border text-xl uppercase mb-6'>Admins</h1>
                        <p className='text-center border text-5xl'>{totalAdmins}</p>
                    </div>
                </Card>
            </div>
        </Icarus>
    )
}


export default withRoleGuard(['Admin'])(AdminDashboard);