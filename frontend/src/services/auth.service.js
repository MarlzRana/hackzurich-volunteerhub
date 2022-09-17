import Axios from "axios";

const API = "http://localhost:3001";
Axios.defaults.withCredentials = true;

export const register = (username, password) => {
    return Axios.post(`${API}/auth/register`, { username, password });
}

export const login = (username, password) => {
    return Axios.post(`${API}/auth/login`, { username, password });
}

export const logout = () => {
    return Axios.get(`${API}/auth/logout`);
}

export const isAuthenticated = () => {
    return Axios.get(`${API}/auth/isAuthenticated`)
    .catch(err => console.error(err));
}