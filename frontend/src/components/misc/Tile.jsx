import React from 'react';

function Tile({ text }) {
    return (
        <div className="dark:bg-gray-700 bg-gray-300 p-4 rounded-md shadow-md inline-block dark:text-white text-black mb-4 mr-4 transform transition-all duration-300 hover:scale-110">
            {text}
        </div>
    );
}

export default Tile;