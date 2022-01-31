import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Cabins = () => {
    return(
        <Container>
            <H1>Cabin Creator</H1>
            <GoBack to="/">Go Back</GoBack>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
    height: 100vh;
`;

const GoBack = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 30px;
`;

const H1 = styled.h1`
`;

export default Cabins;