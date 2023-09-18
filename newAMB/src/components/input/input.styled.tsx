import { styled } from "styled-components"

export const Input = styled.input`
    text-align: center;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 1px solid #000;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    color: #f8f8f8;
    font-size: 2rem;
`
export const InputLabel = styled.div`
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`
