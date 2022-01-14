import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CamperContext } from "../../campersContext";
import { NavLink } from "react-router-dom";

import RandomizedTeams from "./randomizedTeams";

const Teams = () => {

    const { teams, setTeams } = useContext(CamperContext)
    const [ teamSize, setTeamSize ] = useState(2);
    const [ isSubmited, setIsSubmited ] = useState(false)
    const [ teamName, setTeamName ] = useState("");
    const [ response, setResponse ] = useState(false);

    const handleChange = (e) => {
        const selection = Number(e.target.value);
        setTeamSize(selection);
        setIsSubmited(false)
        setTeams([])
        setResponse(false)
    }

    const handleRandomize = (e) => {
        e.preventDefault();
        setIsSubmited(true)
    }

    const handleSaveTeams = (e) => {
        e.preventDefault();
        fetch("/teams/save", {
            method: "POST",
            body: JSON.stringify({
                _id: teamName,
                teamInfo: teams
            }),
            headers: {
                "Content-Type" : "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setResponse(data);
        })
    }

    const handleInput = (e) => {
        e.preventDefault();
        setTeamName(e.target.value);
    }

    return (
        <>
            <Container>
                <H2 to="/">Team Randomizer</H2>
                <RandomizerForm onSubmit={handleRandomize}>
                    <Dropdown onChange={handleChange}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Dropdown>
                    <Button type="submit" >Randomize</Button>
                </RandomizerForm>
                <SaveContainer onSubmit={handleSaveTeams} className={!isSubmited && "Hidden"}>
                    <Button type="submit" className="SaveButton">Save Team</Button>
                    <input onChange={handleInput} placeholder="Enter Loadout Name"></input>
                </SaveContainer>
                <>
                    {response && 
                        <ResponseContainer className={ response.status === 400 ? "error" : "saved"}>
                            <div>
                                <p>{response.message}</p>
                            </div>
                        </ResponseContainer>
                    }
                </>
            </Container>
            <TeamListWrapper>
                <RandomizedTeams amountOfTeams={teamSize} isSubmited={isSubmited}/>
            </TeamListWrapper>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;

const H2 = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-size: 35px;
    font-weight: bold;
`;

const RandomizerForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 30%;
    width: 30%;
`;

const Dropdown = styled.select`
    width: 20%;
    height: 30px;
    margin-bottom: -20px;
    text-align: center;
    align-self: center;
`;

const Button = styled.button`
    width: 25%;
    height: 35px;
    align-self: center;

    &.SaveButton{
        width: 30%;
    }
`;

const SaveContainer = styled.form`
    display: flex;
    justify-content: space-between;
    width: 20%;
    align-self: center;
    
    &.Hidden{
        display: none;
    }
`;

const ResponseContainer = styled.div`
    display: none;
    
    &.error{
        display: flex;
        padding: 10px;
        margin-top: 20px;
        border: 2px solid red;
        border-radius: 10px;
    }
    &.saved{
        display: flex;
        padding: 10px;
        margin-top: 20px;
        border: 2px solid green;
        border-radius: 10px;
    }
`;

const TeamListWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -5%;
`;

export default Teams;