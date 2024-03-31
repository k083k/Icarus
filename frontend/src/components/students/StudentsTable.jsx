'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Modal from '../misc/Modal';
import Toast from '../Toast';
import {formatDateOfBirth} from '@/utils/dateUtils';
import {deleteStudent} from '@/services/apiService';
import StudentRow from './StudentRow';
import SearchInput from "@/components/misc/SearchInput";

const StudentsTable = ({students}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [deleteStudentId, setDeleteStudentId] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');

    useEffect(() => {
        if (deleteStudentId !== null) {
            setModalContent(
                <div>
                    <p className='text-center'>Are you sure you want to delete this student?</p>
                    <div className="flex justify-around mt-4">
                        <button onClick={handleCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            Cancel
                        </button>
                        <button onClick={handleProceedDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            Proceed
                        </button>
                    </div>
                </div>
            );
            setShowModal(true);
        }
    }, [deleteStudentId]);

    const handleView = (student, title) => {
        const formattedDateOfBirth = formatDateOfBirth(student.date_of_birth);
        setModalTitle(title);
        setModalContent(
            <div>
                <p className='mb-2'><strong>First Name:</strong>&nbsp;&nbsp;{student.first_name}</p>
                <p className='mb-2'><strong>Last Name:</strong>&nbsp;&nbsp;{student.last_name}</p>
                <p className='mb-2'><strong>Address:</strong>&nbsp;&nbsp;{student.address}</p>
                <p className='mb-2'><strong>Date of Birth:</strong>&nbsp;&nbsp;{formattedDateOfBirth}</p>
                <p className='mb-2'><strong>Parent Name:</strong>&nbsp;&nbsp;{student.parentName}</p>
                <p className='capitalize mb-2'><strong>Gender:</strong>&nbsp;&nbsp;{student.gender}</p>
                <p className='capitalize mb-2'><strong>Grade/Class:</strong>&nbsp;&nbsp;{student.grade_class}</p>
                <button onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-4">
                    Close
                </button>
            </div>
        );
        setShowModal(true);
    };

    const handleDelete = (studentId, title) => {
        setModalTitle(title);
        setDeleteStudentId(studentId);
    };

    const handleProceedDelete = async () => {
        try {
            await deleteStudent(deleteStudentId);
            setShowModal(false);
            setToastIcon(faTrashCan);
            setToastMessage("Deleted successfully.");
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const filteredStudents = students.filter(student => {
        const fullName = `${student.first_name} ${student.last_name}`;
        return (
            searchQuery.trim() === '' || fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCancel = () => {
        setDeleteStudentId(null);
        setShowModal(false);
    };

    return (
        <>
            {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)}/>}
            <div className="container mx-auto w-2/3 mb-4 flex justify-between">
                <div className='flex items-center'>
                    <a href="/create-student">
                        <FontAwesomeIcon icon={faPlusCircle}
                                         className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-900 h-8 w-8 cursor-pointer"/>
                    </a>
                </div>
                <SearchInput value={searchQuery} onChange={handleSearch}/>
            </div>
            <div className="container mx-auto w-2/3 h-[80%] relative overflow-x-auto shadow-md sm:rounded-lg">
                <Modal isOpen={showModal} onClose={closeModal} title={modalTitle}>
                    {modalContent}
                </Modal>
                {filteredStudents.length === 0 ? (
                    <p className='container mx-auto flex justify-center mt-8 text-black dark:text-white'>No results
                        found</p>
                ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-sm sticky top-0 z-[3] text-gray-700 uppercase bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Parent Name</th>
                            <th scope="col" className="px-6 py-3 flex justify-center items-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredStudents.map((student, index) => (
                            <StudentRow
                                key={index}
                                student={student}
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

export default StudentsTable;