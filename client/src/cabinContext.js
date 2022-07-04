import React, { createContext, useEffect, useState } from "react";

export const CabinContext = createContext(null);

export const CabinProvider = ({ children }) => {

    const [ boys, setBoys ] = useState(false);
    const [ girls, setGirls ] = useState(false);
    const [ girlRooms, setGirlRooms ] = useState(false);
    const [ boyRooms, setBoyRooms ] = useState(false);

    useEffect(() => {
        fetch('/campers')
        .then((res) => res.json())
        .then((data) => {
            setGirls(data.data[0])
            setBoys(data.data[1])
        })
    },[])

    return (
        <CabinContext.Provider
            value={{
                boys,
                girls,
                girlRooms,
                setGirlRooms,
                boyRooms,
                setBoyRooms
            }}
        >
            { children }
        </CabinContext.Provider>
    )
}