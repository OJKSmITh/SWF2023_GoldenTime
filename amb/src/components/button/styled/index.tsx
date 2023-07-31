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
`

export const MainBtnWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    margin-top: 2rem;
`
