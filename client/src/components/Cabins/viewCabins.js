import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { CamperContext } from "../../campersContext";
import Board from "./Board";
import Card from "./Card";

const ViewCabins = ( props ) => {

    const { campers } = useContext(CamperContext);
    const [ ageRanges, setAgeRanges ] = useState([]);
    const amountOfRooms = props.rooms.length;
    let cabinList = [];
    let gender = 0;

    if( props.gender === "boys"){
        gender++
    }

    if(campers){
        console.log("got data");
        cabinList.push(campers[gender].names);   
    } else {
        console.log("waiting for data")
    }

    useEffect(() =>{
        if(amountOfRooms === 2){
            setAgeRanges([
                { cabinNumber: 1, minAge: 8, maxAge: 12, list: []}, 
                { cabinNumber: 2, minAge: 13, maxAge: 18, list: []}
            ])
        } else if ( amountOfRooms === 3 ){
            setAgeRanges([
                { cabinNumber: 1, minAge: 8, maxAge: 11, list: []}, 
                { cabinNumber: 2, minAge: 12, maxAge: 15, list: []},
                { cabinNumber: 3, minAge: 16, maxAge: 18, list: []}
            ])
        } else if ( amountOfRooms === 4 ){
            setAgeRanges([
                { cabinNumber: 1, minAge: 8, maxAge: 10, list: []}, 
                { cabinNumber: 2, minAge: 11, maxAge: 13, list: []},
                { cabinNumber: 3, minAge: 14, maxAge: 16, list: []},
                { cabinNumber: 4, minAge: 17, maxAge: 18, list: []}
            ])
        } else if ( amountOfRooms === 5 ){
            setAgeRanges([
                { cabinNumber: 1, minAge: 8, maxAge: 10, list: []}, 
                { cabinNumber: 2, minAge: 11, maxAge: 12, list: []},
                { cabinNumber: 3, minAge: 13, maxAge: 14, list: []},
                { cabinNumber: 4, minAge: 15, maxAge: 16, list: []},
                { cabinNumber: 5, minAge: 17, maxAge: 18, list: []}
            ])
        } else if ( amountOfRooms === 6 ){
            setAgeRanges([
                { cabinNumber: 1, minAge: 8, maxAge: 9, list: []}, 
                { cabinNumber: 2, minAge: 10, maxAge: 11, list: []},
                { cabinNumber: 3, minAge: 12, maxAge: 13, list: []},
                { cabinNumber: 4, minAge: 14, maxAge: 15, list: []},
                { cabinNumber: 5, minAge: 16, maxAge: 17, list: []},
                { cabinNumber: 6, minAge: 18, maxAge: 18, list: []}
            ])
        } else if ( amountOfRooms === 7){
            setAgeRanges([
                { cabinNumber: 1, minAge: 8, maxAge: 9, list: []}, 
                { cabinNumber: 2, minAge: 10, maxAge: 11, list: []},
                { cabinNumber: 3, minAge: 12, maxAge: 13, list: []},
                { cabinNumber: 4, minAge: 14, maxAge: 15, list: []},
                { cabinNumber: 5, minAge: 16, maxAge: 16, list: []},
                { cabinNumber: 6, minAge: 17, maxAge: 17, list: []},
                { cabinNumber: 7, minAge: 18, maxAge: 18, list: []}
            ])
        } else if( amountOfRooms === 8 ){
            setAgeRanges([
                { cabinNumber: 1, minAge: 8, maxAge: 9, list: []}, 
                { cabinNumber: 2, minAge: 10, maxAge: 11, list: []},
                { cabinNumber: 3, minAge: 12, maxAge: 13, list: []},
                { cabinNumber: 4, minAge: 14, maxAge: 14, list: []},
                { cabinNumber: 5, minAge: 15, maxAge: 15, list: []},
                { cabinNumber: 6, minAge: 16, maxAge: 16, list: []},
                { cabinNumber: 7, minAge: 17, maxAge: 17, list: []},
                { cabinNumber: 8, minAge: 18, maxAge: 18, list: []}
            ])
        }
    },[])

    if(cabinList.length !== 0){
        for( let count = 0; count < ageRanges.length; count++){
    
            let biggestAge = ageRanges[count].maxAge;
            let smallestAge = ageRanges[count].minAge;
    
            console.log(cabinList);

            cabinList[0].forEach((kid, index) => {
                if(kid.age <= biggestAge && kid.age >= smallestAge){
                    ageRanges[count].list.push(kid);
    
                    cabinList[0].splice(index, 1);
                }
            });
        }
    } else {
        console.log("waiting cabin list");
    }

    const handleSave = (e) => {

        for( let count = 0; count < amountOfRooms; count ++ ){

            const board = document.getElementById(`${count}`)
            const camperOrder = board.getElementsByTagName('div')

            let savedList = [];

            for( let count = 0; count < camperOrder.length; count++){
                const camper = camperOrder[count].innerHTML

                const comma = camper.indexOf( "," )
                const space = camper.indexOf( "Age: " )
                
                const name = camper.slice( 5, comma )
                const age = camper.slice( space + 5 )
                const cabinNumber = 

                

                console.log(age);
            }

            const cabin = { cabin: props.rooms[count].roomNumber, savedList : [] }
        }
    }

    return(
        <Container>
            <h1>{props.gender}</h1>
                <RoomOuterContainer>
                    { ageRanges.map((room, index) => {
                        return (
                            <InnerContainer>
                                <CabinNumber>Cabin {props.rooms[index].roomNumber}</CabinNumber>
                                <Board className="board" id={index} ageRanges={ageRanges} roomNumber={props.rooms[index].roomNumber}>
                                    {room.list.map((kid, index) => {
                                        return(
                                            <Card id={kid.name} index={index}>
                                                Name: {kid.name}, Age: {kid.age} 
                                            </Card>
                                        )
                                    })}
                                </Board>
                                <CabinBeds>Total Beds {props.rooms[index].numBeds}</CabinBeds>
                            </InnerContainer>
                        )
                    })}
                    <button onClick={handleSave}>Save</button>
                </RoomOuterContainer>
        </Container>
    )
} 

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const RoomOuterContainer = styled.div`
    display: flex;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 200px;
`;

const CabinNumber = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const CabinBeds = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
`;

export default ViewCabins;