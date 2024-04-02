'use client'
import React, {useEffect, useState} from 'react';
import withRoleGuard from "@/hoc/withRoleGuard";
import Icarus from "@/app/layouts/icarus";
import TeachersTable from "@/components/teachers/TeachersTable";
import {deleteTeacher, fetchTeachers} from "@/services/apiService";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/misc/Toast";
import { Teacher } from "@/types";

const Teachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState<any>(null);

    useEffect(() => {
        fetchTeachers()
            .then(data => {
                setTeachers(data);
            })
            .catch(error => {
                console.error('Error fetching teachers data:', error);
            });
    }, []);

    const handleDelete = async (userId: any) => {
        try {
            await deleteTeacher(userId);
            setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher._id !== userId));
            setToastIcon(faTrashCan);
            setToastMessage("Deleted successfully.");
            setShowToast(true);
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    return (
        <Icarus>
            <h1 className='mb-5 font-serif font-bold p-6 text-4xl text-black dark:text-white'>Teachers</h1>
            <TeachersTable teachers={teachers} onDelete={handleDelete}/>
            {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)} />}
        </Icarus>
    )
};

export default withRoleGuard(['Admin'])(Teachers);