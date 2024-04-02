'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Modal from '../misc/Modal';
import SearchInput from "@/components/misc/SearchInput";
import AdminRow from "@/components/admins/AdminRow";

const AdminsTable = ({admins, onDelete}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteAdminId, setDeleteAdminId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (deleteAdminId !== null) {
            setModalContent(
                <div>
                    <p className='text-center'>Are you sure you want to delete this user?</p>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleProceedDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            Delete
                        </button>
                    </div>
                </div>
            );
            setShowModal(true);
        }
    }, [deleteAdminId]);

    const handleView = (admin, title) => {
        setModalTitle(title);
        setModalContent(
            <div>
                <p className='mb-2'><strong>First Name:</strong>&nbsp;&nbsp;{admin.first_name}</p>
                <p className='mb-2'><strong>Last Name:</strong>&nbsp;&nbsp;{admin.last_name}</p>
                <p className='mb-2'><strong>Email:</strong>&nbsp;&nbsp;{admin.email}</p>
                <p className='mb-2'><strong>Role:</strong>&nbsp;&nbsp;{admin.role.name}</p>
                <p className='mb-2'><strong>Address:</strong>&nbsp;&nbsp;{admin.address}</p>
                <p className='capitalize mb-2'><strong>Gender:</strong>&nbsp;&nbsp;{admin.gender}</p>
            </div>
        );
        setShowModal(true);
    };

    const handleDelete = (adminId) => {
        setDeleteAdminId(adminId);
        setDeleting(true);
        setModalTitle("Confirm Deletion");
        setModalContent(
            <div>
                <p className='text-center'>Are you sure you want to delete this user?</p>
                <div className="flex justify-center mt-4">
                    <button
                        disabled={deleting}
                        onClick={handleProceedDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                        {/* Show loading animation or text based on the deleting state */}
                        {deleting && <span className="animate-spin inline-block ml-2">&#9696;</span>}
                    </button>
                </div>
            </div>
        );
        setShowModal(true);
    };

    const handleProceedDelete = async () => {
        try {
            await onDelete(deleteAdminId);
            setShowModal(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (error) {
            console.error('Error deleting admin:', error);
        } finally {
            setDeleting(false);
        }
    };

    const closeModal = () => {
        setDeleteAdminId(null);
        setShowModal(false);
    };

    const filteredAdmins = admins.filter(admin => {
        const fullName = `${admin.first_name} ${admin.last_name}`;
        return (
            searchQuery.trim() === '' || fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="container mx-auto w-2/3 mb-4 flex justify-between">
                <div className='flex items-center'>
                    <a href="/create-admin">
                        <FontAwesomeIcon icon={faPlusCircle}
                                         className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-900 h-8 w-8 cursor-pointer"/>
                    </a>
                </div>
                <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
            <div className="container w-2/3 h-[80%] mx-auto relative overflow-x-auto sm:rounded-lg">
                <Modal isOpen={showModal} onClose={closeModal} title={modalTitle}>
                    {modalContent}
                </Modal>
                {filteredAdmins.length === 0 ? (
                    <p className='container mx-auto flex justify-center mt-8 text-black dark:text-white'>No results
                        found</p>
                ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
                        <thead
                            className="text-xs sticky top-0 z-[3] text-gray-700 uppercase bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3 flex justify-center items-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAdmins.map((admin, index) => (
                            <AdminRow
                                key={index}
                                admin={admin}
                                onView={handleView}
                                onDelete={handleDelete}
                            />
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default AdminsTable;