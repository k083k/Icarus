'use client'
import React, {useEffect, useState} from 'react';
import Icarus from "@/app/layouts/icarus";
import {fetchGrades} from "@/services/apiService";
import {Grade} from "@/types";
import Card from "@/components/misc/Card";
import withRoleGuard from "@/hoc/withRoleGuard";
import GradesTable from "@/components/classes/GradesTable";

const Classes = () => {
    const [grades, setGrades] = useState<Grade[]>([]);

    useEffect(() => {
        fetchGrades().then(grades => {
            setGrades(grades);
        })
            .catch(error => {
                console.error('Error fetching teachers data:', error);
            });

    }, []);


    return (
        <Icarus>
            <div className='container font-nunito mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 w-2/3 h-2/5'>
                <Card className='flex flex-col justify-center items-center opacity-80 w-full shadow-dark-mild'>
                    <h1>Chart Here</h1>
                </Card>
                <Card className='flex flex-col justify-center items-center opacity-80 w-full shadow-dark-mild'>
                    <h1>Another Chart Here</h1>
                </Card>
            </div>
            <div className='h-3/5 mt-2'>
                <GradesTable grades={grades}/>
            </div>
        </Icarus>
    )
};

export default withRoleGuard(['Admin', 'Teacher'])(Classes);