import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CabinContext } from "../../cabinContext";
import ViewGirlCabins from "./ViewGirlCabins";

const Girls = () => {

    const roomsSelected = [];
    const [ final, setFinal ] = useState(false);
    const [ submit,  setSubmit ] = useState(false);
    const [ names, setNames ] = useState(false);

    useEffect(() => {
        fetch('/campers')
        .then((res) => res.json())
        .then((data) => {
            setNames(data.data[0])
        })
    },[])

    const handleChange = (e) => {

        const roomSelected = e.target.value
        const roomNumber = roomSelected.slice(0,2);
        const numBeds = roomSelected.slice(3, 5);
        const selected = { roomNumber, numBeds }

        console.log(selected);

        if(e.target.checked){
            roomsSelected.push(selected)
        } else {
            roomsSelected.forEach((room, index) => {
                if( room.roomNumber === roomNumber){
                    room.splice(index)
                }
            })
        }

        console.log(roomsSelected);
    }

    const handleClick = (e) => {
        // setGirlRooms(props);
        e.preventDefault();
        setFinal(roomsSelected)
        setSubmit(true)
    }

    return(
        <Container>
            {
                submit ? <ViewGirlCabins rooms={final} submitted={submit} names={names} />
                :
                <>
                    <GoBack to="/cabins">Go Back</GoBack>
                    <p>Girl Cabins Available</p>
                    <Form>
                        <label for="G1">G1
                            <input id="G1" type="checkbox" value="G1 12" onChange={handleChange}></input>
                        </label>
                        
                        <label for="G2">G2
                            <input id="G2" type="checkbox" value="G2 8" onChange={handleChange}></input>                    
                        </label>
                    
                        <label for="G3">G3
                            <input id="G3" type="checkbox" value="G3 8" onChange={handleChange}></input>                    
                        </label>
                    
                        <label for="G4">G4
                            <input id="G4" type="checkbox" value="G4 14" onChange={handleChange}></input>                    
                        </label>
                    
                        <label for="G5">G5
                            <input id="G5" type="checkbox" value="G5 6" onChange={handleChange}></input>                    
                        </label>
                            
                        <label for="G6">G6
                            <input id="G6" type="checkbox" value="G6 4" onChange={handleChange}></input>
                        </label>
                    
                        <label for="G7">G7
                            <input id="G7" type="checkbox" value="G7 4" onChange={handleChange}></input>                    
                        </label>
                        
                        <label for="G8">G8
                            <input id="G8" type="checkbox" value="G8 6" onChange={handleChange}></input>
                        </label>
                        
                        <button onClick={handleClick}> Next </button>
                    </Form>
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    margin-top: 20px;
`;

const GoBack = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 30px;
    height: fit-content;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px;
`;

export default Girls;