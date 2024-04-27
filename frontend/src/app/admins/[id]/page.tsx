'use client'
import React, { useEffect, useState } from 'react';
import {useParams} from 'next/navigation';
import AdminDetails from '@/components/admins/AdminDetails';
import {fetchAdminById} from '@/services/apiService';
import withRoleGuard from '@/hoc/withRoleGuard';

const AdminDetailsPage = () => {
    const params = useParams();
    const {id} = params;

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        // Ensure component is rendered on the client-side
        if (typeof window !== 'undefined' && id) {
            fetchAdminById(id)
                .then(adminData => {
                    setAdmin(adminData);
                })
                .catch(error => {
                    console.error('Error fetching admin details:', error);
                });
        }
    }, [id]);

    if (!admin) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <AdminDetails admin={admin} />
        </div>
    );
};

export default withRoleGuard(['Admin', 'Teacher'])(AdminDetailsPage);
