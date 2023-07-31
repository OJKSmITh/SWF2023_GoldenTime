import { BtnProps } from "@utils/interface/styled.interface"
import { styled } from "styled-components"

export const BtnWrap = styled.button<BtnProps>`
    border-radius: 0.5rem;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bg} !important;
    margin: ${(props) => props.margin};
    justify-content: center;
    align-items: center;
    border: none;
    background: none;
    color: ${(props) => props.color};
    font-size: ${(props) => props.height === "5rem" ? "1.6rem" : "1.4rem"};
    cursor: ${props =>props.disabled ? "" :"pointer"};
    
`

export const ColWrap = styled.div`
    width: 100%;
    height: 100%;
`
