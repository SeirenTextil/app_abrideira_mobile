import axios from "axios";

export const API = axios.create({
    baseURL: "http://10.16.0.13:5000/api/v1/"
})