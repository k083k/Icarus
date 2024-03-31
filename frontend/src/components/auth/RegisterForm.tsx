'use client'
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import {RegisterFormProps} from "@/app/register-teacher/RegisterFormProps";


export default function RegisterForm({ roles, genders }: RegisterFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [passwordValidationError, setPasswordValidationError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const router = useRouter()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMatchError("Passwords do not match");
            return;
        }
        if (!validatePassword(password)) {
            setPasswordValidationError("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character");
            return;
        }

        setPasswordMatchError('');

        await fetch('http://localhost:8000/api/v1/register-teacher', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                address: address,
                role: selectedRole,
                gender: selectedGender
            })
        });

        router.push('/login');
    }

    // Function to validate password
    const validatePassword = (password: string) => {
        // Regular expression to match password criteria
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    return (
        <div
            className="w-full bg-neutral-800/25 rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                    <div>
                        <label htmlFor="first_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                            Name *</label>
                        <input type="text" name="first_name" id="first_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <label htmlFor="last_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                            Name *</label>
                        <input type="text" name="last_name" id="last_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            email *</label>
                        <input type="email" name="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <label htmlFor="address"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            Address *</label>
                        <input type="text" name="address" id="address"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="1234 Django Ave, Accra" value={address} onChange={(e) => setAddress(e.target.value)}
                               required/>
                    </div>
                    <div className="flex">
                        <div className="flex-1 mr-2">
                            <label htmlFor="role"
                                   className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your
                                Role</label>
                            <select
                                name="role"
                                id="role"
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                {Object.entries(roles).map(([roleKey, role]) => (
                                    <option key={roleKey} value={role.name}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 ml-2">
                            <label htmlFor="gender"
                                   className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your
                                Gender</label>
                            <select name="gender" id="gender"
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                {/* Mapping over the genders array */}
                                {genders.map((genderOption, index) => (
                                    // Using the value property as the value of the option
                                    <option key={index} value={genderOption.value}>{genderOption.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div className="relative">
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="relative">
                            <input type={passwordVisible ? "text" : "password"} name="password" id="password"
                                   placeholder="•••••••••••••••"
                                   className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                       passwordValidationError ? 'border-red-500 focus:ring-red-500' : ''}`}
                                   onChange={(e) => {
                                       setPassword(e.target.value);
                                       setPasswordValidationError('');
                                   }}
                                   required/>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye}
                                             className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                             onClick={togglePasswordVisibility}/>
                        </div>

                        {passwordValidationError && (
                            <p className="text-sm text-red-500 mt-1">{passwordValidationError}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label htmlFor="confirm-password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"} name="confirm-password"
                                id="confirm-password"
                                placeholder="•••••••••••••••"
                                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                    passwordMatchError ? 'border-red-500 focus:ring-red-500' : ''}`} onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setPasswordMatchError('');
                            }}
                                required/>
                            <FontAwesomeIcon
                                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </div>
                        {passwordMatchError && (
                            <p className="text-sm text-red-500 mt-1">{passwordMatchError}</p>
                        )}
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox"
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                   required/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept
                                the&nbsp;
                                <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms
                                    and Conditions</a>
                            </label>
                        </div>
                    </div>
                    <button type="submit"
                            className="w-full text-white bg-gray-700 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?&nbsp;
                        <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login
                            here</a>
                    </p>
                </form>
            </div>
        </div>

    );
}
