import axios from "axios";

 export const axiosInstances = axios.create({
    baseURL:import.meta.env.VITE_FIREBASE_DATABASE_URL + "todos",
})