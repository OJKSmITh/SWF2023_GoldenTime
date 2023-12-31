import { BtnProps } from "interface/styled.interface";
import { BtnST } from "./styled";

export const Btn = (props: BtnProps) => {
    return (
        <>
            <BtnST id={props.id} width={props.width} height={props.height} size={props.size} onClick={props.onclick} color={props.color}>
                {props.text}
            </BtnST>
        </>
    );
};

