import { styled } from "styled-components";

export const TransferWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    & > input {
        width: 100%;
        height: 5rem;
        font-size: 1.5rem;
    }
    & > div, button  {
        margin-top: 3rem;
    }
`