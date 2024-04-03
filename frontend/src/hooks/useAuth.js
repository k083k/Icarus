import { useState, useEffect } from 'react';
import {fetchUserData} from "@/services/apiService";

const useAuth = () => {
    const [auth, setAuth] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetchUserData();
                setAuth(true);
                setFirstName(`${data.first_name}`)
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

    return { auth, userRole, userGender, userName, loading, firstName };
};

export default useAuth;
