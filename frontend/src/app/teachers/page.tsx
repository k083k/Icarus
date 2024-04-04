'use client'
import React, {useEffect, useState} from 'react';
import Icarus from "@/app/layouts/icarus";
import TeachersTable from "@/components/teachers/TeachersTable";
import {deleteTeacher, fetchTeachers, fetchGenders} from "@/services/apiService";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/misc/Toast";
import {Gender, Teacher} from "@/types";
import Card from "@/components/misc/Card";
import PieChart from "@/components/charts/PieChart";
import withRoleGuard from "@/hoc/withRoleGuard";
import './teachers.css'

const Teachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState<any>(null);
    const [totalMaleTeachers, setTotalMaleTeachers] = useState<number>(0);
    const [totalFemaleTeachers, setTotalFemaleTeachers] = useState<number>(0);
    const [genders, setGenders] = useState<Gender[]>([]); // State for genders

    useEffect(() => {
        fetchTeachers().then(teachers => {
                setTeachers(teachers);
                updateChartData(teachers);
            })
            .catch(error => {
                console.error('Error fetching teachers data:', error);
            });

        fetchGenders().then(genders => {
            setGenders(genders);
        }).catch(error => {
            console.error('Error fetching genders:', error);
        });
    }, []);

    const updateChartData = (teachers: Teacher[]) => {
        const maleTeachers = teachers.filter(teacher => teacher.gender === 'male').length;
        const femaleTeachers = teachers.filter(teacher => teacher.gender === 'female').length;
        setTotalMaleTeachers(maleTeachers);
        setTotalFemaleTeachers(femaleTeachers);
    };

    const handleDelete = async (userId: any) => {
        try {
            await deleteTeacher(userId);
            const updatedTeachers = teachers.filter(teacher => teacher._id !== userId);
            setTeachers(updatedTeachers);
            updateChartData(updatedTeachers);
            setToastIcon(faTrashCan);
            setToastMessage("Deleted successfully.");
            setShowToast(true);
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    return (
        <Icarus>
            <div className='container font-nunito mx-auto flex flex-row gap-2 mb-2 w-2/3 h-2/5'>
                <Card
                    className='flex flex-col justify-center items-center card-background-dark opacity-80 w-1/2 shadow-dark-mild'>
                    <PieChart
                        data={[totalMaleTeachers, totalFemaleTeachers]}
                        labels={['Male Teachers', 'Female Teachers']}
                        colors={['#4CAF50', '#FFC107']}
                    />
                </Card>
                <Card
                    className='flex flex-col justify-center items-center card-background-dark opacity-80 w-1/2 shadow-dark-mild'>
                    <h1>Another Chart Here</h1>
                </Card>
            </div>
            <div className='h-3/5 mt-2'>
                <TeachersTable teachers={teachers} onDelete={handleDelete} genders={genders}/>
                {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)}/>}
                </div>
        </Icarus>
)
};

export default withRoleGuard(['Admin'])(Teachers);