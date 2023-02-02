import axios from "axios";


export default axios.create({
    baseURL: "https://caramelcheese-popcorn-backend.up.railway.app/api",

    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    mode: "cors"
});