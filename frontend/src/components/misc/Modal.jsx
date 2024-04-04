'use client'
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faClose} from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, onClose, title, children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const darkModeChangeListener = event => setIsDarkMode(event.matches);
        darkModeQuery.addListener(darkModeChangeListener);

        return () => {
            darkModeQuery.removeListener(darkModeChangeListener);
        };
    }, []);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`fixed left-0 top-0 z-[5] flex h-full w-full items-center justify-center bg-opacity-50 py-10 backdrop-filter backdrop-blur-lg`}>
            <div className={`max - h - full w-full max-w-xl overflow-y-auto sm:rounded-2xl ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
                <div className="w-full relative p-3">
                    <FontAwesomeIcon icon={faCircleXmark} onClick={onClose} className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-black'} cursor-pointer`}/>
                    <div className="m-8 my-20 max-w-[400px] mx-auto">
                        <div className="mb-8">
                            <h1 className="mb-4 text-3xl text-center font-extrabold">{title}</h1>
                            {/* Render children components */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
