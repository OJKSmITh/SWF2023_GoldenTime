import styled from "styled-components"

export const HeaderWrap = styled.header<{ bg?: string }>`
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.bg ? props.bg : "#7b7b7b7d")};
    position: fixed;
    top: 0;
    z-index: 10;
`
export const HeaderArrow = styled.img`
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
`
export const HeaderText = styled.div`
    font-size: 2rem;
    font-weight: 800;
`
