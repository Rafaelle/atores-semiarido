import React from 'react'
import styled from 'styled-components'


const Legend = ({color, name}) => {

    return <Container>

        <LegendItem color={color}></LegendItem>
        <LegendText>{name}</LegendText>


    </Container>
}

export default Legend


const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 50px;
    padding: 2px 5px 2px 2px;
    transition: all .6s ease;
    margin: 2px 0;

`

const LegendItem = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({color}) => color ? color : "white"};
`
const LegendText = styled.div`
    color: #7a8a97;
    font-weight:400;
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    margin: 0 5px;
`

