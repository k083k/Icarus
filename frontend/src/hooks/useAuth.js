import { useState, useEffect } from 'react';
import {fetchUserData} from "@/services/apiService";

const useAuth = () => {
    const [auth, setAuth] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetchUserData();
                setAuth(true);
                setUserName(`${data.first_name} ${data.last_name}`);
                setUserGender(data.gender);
                setUserRole(data.role);
            } catch (error) {
                setAuth(false);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { auth, userRole, userGender, userName, loading };
};

export default useAuth;
