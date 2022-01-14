import React, { createContext, useEffect, useState } from "react";

export const CamperContext = createContext(null);

export const CamperProvider = ({ children }) => {

    const [ campers, setCampers ] = useState(false);
    const [ teams, setTeams ] = useState([]); 

    useEffect(() => {
        fetch('/campers')
        .then((res) => res.json())
        .then((data) => setCampers(data.data));
    },[])

    return (
        <CamperContext.Provider
            value={{
                campers,
                setCampers,
                teams,
                setTeams
            }}
        >
            { children }
        </CamperContext.Provider>
    )
};