import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faClose} from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed left-0 top-0 z-[5] flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
            <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full relative p-3">
                    <FontAwesomeIcon icon={faCircleXmark} onClick={onClose} className="h-6 w-6 cursor-pointer"/>
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
