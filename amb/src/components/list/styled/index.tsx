import { styled } from "styled-components"

export const ListWrap = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    font-size: 2rem;
    &:not(:last-child) {
        margin-bottom: 3rem;
    }
`

export const FirstSection = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

