'use client'
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import GradeDetails from '@/components/classes/GradeDetails';
import { fetchGradeById } from '@/services/apiService';
import withRoleGuard from "@/hoc/withRoleGuard";

const GradePage = () => {
    const params = useParams();
    const {id} = params;

    const [grade, setGrade] = useState(null);

    useEffect(() => {
        // Ensure component is rendered on the client-side
        if (typeof window !== 'undefined' && id) {
            fetchGradeById(id)
                .then(gradeData => {
                    setGrade(gradeData);
                })
                .catch(error => {
                    console.error('Error fetching grade details:', error);
                });
        }
    }, [id]);

    if (!grade) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <GradeDetails grade={grade} />
        </div>
    );
};

export default withRoleGuard(['Admin', 'Teacher'])(GradePage);
