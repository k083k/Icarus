import React from 'react';
import Icarus from "@/app/layouts/icarus";
import {AvatarMan, AvatarWoman} from "../../../public/avatars";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faCalendar, faChalkboardTeacher,
    faFemale,
    faMale,
    faPencil,
    faShield,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import withRoleGuard from "@/hoc/withRoleGuard";
import {formatDateOfBirth} from "@/utils/dateUtils";

const AdminDetails = ({admin}) => {

    const avatarSrc = admin.gender === 'male' ? AvatarMan : AvatarWoman;

    return (
        <Icarus>
            <div>
                <div className='px-32 border border-green-500 mb-5'>
                    <div className='px-32 flex flex-row justify-between items-center'>
                        <div className='flex flex-row justify-between items-center mb-5'>
                            <Image src={avatarSrc} height={350} width={350}
                                   alt={`${admin.first_name} ${admin.last_name}`}/>
                            <p className='text-3xl dark:text-white'>{admin.first_name} {admin.last_name}</p>
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
                    <div className='px-32'>
                        <h1 className='font-bold text-3xl dark:text-white'>Details</h1>
                        <div className='flex flex-row items-center mb-4'>
                            <FontAwesomeIcon icon={admin.gender === 'male' ? faMale : faFemale}
                                             className='w-10 h-10 dark:text-white'/>&nbsp;&nbsp;
                            <p className='capitalize text-xl font-medium dark:text-white'>{admin.gender}</p>
                        </div>
                        <div className='flex flex-row items-center mb-4'>
                            <FontAwesomeIcon icon={faAddressCard}
                                             className='w-10 h-10 dark:text-white'/>&nbsp;&nbsp;
                            <p className='capitalize text-xl font-medium dark:text-white'>{admin.address}</p>
                        </div>
                    </div>

                </div>
            </div>
        </Icarus>
    );
};

export default withRoleGuard(['Admin', 'Teacher'])(AdminDetails);
