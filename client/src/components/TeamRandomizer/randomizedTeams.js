import React, { useContext, useState } from "react";
import styled from "styled-components";

import { CamperContext } from "../../campersContext" 

const RandomizedTeams = (props) => {

    const { campers, teams } = useContext(CamperContext)
    const [ newTeams, setNewTeams ] = useState(false);
    const [ newList, setNewList ] = useState([]);

    let camperList = []

    campers && campers.map((camper) => {
        camper.names.map((name) => {
            camperList.push(name)
        })
    })

    const CAMPERS = camperList.length;

    // for( let count = 0; count < props.amountOfTeams; count ++){
    //     let team = {
    //         teamNumber: count, 
    //         teamList: [],
    //         numberPerTeam: count,
    //     }
    //     if(teams.length < props.amountOfTeams){
    //         teams.push(team);
    //     }
    // }

    // const smallestTeam = () => {
    //     return teams.reduce((previousTeam, currentTeam) => {
    //         console.log(previousTeam, currentTeam);
    //     })
    // }

    // smallestTeam();


    // const numberberOfTeamsSelected = props.amountOfTeams;
    
    // const totalCampers = camperList.length

    // if( props.isSubmited ){
    //     for( let numberOfTeams = 1; numberOfTeams <= numberberOfTeamsSelected ; numberOfTeams++ ){
    //         let team = { teamNumber: numberOfTeams, teamList: [] };
    //         if( teams.length < props.amountOfTeams ){
    //             teams.push(team);
    //         }
    //     }

    //     for( let count = 0; count < totalCampers ; count ++ ){
    //         // for( let teamIndex = 0; teamIndex < props.amountOfTeams; teamIndex++ ){
    //         //     let remainingCampers = camperList;
    //         //     let randomCamper = Math.floor( Math.random() * remainingCampers);

    //         //     let camperIndex = camperList.splice(randomCamper, 1);
    //         //     teams[teamIndex].teamList.push(camperIndex[0]);
    //         // }
    //         teams.forEach(team => {
    //             let randomCamper = Math.floor( Math.random() * camperList.length);
    //             let selectedCamper = camperList[randomCamper];
    //             camperList.splice(randomCamper, 1);
    //             team.teamList.push(selectedCamper)
    //         })
    //     }
    // }
    
    const numberPerTeam = Math.floor(camperList.length / props.amountOfTeams);

    if( props.isSubmited ) {
        for( let numberOfTeams = 1 ; numberOfTeams <= props.amountOfTeams; numberOfTeams ++  ){

            // let teamList = []
    
            // for ( let numberOfSpots = numberPerTeam ; numberOfSpots !== 0 ; numberOfSpots -- ){
            //     let index = Math.round(Math.random() * camperList.length)
    
            //     let camperName = camperList.splice(index, 1);
    
            //     if(camperName.length === 0){
            //         numberOfSpots ++
            //     } else {
            //         teamList.push(camperName[0]);
            //     }
            // }

            let team = {
                teamNumber : numberOfTeams,
                teamList: [],
                teamSize: numberPerTeam,
            }
            if(teams.length < props.amountOfTeams){
                teams.push(team)
            }
        }

        if(teams.length === props.amountOfTeams) {

            for( let index = 0; index < teams.length; index++){
                for( let count = teams[index].numberPerTeam; count < teams[index].teamSize ; count ++){
                    let index = Math.round(Math.random() * camperList.length)
                    let camperName = camperList.splice(index, 1);
                    
                    if( teams[index].teamList.length > teams[index].numberPerTeam ){
                        console.log("heloo");
                        break
                    } else {
                        teams[index].teamList.push(camperName[0]);
                    }
                }
            }
            
            console.log(camperList);
            console.log(teams);

            for ( let count = 0; count < props.amountOfTeams; count++) {
                let total = 0;
                teams.forEach((team) => {
                    total += team.teamSize;
                })
                if( total !== CAMPERS){
                    teams[count].teamSize ++;
                } else {
                    break;
                }
            }
        }

            // const addSpace = () => {
            //     teams.forEach((team) => {
            //         team.teamSize ++;
            //     })
            // }

            // console.log(CAMPERS);

            // let totalSpacesUsed = 0;
            // teams.forEach((team) => {
            //     totalSpacesUsed += team.teamSize
            // });
            // if( totalSpacesUsed <= CAMPERS){
            //     addSpace();
            // }
        
    }
    //     let indexOfLastTeam = props.amountOfTeams - 1;
    //     if(teams.length === props.amountOfTeams){
    //         if(teams[indexOfLastTeam].teamList.length === numberPerTeam){
    //             let teamLessCampers = [];
    //             camperList.forEach((camper) => {
    //                 let leftoverCampers = [camper]
    //                 teamLessCampers.push(leftoverCampers[0]);
    //             })

    //             let tl = [];

    //             for( let numCampersLeft = 0; numCampersLeft < camperList.length ; numCampersLeft ++){
    //                 let list = teams[numCampersLeft].teamList.concat(teamLessCampers[numCampersLeft]);
    //                 let before = numCampersLeft - 1
    //                 let name = list[0].name;
    //                 let tlBefore = tl[before];
    //                 if(tl[before] !== undefined){
    //                     console.log(tlBefore);
    //                 }
    //                 console.log(name);
                    
    //                 if(tl.length !== 1){
    //                     // if(tl[before].name.includes(name)){
    //                     //     console.log("same name");
    //                     // }
    //                 }
    //                 tl.push(...tl, list)
    //                 console.log(tl);
    //             }
    //         }
    //     }
    // }

    return (
        <>
            {props.isSubmited &&
                <TeamList>
                    {teams.map((team) => {
                        return (
                            <TeamContainer key={team.teamNumber}>
                                    <h2>Team: {team.teamNumber}</h2>
                                    {team.teamList.map((name) => {
                                        return(
                                            <Name key={name.name}>{name.name} Age: {name.age}</Name>
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