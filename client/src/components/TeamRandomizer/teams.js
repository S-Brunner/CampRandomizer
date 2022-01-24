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
                    <Input onChange={handleInput} placeholder="Enter Loadout Name"></Input>
                    <Button type="submit" className="SaveButton">Save Team</Button>
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

    @media ( max-width: 1100px) {
        flex-direction: row;
        align-items: center;
    }

    @media ( max-width: 400px) {
        width: 50%;
    }
`;

const Dropdown = styled.select`
    width: 20%;
    height: 30px;
    margin-bottom: -20px;
    text-align: center;
    align-self: center;

    @media ( max-width: 1100px) {
        margin-bottom: 0;
    }

    @media ( max-width: 500px ){
        width: 40%;
    }
`;

const Button = styled.button`
    width: 25%;
    height: 35px;
    align-self: center;

    @media ( max-width: 1100px) {
        width: 40%;
    }

    @media ( max-width: 640px ) {
        width: 50%;
    }

    @media ( max-width: 500px ){
        width: 75%;
    }

    @media ( max-width: 300px ){
        width: 90%;
    }

    &.SaveButton{
        width: 30%;
    }
`;

const SaveContainer = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    
    &.Hidden{
        display: none;
    }

    @media ( min-width: 1100px ){
        flex-direction: column;
    }

    @media ( min-width: 375px ){
        width: 50%;
    }
`;

const Input = styled.input`
    justify-self: center;
    height: 20px;

    @media ( min-width: 1100px ){
        margin-bottom: 20px;
        width: 50%;
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