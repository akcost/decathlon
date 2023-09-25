const BASE_URL = 'http://localhost:8080/api/results';

export const fetchResults = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addResult = async (result) => {
    try {

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        });


        if (!response.ok) {
            throw new Error('Failed to add result');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteResult = async (id) => {
    try {
        const apiUrl = `${BASE_URL}/${id}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete result');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
