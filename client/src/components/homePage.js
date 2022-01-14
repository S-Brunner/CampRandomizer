import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HomePage = () => {

    let history  = useHistory();
    
    const handleClick = (e) => {
        const option = e.target.value;
        history.push(`/${option}`)
    }


    return (
        <Container>
            <h1>Choose An Option</h1>
            <OptionContainer>
                <Option onClick={handleClick} value="teams">Teams</Option>
                <Option onClick={handleClick} value="cabins">Cabins</Option>
                <Option onClick={handleClick} value="view-teams">View Teams</Option>
            </OptionContainer>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;

const Option = styled.button`
    max-width: 100px;
    height: 35px;
`;

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 20%;
`;

export default HomePage;