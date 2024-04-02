'use client'
import React, {SyntheticEvent, useState} from 'react';
import {useRouter} from "next/navigation";
import Toast from "@/components/misc/Toast";
import {faCheckCircle, faCopy} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/misc/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Gender} from "@/types";
import {createAdmin} from "@/services/apiService";


interface Props {
    genders: Gender[];
}

export default function RegisterForm({genders}: Props) {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showCopyToast, setShowCopyToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [tempPassword, setTempPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const router = useRouter()

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        // @ts-ignore
        setToastIcon(faCheckCircle);
        setToastMessage('Copied');
        setShowCopyToast(true);

        setTimeout(() => {
            setShowCopyToast(false);
        }, 3000);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await createAdmin({
                first_name,
                last_name,
                email,
                address,
                gender
            });

            if (response.ok) {
                const data = await response.json();
                const tempPassword = data.tempPassword;

                setTempPassword(tempPassword);

                const modalContent = (
                    <div className='text-center'>
                        <p className="text-2xl">{tempPassword}
                            <FontAwesomeIcon
                                icon={faCopy}
                                className="cursor-pointer"
                                height={70}
                                width={70}
                                onClick={() => handleCopy(tempPassword)}
                            />
                        </p>

                    </div>
                );

                setModalContent(modalContent);
                setShowModal(true);

                // @ts-ignore
                setToastIcon(faCheckCircle);
                setToastMessage("Created successfully.");
                setShowToast(true);


                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            } else {
                console.error('Submit request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const closeModal = () => {
        setShowModal(false);
        router.push('/admins');
    }

    return (
        <>
            {showToast && <Toast icon={toastIcon} message={toastMessage} onClose={() => setShowToast(false)}/>}
            <Modal isOpen={showModal} onClose={closeModal} title="Temporary Password">
                {showCopyToast && <Toast icon={toastIcon} onClose={() => setShowCopyToast(false)} message={toastMessage}/>}
                {modalContent}
            </Modal>
            <div
                className="w-full bg-neutral-800/25 rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="first_name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin&apos;s
                                First Name *</label>
                            <input type="text" name="first_name" id="first_name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="John" value={first_name} onChange={(e) => setFirstName(e.target.value)}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="last_name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin&apos;s
                                Last Name *</label>
                            <input type="text" name="last_name" id="last_name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Doe" value={last_name} onChange={(e) => setLastName(e.target.value)}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin&apos;s
                                Email *</label>
                            <input type="email" name="email" id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="name@company.com" value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required/>
                        </div>

                        <div>
                            <label htmlFor="address"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin&apos;s
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
                                       className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Admin&apos;s
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
                            Create Admin
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}
