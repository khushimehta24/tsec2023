import httpCommon from "../http-common";

const login = (data) => {
    return httpCommon.post(`/auth/login`, data);
};

const signup = (data) => {
    return httpCommon.post(`/auth/signup`, data);
};

export default {
    login,
    signup
}