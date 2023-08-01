import { BtnProps } from "interface/styled.interface";
import { styled } from "styled-components";

export const BtnST = styled.button<BtnProps>`
    width: ${(props) => (props.width ? props.width : 1.5)}rem;
    height: ${(props) => (props.height ? props.height : 1.5)}rem;
    font-size: ${(props) => (props.size ? props.size : 1)}rem;
    background-color: ${(props) => (props.color ? props.color : "#fff")};
    color: #fff;
    border: 0.2rem solid #999999;
    cursor: pointer;
`;

