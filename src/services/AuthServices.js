import httpCommon from "../http-common";

const login = (data) => {
    return httpCommon.post(`/auth/login`, data);
};

const signup = (data) => {
    return httpCommon.post(`/auth/signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

const userQuestionnaire = (data, token) => {
    return httpCommon.post('/user/questionnaire', {
        "responses": [
            ...data
        ]
    }, {
        "headers": {
            "Authorization": `Bearer ${token}`
        }
    })
}

const panVerify = (data, token) => {
    return httpCommon.post('/auth/verify', data, {
        "headers": {
            "Authorization": `Bearer ${token}`
        }
    })
}

const verifyOTP = (data, token) => {
    return httpCommon.put(`/auth/verify`, data, {
        "headers": {
            "Authorization": `Bearer ${token}`
        }
    })
}

export default {
    login,
    signup,
    userQuestionnaire, panVerify, verifyOTP
}