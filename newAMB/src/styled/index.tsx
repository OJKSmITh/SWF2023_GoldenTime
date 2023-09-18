import { theme } from "colorTheme"
import styled from "styled-components"
import bg from "@img/bg.png"

export const FullWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    background-color: ${theme.bg};
    color: ${theme.text};
`
export const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${bg});
    background-size: 100% 50%;
    background-position: center;
    background-repeat: no-repeat;
`
