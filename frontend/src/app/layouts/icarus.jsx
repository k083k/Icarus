import React from 'react';
import Sidebar from '../../components/navs/SideNav';
import Navbar from '../../components/navs/Nav';

const Icarus = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex flex-col pt-5 h-screen ml-[80px]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Icarus;
