import React, { ReactNode } from 'react';
import {CardProps} from "@/types"

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
    return (
        <div
            className={`bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 ${className}`}
            onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
