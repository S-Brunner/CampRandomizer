import React, { useContext } from "react";
import styled from "styled-components";

import { CamperContext } from "../../campersContext" 

const RandomizedTeams = (props) => {

    const { campers } = useContext(CamperContext)

    let camperList = []

    campers && campers.map((camper) => {
        camper.names.map((name) => {
            camperList.push(name.name)
        })
    })

    const numberPerTeam = Math.floor(camperList.length / props.amountOfTeams);

    const teams = [];

    if( props.isSubmited ) {
        for( let numberOfTeams = 1 ; numberOfTeams <= props.amountOfTeams; numberOfTeams ++  ){

            let teamList = []
    
            for ( let numberOfSpots = numberPerTeam ; numberOfSpots !== 0 ; numberOfSpots -- ){
                let index = Math.round(Math.random() * camperList.length)
    
                let camperName = camperList.splice(index, 1).toString();
    
                if(camperName.length === 0){
                    numberOfSpots ++
                } else {
                    teamList.push(camperName);
                }
            }
            let team = {
                teamNumber : numberOfTeams,
                teamList
            }
            teams.push(team)
        }
        if( camperList.length !== 0 ){
            for( let campersLeft = camperList.length; campersLeft !== 0 ; campersLeft -- ){
                teams[campersLeft].teamList.push(camperList[campersLeft - 1]);
            }
        }
    }


    console.log(teams, camperList);

    return (
        <>
            {props.isSubmited &&
                <TeamList>
                    {teams.map((team) => {
                        return (
                            <TeamContainer>
                                    <h2>Team: {team.teamNumber}</h2>
                                    {team.teamList.map((name) => {
                                        return(
                                            <Name>{name}</Name>
                                        )
                                    })}
                            </TeamContainer>
                        )
                    })}
                </TeamList>
            }
        </>
    )
}

const TeamList = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

const TeamContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;
    margin: 20px;
    padding: 5px;
`;

const Name = styled.div`
    padding: 2px;
`;


export default RandomizedTeams;