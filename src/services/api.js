const axios = require('axios');

const apiUrl = "https://caramelcheese-popcorn-backend.up.railway.app/api"

export const getMyProperties = async (token) => {
    try {
        const response = await axios.get(`${apiUrl}/property/my`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
        return response.data;

    } catch (err) {
        return err;
    }
}