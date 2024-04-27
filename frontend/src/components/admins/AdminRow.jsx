import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {AvatarMan, AvatarWoman} from '../../../public/avatars';
import {useRouter} from "next/navigation";

const AdminRow = ({admin, onView, onDelete}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/admins/${admin._id}`); // Navigate to grade details page
    };
    const handleView = () => {
        onView(admin, "View Admin Details");
    };

    const handleDelete = () => {
        onDelete(admin._id, "Confirm Deletion")
    };

    const avatarSrc = admin.gender === 'male' ? AvatarMan : AvatarWoman;

    return (
        <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
            <th scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={handleClick}>

                <Image className="w-10 h-10 rounded-full" src={avatarSrc} alt={`${admin.first_name} ${admin.last_name}`}/>
                <div className="ps-3">
                    <div
                        className="text-base font-semibold">{`${admin.first_name} ${admin.last_name}`}</div>
                    <div className="font-normal text-gray-500">{admin.email}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                {admin.role && admin.role.name}
            </td>
            <td className="px-6 py-4 flex justify-center items-center">
                <a href="#"
                   className="text-gray-400 dark:hover:text-gray-900 hover:text-gray-600 mr-2">
                    <FontAwesomeIcon icon={faEye} onClick={() => handleView(admin, "View Admin Details")}/>
                </a>
                <a href="#"
                   className="text-gray-400 dark:hover:text-gray-900 hover:text-gray-600 ml-2">
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(admin._id, "Confirm Deletion")}/>
                </a>
            </td>
        </tr>
    );
};

export default AdminRow;
