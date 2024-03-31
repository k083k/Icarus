'use client'
import React, {SyntheticEvent, useState} from 'react';
import {useRouter} from "next/navigation";
import Toast from "@/components/Toast";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

interface Gender {
    value: string,
    label: string
}

interface Props {
    genders: Gender[];
}

export default function RegisterForm({ genders }: Props) {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');

    const router = useRouter()


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/teachers', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    address: address,
                    gender: gender
                })
            });

            if (response.ok) {
                // @ts-ignore
                setToastIcon(faCheckCircle);
                setToastMessage("Created successfully.");
                setShowToast(true);

                setTimeout(() => {
                    setShowToast(false);
                    window.location.reload();
                }, 3000);
            } else {
                console.error('Submit request failed:', response.statusText);
            }
        }catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    return (
        <>
            {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)}/>}
        <div className="w-full bg-neutral-800/25 rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                    <div>
                        <label htmlFor="first_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher&apos;s
                            First Name *</label>
                        <input type="text" name="first_name" id="first_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="John" value={first_name} onChange={(e) => setFirstName(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <label htmlFor="last_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher&apos;s
                            Last Name *</label>
                        <input type="text" name="last_name" id="last_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Doe" value={last_name} onChange={(e) => setLastName(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher&apos;s
                            Email *</label>
                        <input type="email" name="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>

                    <div>
                        <label htmlFor="address"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher&apos;s
                            Address *
                        </label>
                        <input type="text" name="address" id="address"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="1234 Django Lane, Accra" value={address}
                               onChange={(e) => setAddress(e.target.value)} required/>
                    </div>
                    <div className="flex">
                        <div className="flex-1 mr-2">
                            <label htmlFor="gender"
                                   className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Teacher&apos;s
                                Gender</label>
                            <select name="gender" id="gender"
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                {genders.map((genderOption, index) => (
                                    <option key={index} value={genderOption.value}>{genderOption.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <button type="submit"
                            className="w-full text-white bg-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Create Teacher
                    </button>

                </form>
            </div>
        </div>
        </>
    );
}
