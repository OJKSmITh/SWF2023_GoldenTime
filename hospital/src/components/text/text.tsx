import { styled } from "styled-components";

const PST = styled.p`
    color: ${(props) => (!props.color ? "#000000" : props.color ? "green" : "red")};
`;

interface Itext {
    color?: boolean;
    text: string;
}

export const Text: React.FC<Itext> = ({ color, text }) => {
    return <PST>{text}</PST>;
};

