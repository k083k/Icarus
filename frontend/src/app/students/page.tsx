'use client'
import React, {useEffect, useState} from 'react';
import withRoleGuard from '@/hoc/withRoleGuard';
import Icarus from '@/app/layouts/icarus';
import StudentsTable from '@/components/students/StudentsTable';
import {deleteStudent, fetchStudents} from '@/services/apiService';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/misc/Toast";
import {Student} from "@/types";
import Card from "@/components/misc/Card";
import PieChart from "@/components/charts/PieChart";
import BarChart from "@/components/charts/BarChart";

const Students = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState<any>(null);
    const [totalMaleStudents, setTotalMaleStudents] = useState<number>(0);
    const [totalFemaleStudents, setTotalFemaleStudents] = useState<number>(0);
    const [gradeCounts, setGradeCounts] = useState<{ [key: string]: number }>({}); // Object to store grade counts

    useEffect(() => {
        fetchStudents().then((students) => { // Correct type annotation for data
            setStudents(students);

            const maleStudents = students.filter((student: { gender: string; }) => student.gender === 'male').length;
            const femaleStudents = students.filter((student: {
                gender: string;
            }) => student.gender === 'female').length;

            setTotalMaleStudents(maleStudents);
            setTotalFemaleStudents(femaleStudents);

            const counts: { [key: string]: number } = {};
            students.forEach((student: { grade_class: string | number; }) => {
                counts[student.grade_class] = (counts[student.grade_class] || 0) + 1;
            });
            setGradeCounts(counts);
        })
            .catch(error => {
                console.error('Error fetching students data:', error);
            });
    }, []);

    const handleDelete = async (studentId: string) => { // Correct type annotation for studentId
        try {
            await deleteStudent(studentId);
            setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
            setToastIcon(faTrashCan);
            setToastMessage("Deleted successfully.");
            setShowToast(true);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const chartDataPie = {
        labels: ['Male Students', 'Female Students'],
        values: [totalMaleStudents, totalFemaleStudents],
        colors: ['#2196F3', '#9C27B0']
    };

    const sortedLabels = Object.keys(gradeCounts).sort((a, b) => {
        return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
    });

    const chartDataBar = {
        labels: sortedLabels,
        values: Object.values(gradeCounts),
        colors: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0']
    };

    return (
        <Icarus>
            {/*<h1 className='mb-2 font-bold p-6 font-serif text-4xl text-black dark:text-white'>Students</h1>*/}
            <div className='container font-nunito mx-auto flex flex-row gap-2 mb-2 w-2/3 h-2/5'>
                <Card
                    className='flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-300 opacity-80 w-1/2 shadow-dark-mild'>
                    <PieChart data={chartDataPie}/>
                </Card>
                <Card
                    className='flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-300 opacity-80 w-1/2 shadow-dark-mild'>
                    {/**/}
                    <BarChart data={chartDataBar}/>
                </Card>
            </div>
            <div className='h-3/5'>
                <StudentsTable students={students} onDelete={handleDelete}/>
                {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)}/>}
            </div>
        </Icarus>
    );
};

export default withRoleGuard(['Admin'])(Students);