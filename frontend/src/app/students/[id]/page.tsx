'use client'
import React, { useEffect, useState } from 'react';
import {useParams} from 'next/navigation';
import StudentDetails from '@/components/students/StudentDetails';
import {fetchStudentById} from '@/services/apiService';
import withRoleGuard from '@/hoc/withRoleGuard';

const StudentDetailsPage = () => {
    const params = useParams();
    const {id} = params;

    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Ensure component is rendered on the client-side
        if (typeof window !== 'undefined' && id) {
            fetchStudentById(id)
                .then(studentData => {
                    setStudent(studentData);
                })
                .catch(error => {
                    console.error('Error fetching student details:', error);
                });
        }
    }, [id]);

    if (!student) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <StudentDetails student={student} />
        </div>
    );
};

export default withRoleGuard(['Admin', 'Teacher'])(StudentDetailsPage);
