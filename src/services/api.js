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

export const getInterestedUsersByOwner = async (token) => {
    try {
        const response = await axios.get(`${apiUrl}/property/interested-users/owner/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
        return response.data;

    } catch (err) {
        return err;
    }

}

export const tenantApproval = async (token, tenantId, propertyId, approved) => {
    try {
        const response = await axios.put(`${apiUrl}/user/approval/${propertyId}`, {
            tenantId,
            approved
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
        return response.data;

    } catch (err) {
        return err;
    }

}

