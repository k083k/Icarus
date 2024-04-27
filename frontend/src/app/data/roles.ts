type RoleItem = {
    label: string;
    url: string;
    lightIcon: string;
    darkIcon: string;
};

type Roles = {
    [key: string]: RoleItem[]; // Index signature to allow any string key with an array of RoleItem
};

const roles: Roles = {
    Admin: [
        {
            label: "Admin Dashboard",
            url: "/admin-dashboard",
            lightIcon: "/icons/dashboardIcon.png",
            darkIcon: "/icons/dashboardIconW.png"
        },
        {
            label: "Admins",
            url: "/admins",
            lightIcon: "/icons/adminIcon.png",
            darkIcon: "/icons/adminIconW.png"
        },
        {
            label: "Students",
            url: "/students",
            lightIcon: "/icons/studentsIcon.png",
            darkIcon: "/icons/studentsIconW.png"
        },
        {
            label: "Teachers",
            url: "/teachers",
            lightIcon: "/icons/teachersIcon.png",
            darkIcon: "/icons/teachersIconW.png"
        },
        {
            label: "Parents",
            url: "/parents",
            lightIcon: "/icons/parentsIcon.png",
            darkIcon: "/icons/parentsIconW.png"
        },
        {
            label: "Grades",
            url: "/grades",
            lightIcon: "/icons/classIcon.png",
            darkIcon: "/icons/classIconW.png"
        },
        // Add more admin role items if needed
    ],
    Teacher: [
        {
            label: "Teacher Dashboard",
            url: "/teacher-dashboard",
            lightIcon: "/icons/tDashboardIcon.png",
            darkIcon: "/icons/tDashboardIconW.png"
        },
        {
            label: "Grades",
            url: "/grades",
            lightIcon: "/icons/classIcon.png",
            darkIcon: "/icons/classIconW.png"
        },
        // Add more teacher role items if needed
    ],
};

export { roles }; // Export the roles object
