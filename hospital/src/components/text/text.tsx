import { styled } from "styled-components";

interface Itext {
    color?: boolean;
    text?: string;
}

const PST = styled.p<Itext>`
    color: ${(props) => (props.color ? "#fff" : "#000")};
`;

export const Text: React.FC<Itext> = ({ color, text }) => {
    return <PST color={color}>{text}</PST>;
};

