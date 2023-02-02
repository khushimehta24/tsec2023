import httpCommon from "../http-common";

const getAllProperties = () => {
    return httpCommon.get(`/property/all`);
};

const getOneProperty=(id)=>{
    return httpCommon.get(`/property/single/${id}`)
}

export default {
    getAllProperties,
    getOneProperty
}