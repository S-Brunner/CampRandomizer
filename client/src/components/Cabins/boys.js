import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CabinContext } from "../../cabinContext";

const Boys = () => {

    const { setRooms } = useContext(CabinContext)
    const gender = "Boys";
    const roomsSelected = [];
    
        const handleChange = (e) => {

            const roomSelected = e.target.value
            const roomNumber = roomSelected.slice(0,2);
            const numBeds = roomSelected.slice(3, 5);
            const selected = { roomNumber, numBeds }

            console.log(roomSelected);
            if(e.target.checked){
                roomsSelected.push(selected)
            } else {
                roomsSelected.forEach((room, index) => {
                    if( room.roomNumber === roomNumber){
                        room.splice(index)
                    }
                })
            }
        }

        const handleClick = () => {
            setRooms(roomsSelected);
        }

        
        return(
            <Container>
                <GoBack to="/cabins">Go Back</GoBack>
                <p>Boys Cabins Available</p>
                <Form>
                    <label for="B1">B1
                        <input id="G1" type="checkbox" value="B1 6" onChange={handleChange}></input>
                    </label>
                    
                    <label for="B2">B2
                        <input id="B2" type="checkbox" value="B2 10" onChange={handleChange}></input>                    
                    </label>
                
                    <label for="B3">B3
                        <input id="B3" type="checkbox" value="B3 10" onChange={handleChange}></input>                    
                    </label>
                
                    <label for="B4">B4
                        <input id="B4" type="checkbox" value="B4 10" onChange={handleChange}></input>                    
                    </label>
                
                    <label for="B5">B5
                        <input id="B5" type="checkbox" value="B5 12" onChange={handleChange}></input>                    
                    </label>
                        
                    <label for="B6">B6
                        <input id="B6" type="checkbox" value="B6 6" onChange={handleChange}></input>
                    </label>

                    <NavLink to={`/finalize/cabins/${gender}`} onClick={handleClick} >Next</NavLink>
                </Form>
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

export default Boys;