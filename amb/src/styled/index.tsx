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
        opacity : 0.4;
        z-index: -1;
        background-image: url(${bg});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    
`

