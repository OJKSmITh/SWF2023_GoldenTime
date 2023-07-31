import { Btn } from "@components/button/button";
import { useState } from "react";
import { styled } from "styled-components";

const WrapST = styled.div`
    position: relative;
    width: 75rem;
    height: 10rem;
    margin-bottom: 2rem;
`;

const DivWrapST = styled.div`
    width: 75rem;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    box-sizing: border-box;
`;

const DivST = styled.div`
    width: 25rem;
    height: 4rem;
    font-size: 2.5rem;
    padding: 1rem;
    box-sizing: border-box;
`;

const StateDivST = styled.div`
    width: 75rem;
    height: 5rem;
    font-size: 2rem;
    padding: 1.5rem;
`;

const ButtonsST = styled.div`
    width: 20rem;
    height: 15rem;
    position: absolute;
    right: -20rem;
    top: -4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

interface Patient {
    KTAS: string | number;
    age: string | number;
    gender: string | number;
    state: string;
    tokenId: number;
    tokenBool: boolean | null;
}

export const Patient: React.FC<Patient> = (props) => {
    const [status, setStatus] = useState<boolean>(false);

    const clickHandler = () => {
        setStatus(!status);
    };

    const acceptBtn = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log("승낙");
        // navigate({ pathname: '/Mypage' });
    };

    const accept2Btn = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log("거절");
    };

    return (
        <>
            <WrapST id={`${props.tokenId}`} onClick={clickHandler}>
                <DivWrapST>
                    <DivST>등급 : {props.KTAS}</DivST>
                    <DivST>나이 : {props.age}</DivST>
                    <DivST>성별 : {props.gender}</DivST>
                </DivWrapST>
                <StateDivST>환자상태 : {props.state}</StateDivST>
                {status && (
                    <ButtonsST>
                        <Btn width={8} height={4} text={"수락"} size={2} onclick={acceptBtn}></Btn>
                        <Btn width={8} height={4} text={"거절"} size={2} onclick={accept2Btn}></Btn>
                    </ButtonsST>
                )}
            </WrapST>
        </>
    );
};

