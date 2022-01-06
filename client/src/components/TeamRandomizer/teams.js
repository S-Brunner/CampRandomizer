import React, { useContext, useState } from "react";
import styled from "styled-components";

import RandomizedTeams from "./randomizedTeams";

const Teams = () => {

    const [ teamSize, setTeamSize ] = useState(2);
    const [ isSubmited, setIsSubmited ] = useState(false)

    const handleChange = (e) => {
        const selection = Number(e.target.value);
        setTeamSize(selection);
        setIsSubmited(false)
    }

    const handleRandomize = (e) => {
        e.preventDefault();
        setIsSubmited(true)
    }

    return (
        <>
            <Container>
                <h2>Team Randomizer</h2>
                <RandomizerForm onSubmit={handleRandomize}>
                    <select onChange={handleChange}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <button type="Submit" >Randomize</button>
                </RandomizerForm>
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

const RandomizerForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 30%;
`;

const TeamListWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -5%;
`;

export default Teams;