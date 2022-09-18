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

export const saveOrganisationImage = (formData) => {
    return Axios.post(`${API}/file/upload`, formData, {headers: { "Content-Type": "multipart/form-data" }});
}

export const getOrganisationName = () => {
    return Axios.get(`${API}/organisation/name`);
}

export const getOrganisationBio = () => {
    return Axios.get(`${API}/organisation/bio`);
}

export const getOrganisationTags = () => {
    return Axios.get(`${API}/organisation/tags`);
}

export const getOrganisationLocations = () => {
    return Axios.get(`${API}/organisation/location`);
}

export const getAccountType = () => {
    return Axios.get(`${API}/auth/accountType`);
}

// export const getOrganisationImage = (formData) => {
//     return Axios.post(`${API}/file/upload`, formData, {headers: { "Content-Type": "multipart/form-data" }});
// }

export const getImage = (fileId) => {
    return Axios.get(`${API}/file/get/${fileId}`)
    .then(res => {
        console.log(res.data);
    });
}

export const saveVolunteerBio = (bio) => {
    return Axios.post(`${API}/volunteer/bio`, { bio });
}

export const saveVolunteerTags = (tags) => {
    return Axios.post(`${API}/volunteer/tags`, { tags });
}

export const saveVolunteerSocials = (socials) => {
    return Axios.post(`${API}/volunteer/socialLinks`, { socialLinks: socials });
}

export const saveVolunteerLocation = (location) => {
    return Axios.post(`${API}/volunteer/location`, { location });
}

export const getVolunteerBio = () => {
    return Axios.get(`${API}/volunteer/bio`);
}

export const getVolunteerTags = () => {
    return Axios.get(`${API}/volunteer/tags`);
}

export const getVolunteerSocials = () => {
    return Axios.get(`${API}/volunteer/socialLinks`);
}

export const getVolunteerLocation = () => {
    return Axios.get(`${API}/volunteer/location`);
}

export const createNewUpdate = (type, title, description) => {
    return Axios.post(`${API}/organisation/update`, { type, title, description });
}

export const getUpdates = () => {
    return Axios.get(`${API}/organisation/myUpdates`);
}