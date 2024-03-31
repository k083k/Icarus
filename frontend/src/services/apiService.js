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

export async function fetchStudents() {
    const url = `${BASE_URL}/students`;
    return await fetchData(url, { credentials: 'include' });
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
