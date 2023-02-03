import httpCommon from "../http-common";

const getAllProperties = () => {
    return httpCommon.get(`/property/all`);
};

const getOneProperty = (id) => {
    return httpCommon.get(`/property/single/${id}`)
}

const getOnePropertywithCompatibility=(id,token)=>{
    return httpCommon.get(`/property/single/compatibility/${id}`,{
        "headers": {
            "Authorization": `Bearer ${token}`
        }
    })
}
const getPropertiesByCoOrd = (lat, lon) => {
    return httpCommon.get(`/property/close-by/${lat}/${lon}`)
}
export default {
    getAllProperties,
    getOneProperty,
    getOnePropertywithCompatibility,
    getPropertiesByCoOrd

}