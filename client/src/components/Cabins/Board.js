import React, { useEffect } from "react";
import styled from "styled-components";
import { CamperProvider } from "../../campersContext";

const Board = (props) => {

    const roomsList = [];

    for( let count = 0; count < props.ageRanges.length; count ++ ){
        roomsList.push(props.ageRanges[count]);
    }   

    const drop = (e) => {
        e.preventDefault();

        const card_id = e.dataTransfer.getData('card_id');

        const card = document.getElementById(card_id);

        const board = document.getElementById(e.target.id);

        card.style.display = 'block';
        
        e.target.appendChild(card);
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    return (
        <Container
            id={props.id}
            onDrop={drop}
            onDragOver={dragOver}
        >
            { props.children }
        </Container>
    )
}

const Container = styled.div`
    border: 2px solid black;
    border-radius: 15px;
    margin-left: 25px;
    width: 500px;
    min-height: 100px;
    padding-bottom: 35px;
`;

export default Board;