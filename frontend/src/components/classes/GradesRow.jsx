import React from 'react';
import Image from "next/image";
import {ClassIcon} from "../../../public/icons";
import {useRouter} from "next/navigation";

const GradesRow = ({ grade }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/grades/${grade._id}`); // Navigate to grade details page
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-700 h-10 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={handleClick}>
            <th scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                <Image className="w-10 h-10" src={ClassIcon} alt={'class Icon'}/>
                <div className="ps-3">
                    <div
                        className="text-base font-semibold">{`${grade.name}`}</div>
                </div>
            </th>
        </tr>
    );
};

export default GradesRow;
