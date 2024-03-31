'use client'
import React from "react";
import Nav from "@/components/navs/Nav";
import withRoleGuard from "@/hoc/withRoleGuard";
import SideNav from "@/components/navs/SideNav";

const TeacherDashboard = () => {
    return (
        <>
            <SideNav/>
            <Nav/>
            <div className='bg-teacher-dash border border-red-800 bg-cover bg-center h-[500px]'>
                <h1 className='container mx-auto flex flex-col justify-center items-center font-bold py-6'> Welcome to the Teacher Dashboard </h1>
            </div>
        </>
    )
}

export default withRoleGuard(['Teacher'])(TeacherDashboard);