import httpCommon from "../http-common";
import httpLocal from "../http-local";

const predict = (data) => {
    return httpLocal.post(`/model/predict/`, data);
};

const registerProperty = (data, token) => {
    return httpCommon.post(`/property/add`, data, {
        "headers": {
            "Authorization": `Bearer ${token}`
        }
    });
}

export default {
    predict, registerProperty
}