import httpCommon from "../http-common";

const getAllProperties = () => {
    return httpCommon.get(`/property/all`);
};

const getOneProperty=(id)=>{
    return httpCommon.get(`/property/single/${id}`)
}

const getOnePropertywithCompatibility=(id,token)=>{
    return httpCommon.get(`/property/single/compatibility/${id}`,{
        "headers": {
            "Authorization": `Bearer ${token}`
        }
    })
}
export default {
    getAllProperties,
    getOneProperty,
    getOnePropertywithCompatibility
}