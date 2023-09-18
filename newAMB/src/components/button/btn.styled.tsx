import { BtnProps } from "@utils/interface/styled.interface"
import styled from "styled-components"

export const Button = styled.button<BtnProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bg};
    color: ${(props) => (props.color ? props.color : "black")};
    margin: ${(props) => (props.margin ? props.margin : "0")};
    border: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.hover};
    }
`
