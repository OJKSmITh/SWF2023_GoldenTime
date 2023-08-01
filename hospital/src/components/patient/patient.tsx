import { Btn } from "@components/button/button";
import React, { useState } from "react";
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
    font-size: 2rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonsST = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > button:last-child {
        margin: 0 0 0 2rem;
    }
`;

const RejectButtonsST = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & button {
        margin: 0 0 0 2rem;
    }
`;

const InputST = styled.input`
    width: 20rem;
    height: 4rem;
    padding: 0.5rem 1rem;
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
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
    cancel: (e: React.MouseEvent<HTMLElement>) => void;
    rejectstate: boolean;
}

export const Patient: React.FC<Patient> = (props) => {
    return (
        <>
            <WrapST id={`${props.tokenId}`}>
                <DivWrapST>
                    <DivST>등급 : {props.KTAS}</DivST>
                    <DivST>나이 : {props.age}</DivST>
                    <DivST>성별 : {props.gender}</DivST>
                </DivWrapST>
                <StateDivST>
                    {!props.rejectstate && (
                        <>
                            환자상태: {props.state}
                            {props.tokenBool === null && (
                                <ButtonsST>
                                    <Btn id={`${props.tokenId}`} width={8} height={4} text={"수락"} size={2} onclick={props.accept} color={"#4caf50"}></Btn>
                                    <Btn id={`${props.tokenId}`} width={8} height={4} text={"거절"} size={2} onclick={props.reject} color={"#f44336;"}></Btn>
                                </ButtonsST>
                            )}
                        </>
                    )}
                    {props.rejectstate && props.tokenBool === null && (
                        <RejectButtonsST>
                            <InputST onChange={props.change} placeholder={"거절사유를 입력하세요"} />
                            <Btn id={`${props.tokenId}`} width={8} height={4} text={"거절"} size={2} onclick={props.reject} color={"#f44336;"}></Btn>
                            <Btn id={`${props.tokenId}`} width={8} height={4} text={"취소"} size={2} onclick={props.cancel} color={"#dadada;"}></Btn>
                        </RejectButtonsST>
                    )}
                </StateDivST>
            </WrapST>
        </>
    );
};

