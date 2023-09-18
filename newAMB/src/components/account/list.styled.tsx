import { styled } from "styled-components"

export const ListUl = styled.ul`
    margin-top: 4rem;
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    & > li {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    & > li > span {
        display: inline-block;
        font-size: 1.8rem;
        &:last-child {
            cursor: pointer;
        }
    }
    & > span {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        font-size: 1.2rem;
    }
`
