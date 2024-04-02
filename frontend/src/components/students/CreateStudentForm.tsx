'use client'
import React, {SyntheticEvent, useState} from 'react';
import {useRouter} from "next/navigation";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Toast from "@/components/misc/Toast";
import { Title, Suffix, Gender, Grade } from "@/types";
import {createStudent} from "@/services/apiService";


interface Props {
    titles: Title[];
    suffixes: Suffix[];
    genders: Gender[];
    grades: Grade[]
}


export default function CreateStudentForm({titles, suffixes, genders, grades}: Props) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        address: '',
        parent_title: '',
        parent_name: '',
        parent_suffix: '',
        gender: '',
        grade_class: ''
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const parentFullName = `${formData.parent_title} ${formData.parent_name} ${formData.parent_suffix}`;

    const modifiedRequestBody = {
        ...formData,
        parentName: parentFullName
    };

    const handleChange = (e: SyntheticEvent) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await createStudent(modifiedRequestBody);

            if (response.ok) {
                // @ts-ignore
                setToastIcon(faCheckCircle);
                setToastMessage("Created successfully.");
                setShowToast(true);

                setTimeout(() => {
                    setShowToast(false);
                    router.push('/students'); // Assuming you want to reload the page using Next.js router
                }, 3000);
            } else {
                console.error('Error creating student:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)}/>}
            <div
                className="w-full bg-neutral-800/25 rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        {/* Add form fields */}
                        <div>
                            <label htmlFor="first_name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student&apos;s
                                First Name *</label>
                            <input type="text" name="first_name" id="first_name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="John" value={formData.first_name} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student&apos;s
                                Last Name *</label>
                            <input type="text" name="last_name" id="last_name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Smith" value={formData.last_name} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="date_of_birth"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student&apos;s
                                Date of Birth *</label>
                            <input type="date" name="date_of_birth" id="date_of_birth"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="2009/06/19" value={formData.date_of_birth} onChange={handleChange}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="address"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student&apos;s
                                Address *</label>
                            <input type="text" name="address" id="address"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="1234 Django Ave., Accra" value={formData.address}
                                   onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="parent_title"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student&apos;s
                                Parent&apos;s Name *</label>
                            <div className="flex gap-2">
                                <div className="flex-none w-1/5">
                                    <select name="parent_title" id="parent_title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={formData.parent_title} onChange={handleChange}>
                                        <option value="">Title</option>
                                        {titles.map(title => (
                                            <option key={title.value} value={title.value}>{title.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grow">
                                    <input type="text" name="parent_name" id="parent_name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="e.g. John Smith" value={formData.parent_name}
                                           onChange={handleChange} required/>
                                </div>

                                <div className="flex-none w-1/5">
                                    <select name="parent_suffix" id="parent_suffix"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={formData.parent_suffix} onChange={handleChange}>
                                        <option value="">Suffix</option>
                                        {suffixes.map(suffix => (
                                            <option key={suffix.value} value={suffix.value}>{suffix.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex-1 mr-2">
                                <label htmlFor="gender"
                                       className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Student&apos;s
                                    Gender</label>
                                <select name="gender" id="gender"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        value={formData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    {/* Mapping over the genders array */}
                                    {genders.map((genderOption, index) => (
                                        // Using the value property as the value of the option
                                        <option key={index} value={genderOption.value}>{genderOption.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 ml-2">
                                <label htmlFor="grade_class"
                                       className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Student&apos;s
                                    Grade</label>
                                <select name="grade_class" id="grade_class"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        value={formData.grade_class} onChange={handleChange}>
                                    <option value="">Select Grade</option>
                                    {/* Mapping over the grades array */}
                                    {grades.map((gradeOption, index) => (
                                        // Using the value property as the value of the option
                                        <option key={index} value={gradeOption.value}>{gradeOption.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="submit"
                                className="w-full text-white bg-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Create Student
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
