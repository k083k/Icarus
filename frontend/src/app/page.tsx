'use client'
import Nav from "@/components/navs/Nav";
import Hero from "@/components/misc/Hero";
import SideNav from "@/components/navs/SideNav";
import useAuth from '@/hooks/useAuth'; // Import the useAuth hook for authentication

const Home = () => {
    const { auth, userRole } = useAuth(); // Get authentication status from the useAuth hook

    // Check if the user is authenticated and has the role of 'Admin' or 'Teacher'
    const isAllowedUser = auth && ['Admin', 'Teacher'].includes(userRole);

    return (
        <>
            {isAllowedUser && <SideNav/>} {/* Conditionally render SideNav */}
            <Nav />
            <Hero />
        </>
    );
}

export default Home;
