'use client'
import React from 'react';
import Icarus from "@/app/layouts/icarus";
import Tile from "@/components/misc/Tile";
import Card from "@/components/misc/Card";
import Image from "next/image";
import { AvatarMan, AvatarWoman } from '../../../public/avatars';
import { useRouter } from "next/navigation";
import withRoleGuard from "@/hoc/withRoleGuard"; // Import useRouter from next/router

const GradeDetails = ({ grade }) => {
    const router = useRouter(); // Access the router object

    // Function to handle navigation to StudentDetailsPage
    const handleStudentClick = (studentId) => {
        router.push(`/students/${studentId}`); // Navigate to StudentDetailsPage with studentId as route parameter
    };

    return (
        <Icarus>
            <p className='font-bold text-3xl dark:text-white'>{grade.name}</p>
            <h2 className='font-bold text-3xl dark:text-white mb-5'>Subjects:</h2>
            <ul>
                {grade.subjects.map(subject => (
                    <Tile
                        key={subject._id} text={subject.name}>
                    </Tile>
                ))}
            </ul>
            <h2 className='font-bold text-3xl dark:text-white mb-5'>Students:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {grade.students.map(student => {
                    // Choose avatar based on gender
                    const avatarSrc = student.gender === 'male' ? AvatarMan : AvatarWoman;
                    return (
                        <Card key={student._id} className="flex flex-col items-center p-4 cursor-pointer" onClick={() => handleStudentClick(student._id)} >
                            <Image className="w-32 h-32 rounded-full mb-3" src={avatarSrc} alt={`${student.name}`}/>
                            <span className="ml-2 dark:text-white text-black">{student.name}</span>
                        </Card>
                    );
                })}
            </div>
        </Icarus>
    );
};

export default withRoleGuard(['Admin', 'Teacher'])(GradeDetails);
