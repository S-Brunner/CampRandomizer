import React from "react";
import styled from "styled-components";

const Card = (props) => {

    const dragStart = (e) => {
        const target = e.target;
        
        e.dataTransfer.setData('card_id', target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }

    const dragOver = (e) => {
        e.stopPropagation();
    }

    return (
        <Container
            id={props.id}
            onDragStart={dragStart}
            onDragOver={dragOver}
            draggable="true"
        >
            { props.children }
        </Container>
    )
}

const Container = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    background: lightgrey;
    padding: 10px 5px 10px 5px;
    border-bottom: 2px solid black;
    border-top: 2px solid black;

    &:hover{
        cursor: pointer;
    }
`;
export default Card;