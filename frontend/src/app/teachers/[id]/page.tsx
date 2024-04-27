'use client'
import React, { useEffect, useState } from 'react';
import {useParams} from 'next/navigation';
import TeacherDetails from '@/components/teachers/TeacherDetails';
import {fetchTeacherById} from '@/services/apiService';
import withRoleGuard from '@/hoc/withRoleGuard';

const TeacherDetailsPage = () => {
    const params = useParams();
    const {id} = params;

    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        // Ensure component is rendered on the client-side
        if (typeof window !== 'undefined' && id) {
            fetchTeacherById(id)
                .then(teacherData => {
                    setTeacher(teacherData);
                })
                .catch(error => {
                    console.error('Error fetching teacher details:', error);
                });
        }
    }, [id]);

    if (!teacher) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <TeacherDetails teacher={teacher} />
        </div>
    );
};

export default withRoleGuard(['Admin', 'Teacher'])(TeacherDetailsPage);
