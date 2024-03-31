import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchInput = ({ value, onChange }) => {
    return (
        <div className="relative w-1/4 flex items-center">
            <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-3 text-gray-400 pointer-events-none"
            />
        </div>
    );
};

export default SearchInput;
