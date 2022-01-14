import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ViewTeams = () => {

    const [ allTeams, setAllTeams ] = useState(false);
    const [ selection, setSelection ] = useState("");

    useEffect(() => {
        fetch("/teams")
        .then((res) => res.json())
        .then((data) => setAllTeams(data.data));
    },[])

    const handleSelection = (e) => {
        e.preventDefault();
        setSelection(e.target.value);
    }

    const handleDelete = () => {
        
    }

    return (
        <>
            {
                allTeams &&
                <>
                    <Container>
                        <H2 to="/">Go Back  </H2>
                        <h3>All Teams Created</h3>
                        <Wrapper>
                            {allTeams.map((team) => {
                                return(
                                    <Team value={team._id} onClick={handleSelection}>{team._id}</Team>
                                )
                            })}-
                        </Wrapper>
                        
                    </Container>
                    <TeamList>
                        {allTeams.map((team) => {
                            return(
                                <TeamContainer className={ selection === team._id ? "chosen" : "" }>
                                    {team.teamInfo.map((info) => {
                                        return(
                                            <InnerWrapper>
                                                <h2>Team: {info.teamNumber}</h2>
                                                {info.teamList.map((camper) => {
                                                    return (
                                                        <Name>{camper.name} Age: {camper.age}</Name>
                                                    )
                                                })}
                                            </InnerWrapper>
                                        )
                                    })}
                                </TeamContainer>
                            )
                        })}
                        <DeleteButton onClick={handleDelete}>Delete Team</DeleteButton>
                    </TeamList>
                </>
            }
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
`;

const H2 = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-size: 35px;
    font-weight: bold;
`;

const Wrapper = styled.div`
    display: flex;
    width: 90%;
`;

const Team = styled.button`
    padding: 10px;
    margin: 10px;
    cursor: pointer;
`;

const DeleteButton = styled.button`
    width: 100px;
    height: 35px;
`;

const TeamList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
`;

const TeamContainer = styled.div`
    display: none;
    &.chosen{
        display: flex;
        justify-content: center;
        width: 100%;
    }
`;

const InnerWrapper = styled.div`
    border: 2px solid black;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const Name = styled.div`
    padding: 2px;
`;

export default ViewTeams;