'use client'
import React, { useEffect, useState, useMemo } from 'react';
import Icarus from '@/app/layouts/icarus';
import StudentsTable from '@/components/students/StudentsTable';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import {deleteStudent, fetchGrades, fetchStudents} from '@/services/apiService';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/misc/Toast";
import {Student} from "@/types";
import Card from "@/components/misc/Card";
import withRoleGuard from "@/hoc/withRoleGuard";
import './students.css'

const Students = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState<any>(null);
    const [totalMaleStudents, setTotalMaleStudents] = useState<number>(0);
    const [totalFemaleStudents, setTotalFemaleStudents] = useState<number>(0);
    const [grades, setGrades] = useState<number>(0);


    useEffect(() => {
        Promise.all([fetchStudents(), fetchGrades()])
            .then(([students, grades]) => {
                setStudents(students);
                setGrades(grades)
                updateChartData(students);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const updateChartData = (students: Student[]) => {
        const maleStudents = students.filter(student => student.gender === 'male').length;
        const femaleStudents = students.filter(student => student.gender === 'female').length;
        setTotalMaleStudents(maleStudents);
        setTotalFemaleStudents(femaleStudents);
    };

    const gradeCounts = useMemo(() => {
        const counts: { [key: string]: number } = {};
        students.forEach(student => {
            counts[student.grade_class] = (counts[student.grade_class] || 0) + 1;
        });
        const sortedKeys = Object.keys(counts).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        const sortedCounts = {};
        sortedKeys.forEach(key => {
            // @ts-ignore
            sortedCounts[key] = counts[key];
        });
        return sortedCounts;
    }, [students]);

    const handleDelete = async (studentId: string) => {
        try {
            await deleteStudent(studentId);
            const updatedStudents = students.filter(student => student._id !== studentId);
            setStudents(updatedStudents);
            updateChartData(updatedStudents);
            setToastIcon(faTrashCan);
            setToastMessage("Deleted successfully.");
            setShowToast(true);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <Icarus>
            <div className='container font-nunito mx-auto flex flex-row gap-2 mb-2 w-2/3 h-2/5'>  {/* grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 w-2/3 h-2/5 */}
                <Card className='flex flex-col justify-center items-center card-background-dark opacity-80 w-1/2 shadow-dark-mild'>
                    <PieChart
                        data={[totalMaleStudents, totalFemaleStudents]}
                        labels={['Male Students', 'Female Students']}
                        colors={['#2196F3', '#9C27B0']}
                    />
                </Card>
                <Card className='flex flex-col justify-center items-center card-background-dark opacity-80 w-1/2 shadow-dark-mild'>
                    <BarChart gradeCounts={gradeCounts}/>
                </Card>
            </div>
            <div className='h-3/5 mt-2'>
                <StudentsTable students={students} onDelete={handleDelete}/>
                {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)} />}
            </div>
        </Icarus>
    );
};

export default withRoleGuard(['Admin'])(Students);
