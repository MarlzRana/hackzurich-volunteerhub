import Update from "./Update";
import axios from "axios";
import { useState, useEffect } from "react";

const Updates = () => {
    const [updates, setUpdates] = useState([]);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        const setUpdate = async () => {
            const res = await axios.get("http://localhost:3001/public/updates");
            const updatesWithOrgName = await Promise.all(res.data.map(async (elem) => {
                const orgInfo = await axios.get("http://localhost:3001/public/orgInfo/" + elem.orgUsername)
                return {...elem, orgName: orgInfo.data.associatedInfo.name}
            }))
            setUpdates(updatesWithOrgName);
        }
        setUpdate()
    },[])

    return (
        <div>
            {updates.map((elem, idx) => <Update key={idx} type={elem.type[0].toUpperCase() + elem.type.slice(1,)} orgUsername={elem.orgUsername} orgName={elem.orgName} title={elem.title} description={elem.description}/>)}
        </div>
    );
}

export default Updates; 