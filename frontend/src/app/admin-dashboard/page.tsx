'use client'
import React from "react";
import Nav from "@/components/navs/Nav";
import {useRouter} from "next/navigation";
import withRoleGuard from "@/hoc/withRoleGuard";
import SideNav from "@/components/navs/SideNav";

const AdminDashboard = () => {
    const router = useRouter();

    return (
        <>
            <SideNav/>
            <Nav/>
            <div className='bg-admin-dash border border-red-800 bg-cover bg-center h-[500px]'>
                <h1 className='container mx-auto flex flex-col justify-center items-center font-bold py-6'> Welcome
                    to the Admin Dashboard </h1>
            </div>
        </>
    )
}


export default withRoleGuard(['Admin'])(AdminDashboard);