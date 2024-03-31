'use client'
import React from 'react';
import Nav from "@/components/navs/Nav";


// @ts-ignore
export default function Dashboard() {

    return (
        <div className=''>
            <Nav/>
            <div className='bg-home border border-red-800 bg-cover bg-center h-[500px]'>
                <h1 className='container mx-auto flex flex-col justify-center items-center font-bold py-6'> Welcome
                    to the Dashboard </h1>
            </div>
        </div>
    )
}