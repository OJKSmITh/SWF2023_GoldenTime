import styled from "styled-components"

export const NavBtn = styled.div`
    width: 90vw;
    height: 90vw;
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #7b7b7b;
    border-radius: 3rem;
    &:hover {
        cursor: pointer;
        background-color: #a0a0a0;
    }
`
export const NavImg = styled.img`
    width: 45%;
`
export const NavText = styled.div`
    font-size: 4rem;
    font-weight: 800;
    margin-top: 3rem;
`
