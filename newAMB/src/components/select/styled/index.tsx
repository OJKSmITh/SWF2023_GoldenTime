import { styled } from "styled-components"
import arrow from "@img/arrow.png"
import Darrow from "@img/DArrow.png"

export const SeelctWrap = styled.select`
    width: 100%;
    height: 5rem;
    background-color: #545454;
    border-radius: 0.5rem;
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    padding: 0 1rem;
    appearance: none;
    background-image: url(${Darrow});
    background-repeat: no-repeat;
    background-position: 98% 50%;
    background-size: 3.5rem;
`

export const TextArea = styled.textarea`
    width: 100%;
    padding: 1rem;
    height: 20rem;
    background-color: #545454;
    border: none;
    resize: none;
    border: solid 0.1rem #00000030;
    border-radius: 0.5rem;
    color: #ffffff;
    font-size: 1.6rem;
    overflow-y: scroll;
`

export const MatchFormST = styled.form`
    width: 90%;

    & > div {
        margin-top: 1rem;
    }
`
