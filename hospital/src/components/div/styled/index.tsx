import { IKTASProps } from "interface/interface";
import { DivProps } from "interface/styled.interface";
import { styled } from "styled-components";

export const DivBasicST = styled.div<DivProps>`
    width: ${(props) => (props.width ? props.width : 5)}rem;
    height: ${(props) => (props.height ? props.height : 5)}rem;
    font-size: ${(props) => (props.size ? props.size : 1)}rem;
    display: ${(props) => (props.flex ? "flex" : "")};
    flex-direction: ${(props) => (props.direction ? props.direction : "")};
    justify-content: ${(props) => (props.justify ? "flex-start" : "")};
    align-items: ${(props) => (props.align ? "flex-start" : "")};
    margin: 0 auto;
    margin-top: 3rem;
    
`;

export const DivTextST = styled.div<DivProps>`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "auto")};
    font-size: ${(props) => (props.size ? props.size : "1rem")};
    display: ${(props) => (props.flex ? "flex" : "block")};
    flex-direction: ${(props) => (props.direction ? props.direction : "")};
    justify-content: ${(props) => (props.justify ? "center" : "")};
    align-items: ${(props) => (props.align ? "center" : "")};
    padding: 0.5rem; /* Adding padding for better spacing */
    border: 1px solid #ccc; /* Adding a border for better visibility */
    border-radius: 4px; /* Adding border-radius for rounded corners */
    margin: 0.5rem 0; /* Adding margin for spacing between elements */
`;

export const DivWrapST = styled.div<DivProps>`
    width: ${(props) => (props.width ? props.width : 5)}%;
    height: ${(props) => (props.height ? props.height : 5)}%;
    font-size: ${(props) => (props.size ? props.size : 1)}rem;
    display: ${(props) => (props.flex ? "flex" : "")};
    flex-direction: ${(props) => (props.direction ? props.direction : "")};
    justify-content: ${(props) => (props.justify ? "flex-start" : "")};
    align-items: ${(props) => (props.align ? "flex-start" : "")};
    margin-top: ${(props) => (props.right ? props.right : 0)}rem;
`;
export const DivContentWrapST = styled.div<DivProps>`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "auto")};
    font-size: ${(props) => (props.size ? props.size : "1rem")};
    display: ${(props) => (props.flex ? "flex" : "block")};
    flex-direction: ${(props) => (props.direction ? props.direction : "")};
    justify-content: ${(props) => (props.justify ? "space-between" : "center")};
    align-items: ${(props) => (props.align ? "center" : "")};
    margin-top: ${(props) => (props.right ? props.right : 0)}rem;
`;
export const Div = styled.div<IKTASProps>`
    width: 100%;
    padding: 1rem;
    height: auto;
    &:active{
        background-color: ${props =>props.KTAS === "KTAS 1단계" ? "#6b81ff;" : props.KTAS === "KTAS 2단계" ? "#ff7a7a;" : props.KTAS === "KTAS 3단계" ? "#f7c758;" : "#cdcdcd;"};
        border-radius: 2rem;
    }
`
export const Div2 = styled.div<IKTASProps>`
    width: 100%;
    height: auto;
    background-color: ${props => props.KTAS === "KTAS 1단계" ? "#6b81ff;" : props.KTAS === "KTAS 2단계" ? "#ff7a7a;" : props.KTAS === "KTAS 3단계" ? "#f7c758;" : "#cdcdcd;"};
    color : "#fff";
`
