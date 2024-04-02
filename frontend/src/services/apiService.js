const BASE_URL = 'http://localhost:8000/api/v1';

async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function loginUser(userData) {
    const url = `${BASE_URL}/login`; // Assuming the endpoint for login is /login
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return await response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function fetchUserData() {
    const url = `${BASE_URL}/user`;
    return await fetchData(url, {credentials: 'include'});
}

export async function fetchStudents() {
    const url = `${BASE_URL}/students`;
    return await fetchData(url, {credentials: 'include'});
}

export async function createStudent(studentData) {
    const url = `${BASE_URL}/students`;
    return await fetchData(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(studentData)
    });
}

export async function fetchAdmins() {
    const url = `${BASE_URL}/admins`;
    return await fetchData(url, {credentials: 'include'});
}

export async function createAdmin(adminData) {
    const url = `${BASE_URL}/admins`;
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(adminData)
    });
}

export async function fetchTeachers() {
    const url = `${BASE_URL}/teachers`;
    return await fetchData(url, {credentials: 'include'});
}

export async function createTeacher(teacherData) {
    const url = `${BASE_URL}/teachers`;
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(teacherData)
    });
}

export async function registerTeacher(teacherData) {
    try {
        const response = await fetch(`${BASE_URL}/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(teacherData),
        });

        if (!response.ok) {
            throw new Error('Failed to create teacher');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw error;
    }
}

export async function deleteStudent(studentId) {
    const url = `${BASE_URL}/delete-student/${studentId}`;
    return await fetchData(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export async function deleteTeacher(userId) {
    const url = `${BASE_URL}/delete-teacher/${userId}`;
    return await fetchData(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export async function deleteAdmin(userId) {
    const url = `${BASE_URL}/delete-teacher/${userId}`;
    return await fetchData(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}

export async function fetchRoles() {
    try {
        const response = await fetch(`${BASE_URL}/roles`);
        if (!response.ok) {
            throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        if (!data.roles) {
            throw new Error('Roles data not found in response');
        }
        return data.roles;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
}

export async function fetchTitles() {
    const url = `${BASE_URL}/data/titles`;
    return await fetchData(url, {credentials: 'include'});
}

export async function fetchSuffixes() {
    const url = `${BASE_URL}/data/suffixes`;
    return await fetchData(url, {credentials: 'include'});
}

export async function fetchGenders() {
    const url = `${BASE_URL}/data/genders`;
    return await fetchData(url, {credentials: 'include'});
}

export async function fetchGrades() {
    const url = `${BASE_URL}/data/grades`;
    return await fetchData(url, {credentials: 'include'});
}

export async function logoutUser() {
    const url = `${BASE_URL}/logout`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}