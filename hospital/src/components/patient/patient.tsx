import { Btn } from "@components/button/button";
import { useState } from "react";
import { styled } from "styled-components";

const WrapST = styled.div`
    width: 100%;
    height: 10rem;
    margin-bottom: 2rem;
    border-radius: 2rem;
`;

const DivWrapST = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    box-sizing: border-box;
`;

const DivST = styled.div`
    height: 4rem;
    font-size: 2.2rem;
    display: flex;
    justify-content: center;    
    align-items: center;        
    box-sizing: border-box;
`;

const StateDivST = styled.div`
    width: 100%;
    height: 100%;
    font-size: 2.5rem;
    padding: 0 0.5rem  ;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonsST = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

interface Patient {
    KTAS: string | number;
    age: string | number;
    gender: string | number;
    state: string;
    tokenId: number;
    tokenBool: boolean | null;
    accept: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
    reject: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
}

export const Patient: React.FC<Patient> = (props) => {
    const [status, setStatus] = useState<boolean>(false);

    const clickHandler = () => {
        setStatus(!status);
    };

    return (
        <>
            <WrapST id={`${props.tokenId}`} onClick={clickHandler}>
                <DivWrapST>
                    <DivST>등급 : {props.KTAS}</DivST>
                    <DivST>나이 : {props.age}</DivST>
                    <DivST>성별 : {props.gender}</DivST>
                </DivWrapST>
                <StateDivST>
                    환자상태 : {props.state}
                {status && (
                    <ButtonsST>
                        <Btn width={8} height={4} text={"수락"} size={2} onclick={props.accept} color={"#4caf50"}></Btn>
                        <Btn width={8} height={4} text={"거절"} size={2} onclick={props.reject} color={"#f44336;"}></Btn>
                    </ButtonsST>
                )}
                </StateDivST>
            </WrapST>
        </>
    );
};

