import { useState, useEffect } from 'react';

const useAuth = () => {
    const [auth, setAuth] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/user', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const { data } = await response.json();
                    setAuth(true);
                    setUserName(`${data.first_name} ${data.last_name}`);
                    setUserGender(data.gender);
                    setUserRole(data.role);
                } else {
                    setAuth(false);
                }
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
