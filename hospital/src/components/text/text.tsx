import { styled } from "styled-components";

const PST = styled.p`
    color: ${(props) => (props.color ? "#000000" : props.color ? "green" : "red")};
`;

export const Text = () => {
    // return <P></P>;
};

