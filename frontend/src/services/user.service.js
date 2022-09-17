import Axios from "axios";

const API = "http://localhost:3001";
Axios.defaults.withCredentials = true;

export const saveOrganisationName = (name) => {
    return Axios.post(`${API}/organisation/name`, { name });
}

export const saveOrganisationBio = (bio) => {
    return Axios.post(`${API}/organisation/bio`, { bio });
}

export const saveOrganisationTags = (tags) => {
    return Axios.post(`${API}/organisation/tags`, { tags });
}

export const saveOrganisationLocations = (locations) => {
    return Axios.post(`${API}/organisation/location`, { location: locations });
}