import Axios from "axios";

const API = "https://volunteer-hub-api.azurewebsites.net";
// Axios.defaults.withCredentials = true;

export const register = (username, password) => {
    return Axios.post(`${API}/auth/register`, { username, password }, {withCredentials: true});
}

export const isAuthenticated = () => {
    return Axios.get(`${API}/auth/isAuthenticated`, {withCredentials: true})
    .catch(err => console.error(err));
}