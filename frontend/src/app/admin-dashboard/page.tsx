'use client'
import React, {useEffect, useState} from "react";
import withRoleGuard from "@/hoc/withRoleGuard";
import Card from "@/components/misc/Card";
import Icarus from "@/app/layouts/icarus";
import {fetchAdmins, fetchStudents, fetchTeachers} from "@/services/apiService";
import DoughnutChart from "@/components/charts/DoughnutChart";
import useAuth from "@/hooks/useAuth";
import {adminIcon, UsersIcon} from "../../../public/icons/";
import Image from "next/image";
import TimeDate from '@/components/misc/TimeDate';


const AdminDashboard = () => {
    const {firstName} = useAuth();
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);

    useEffect(() => {
        fetchStudents().then(students => {
            setTotalStudents(students.length);
        }).catch(error => {
            console.error('Error fetching students:', error);
        });

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

    const chartData = {
        labels: ['Students', 'Teachers', 'Admins'],
        values: [totalStudents, totalTeachers, totalAdmins],
        colors: ['#233044', '#3d6f36', '#3b0a0a']
    };

    // @ts-ignore
    return (
        <Icarus>
            <div className='w-full h-1/4 flex flex-row gap-2 gap-y-1 mb-2'>
                <div className='flex flex-col h-full w-1/2 gap-y-1'>
                    <Card
                        className='flex flex-col h-full bg-red-300 dark:bg-red-400 opacity-80'>
                        <div className='flex flex-row justify-start items-center'>
                            <Image src={adminIcon} alt={'users icon'} height={50} width={50}/>&nbsp;&nbsp;&nbsp;
                            <h1 className='text-4xl'>Welcome </h1>
                        </div>
                        <div className='flex flex-row justify-center items-center'>
                            <h1 className='font-nunito text-5xl'> {firstName} </h1>
                        </div>
                    </Card>
                </div>
                <div className='flex flex-col h-full w-1/2 gap-y-1'>
                    <Card className='bg-rose-700 dark:bg-pink-800 opacity-80 w-full h-1/4'>
                        <div className='flex flex-col justify-center font-nunito h-full py-6'>
                            <h1 className='text-center text-md mb-6'>
                                <TimeDate/>
                            </h1>
                        </div>
                    </Card>
                    <div className='flex flex-row h-3/4 gap-2'>
                        <Card className='bg-rose-700 dark:bg-pink-800 opacity-80 w-1/2'>
                            <Image src={UsersIcon} alt={'users icon'} height={50} width={50}/>
                            <div className='flex flex-col justify-start h-full font-nunito py-6'>
                                <h1 className='text-center text-xl mb-6'>Total
                                    Users: {totalStudents + totalTeachers + totalAdmins}</h1>
                            </div>
                        </Card>
                        <Card className='bg-rose-700 dark:bg-pink-800 opacity-80 w-1/2'>
                            <div className='flex flex-col justify-center h-full py-6'>
                                <h1 className='text-center text-xl mb-6'>Something else here</h1>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className='w-full h-2/4 gap-y-1 mb-2'>
                <Card
                    className='flex flex-row justify-around bg-cyan-200 dark:bg-cyan-600 opacity-50 w-full h-full'>
                    <div className='flex justify-center items-center font-bold py-6 w-1/2'>
                        <h1> Some Info Here </h1>
                    </div>
                    <div className='flex flex-col justify-center items-center font-bold py-6 w-1/2'>
                        <h1>Personnel Chart</h1>
                        <DoughnutChart data={chartData}/>
                    </div>
                </Card>
            </div>
        </Icarus>
    )
}


export default withRoleGuard(['Admin'])(AdminDashboard);