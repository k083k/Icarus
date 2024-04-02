'use client'
import React, {useEffect, useState} from 'react';
import withRoleGuard from "@/hoc/withRoleGuard";
import Icarus from "@/app/layouts/icarus";
import AdminsTable from "@/components/admins/AdminsTable";
import {deleteAdmin, fetchAdmins} from "@/services/apiService";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/misc/Toast";
import { Admin } from "@/types";

const Admins = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState<any>(null);

    useEffect(() => {
        fetchAdmins()
            .then(data => {
                setAdmins(data);
            })
            .catch(error => {
                console.error('Error fetching admins data:', error);
            });
    }, []);

    const handleDelete = async (adminId: any) => {
        try {
            await deleteAdmin(adminId);
            setAdmins(prevAdmins => prevAdmins.filter(admin => admin._id !== adminId));
            setToastIcon(faTrashCan);
            setToastMessage("Deleted successfully.");
            setShowToast(true);
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    return (
        <Icarus>
            <h1 className='mb-5 font-serif font-bold p-6 text-4xl text-black dark:text-white'>Admins</h1>
            <AdminsTable admins={admins} onDelete={handleDelete}/>
            {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)} />}
        </Icarus>
    )
};

export default withRoleGuard(['Admin'])(Admins);