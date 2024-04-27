import React from 'react';
import Icarus from "@/app/layouts/icarus";
import {AvatarMan, AvatarWoman} from "../../../public/avatars";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCog, faComputer,
    faPencil,
    faTrash, faUser
} from "@fortawesome/free-solid-svg-icons";
import withRoleGuard from "@/hoc/withRoleGuard";
import {formatDateOfBirth} from "@/utils/dateUtils";
import Tabs from "@/components/misc/Tabs";

const StudentDetails = ({student}) => {
    const tabs = [
        {
            title: 'Student Profile',
            icon: (
                <FontAwesomeIcon icon={faComputer}/>
            ),
        },
        {
            title: 'Student Attendance',
            icon: (
                <FontAwesomeIcon icon={faUser}/>
            ),
        },
        {
            title: 'Student Performance',
            icon: (
                <FontAwesomeIcon icon={faCog}/>
            ),
        },
        // Add more tabs as needed
    ];
    const avatarSrc = student.gender === 'male' ? AvatarMan : AvatarWoman;

    return (
        <Icarus>
            <div>
                <div className='px-32 border border-green-500 mb-5'>
                    <div className='px-32 flex flex-row justify-between items-center'>
                        <div className='flex flex-row justify-between items-center mb-5'>
                            <Image src={avatarSrc} height={350} width={350}
                                   alt={`${student.first_name} ${student.last_name}`}/>
                            <p className='text-3xl dark:text-white'>{student.first_name} {student.last_name}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faPencil}
                                             className='bg-white shadow-dark-mild dark:bg-black dark:text-white rounded p-3 mr-2 cursor-pointer'/>
                            <FontAwesomeIcon icon={faTrash}
                                             className='bg-white shadow-dark-mild dark:bg-black dark:text-white rounded p-3 cursor-pointer'/>
                        </div>
                    </div>
                </div>
                <div className='px-32 border border-green-500'>
                    <Tabs tabs={tabs}>
                        {/* Content for Dashboard tab */}
                        <div>
                            <h1 className='font-bold text-3xl dark:text-white'>Student Details</h1>
                            <p className='text-xl dark:text-white'>{student.first_name} {student.last_name}</p>
                            <p className='capitalize font-medium dark:text-white'>{student.gender}</p>
                            <p className='dark:text-white'>{formatDateOfBirth(student.date_of_birth)}</p>
                            <p className='dark:text-white'>{student.address}</p>
                            <p className='dark:text-white'>{student.parentName}</p>
                            <p className='dark:text-white'>{student.grade_class}</p>
                        </div>
                        {/* Content for Profile tab */}
                        <div>Attendance content goes here</div>
                        {/* Content for Settings tab */}
                        <div>Performance content goes here</div>
                    </Tabs>
                </div>
            </div>
        </Icarus>
    );
};

export default withRoleGuard(['Admin', 'Teacher'])(StudentDetails);