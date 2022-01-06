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
            <div>
                <Option onClick={handleClick} value="teams">Teams</Option>
                <Option onClick={handleClick} value="cabins">Cabins</Option>
            </div>
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

`;

export default HomePage;