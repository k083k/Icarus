import React, { useState } from 'react';

const Tabs = ({ tabs, children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="flex flex-col">
            {/* Tabs Row */}
            <div className="flex flex-row items-center justify-center">
                <ul className="relative flex flex-wrap p-3 list-none rounded-xl bg-gray-400" role="tablist">
                    {tabs.map((tab, index) => (
                        <li key={index} className="z-30 flex-auto text-center">
                            <a href="#"
                                className={`z-30 mx-auto w-full px-3 py-2 gap-2 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit ${
                                    activeTab === index ? 'text-black bg-emerald-800' : ''}`}
                                data-tab-target="" role="tab" aria-selected={activeTab === index ? 'true' : 'false'}
                                onClick={() => handleTabClick(index)} >
                                {tab.icon}
                                <span className="ml-1">{tab.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content Area */}
            <div className="flex flex-col items-center justify-center border border-danger">{children[activeTab]}</div>
        </div>
    );
};

export default Tabs;
