'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Modal from '../misc/Modal';
import SearchInput from "@/components/misc/SearchInput";
import GradesRow from "@/components/classes/GradesRow";

const GradesTable = ({grades}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredGrades = grades.filter(grade => {
        const fullName = `${grade.name}`;
        return (
            searchQuery.trim() === '' || fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grade.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="container mx-auto w-2/3 mb-4 flex justify-between">
                <div className='flex items-center'>
                    <a href="/create-teacher">
                        <FontAwesomeIcon icon={faPlusCircle}
                                         className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-900 h-8 w-8 cursor-pointer"/>
                    </a>
                </div>
                <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
            <div className="container w-2/3 h-[80%] mx-auto relative overflow-x-auto sm:rounded-lg">
                {filteredGrades.length === 0 ? (
                    <p className='container mx-auto flex justify-center mt-8 text-black dark:text-white'>No results
                        found</p>
                ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
                        <thead
                            className="text-xs sticky top-0 z-[3] text-gray-700 uppercase bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredGrades.map((grade, index) => (
                            <GradesRow
                                key={index}
                                grade={grade}
                            />
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default GradesTable;