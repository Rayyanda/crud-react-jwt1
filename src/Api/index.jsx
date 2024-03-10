import axios from "axios";

const token = localStorage.getItem("token");

const Api = axios.create({
    headers : {
        'Accept'  : 'application/json', 
        'Content-Type': 'application/json',
        'Authorization' :  `Bearer ${token}`
    },
    baseURL : "http://localhost:8000"
});

export default Api;