import React from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";

const Cabins = () => {

    const history = useHistory();

    const handleClick = (e) => {
        const selection = e.target.value;

        history.push(`/create/cabins/${selection}`);
    }
    
    return(
        <Container>
            <GoBack to="/">Go Back</GoBack>
            <h1>Cabin Creator</h1>
            <ButtonContianer>
                <Girls onClick={handleClick} value="girls" >Girls</Girls>
                <Boys onClick={handleClick} value="boys" >Boys</Boys>
            </ButtonContianer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-top: -10%;
`;

const GoBack = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 30px;
    height: fit-content;
`;

const ButtonContianer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
`;

const Girls = styled.button`
    width: 100px;
    height: 30px;
`;

const Boys = styled.button`
    width: 100px;
    height: 30px;
`;

export default Cabins;