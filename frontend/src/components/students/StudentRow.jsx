import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {AvatarMan, AvatarWoman} from '../../../public/avatars';

const StudentRow = ({ student, onView, onDelete }) => {

    const handleView = () => {
        onView(student, "View Student Details");
    };

    const handleDelete = () => {
        onDelete(student._id, "Confirm Deletion")
    };

    const avatarSrc = student.gender === 'male' ? AvatarMan : AvatarWoman;

    return (
        <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Image className="w-10 h-10 rounded-full" src={avatarSrc} alt={`${student.first_name} ${student.last_name}`} />
                <div className="ps-3">
                    <div className="text-base font-semibold">{`${student.first_name} ${student.last_name}`}</div>
                    <div className="font-normal text-gray-500">{student.grade_class}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                {student.parentName}
            </td>
            <td className="px-6 py-4 flex justify-center items-center">
                <a href="#" className="text-gray-400 dark:hover:text-black hover:text-gray-600 mr-2" onClick={handleView}>
                    <FontAwesomeIcon icon={faEye} />
                </a>
                <a href="#" className="text-gray-400 dark:hover:text-black hover:text-gray-600 mx-2">
                    <FontAwesomeIcon icon={faPencil} />
                </a>
                <a href="#" className="text-gray-400 dark:hover:text-black hover:text-gray-600 ml-2" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </a>
            </td>
        </tr>
    );
};

export default StudentRow;
