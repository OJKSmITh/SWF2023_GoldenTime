import { styled } from "styled-components"
import bg from "@img/bg.png"
export const FullWrap = styled.div`
    width: 36rem;
    width: 100vw;
    height: 74rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 2rem;
    &::after{
        content : "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity : 0.2;
        z-index: -1;
        background-image: url(${bg});
        background-size: 95%;
        background-repeat: no-repeat;
        background-position: center;
    }
`

export const Wrap = styled.div`
    width: 100%;
    height: auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 1rem;
    border: 0.1rem solid #b5b5b5;
`
