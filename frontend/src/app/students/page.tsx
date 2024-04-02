'use client'
import React, { useEffect, useState } from 'react';
import withRoleGuard from '@/hoc/withRoleGuard';
import Icarus from '@/app/layouts/icarus';
import StudentsTable from '@/components/students/StudentsTable';
import {deleteStudent, fetchStudents} from '@/services/apiService';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/misc/Toast";
import { Student } from "@/types";

const Students = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState<any>(null);

    useEffect(() => {
        fetchStudents()
            .then(data => {
                setStudents(data);
            })
            .catch(error => {
                console.error('Error fetching students data:', error);
            });
    }, []);

    const handleDelete = async (studentId: any) => {
        try {
            await deleteStudent(studentId);
            setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
            setToastIcon(faTrashCan);
            setToastMessage("Deleted successfully.");
            setShowToast(true);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <Icarus>
            <h1 className='mb-2 font-bold p-6 font-serif text-4xl text-black dark:text-white'>Students</h1>
            <StudentsTable students={students} onDelete={handleDelete}/>
            {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)}/>}
        </Icarus>
    );
};

export default withRoleGuard(['Admin'])(Students);