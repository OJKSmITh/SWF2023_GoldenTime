import { Btn } from "@components/button/button";
import { DivBasicST, DivContentWrapST, DivTextST, DivWrapST } from "@components/div";
import { IHosMain } from "interface/interface";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import goldenTime from "@contracts/GoldenTime.json";
import { Patient } from "@components/patient/patient";
import { Text } from "@components/text/text";
import { useRecoilState } from "recoil";
import { PatientList } from "utiles/localstorage/state";
import { useInput } from "hooks/useinput";

interface Patient {
    KTAS: number | string;
    age: number | string;
    gender: number | string;
    state: string;
    tokenId: number;
    tokenBool: boolean | null;
}

type PatientArray = Patient[];

interface TokenArray {
    tokenId: number;
    hospital: string;
}

export const AmbSection = ({ Amb, PatientState }: IHosMain) => {
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [patientArray, setPatientArray] = useRecoilState<PatientArray>(PatientList);
    const [tokenArray, setTokenArray] = useState<TokenArray[]>([]);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [hospitalAddress, setHospitalAddress] = useState<string>("");
    const { value, onChange } = useInput();

    const getKTASMessage = (KTAS: number) => {
        if (0 < KTAS && KTAS < 6) return `KTAS ${KTAS}단계`;
        return "KTAS 정보 없음";
    };

    const getGenderString = (gender: number) => {
        const genderStrings: { [index: string]: string } = {
            "1": "남자",
            "2": "여자",
        };
        return genderStrings[gender.toString()] || "성별정보 없음";
    };

    const getAgeString = (age: number) => {
        if (age < 10) {
            const start = age * 10;
            const end = age * 10 + 9;
            return `${start}~${end}세 추정`;
        }
        return "나이 모름";
    };

    const parsePatient = (data: Patient): Patient => {
        const patients = {
            KTAS: getKTASMessage(data.KTAS as number),
            age: getAgeString(data.age as number),
            gender: getGenderString(data.gender as number),
            state: data.state,
            tokenId: data.tokenId,
            tokenBool: null,
        };
        return patients;
    };

    const acceptBtn = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const parent = target.parentNode?.parentNode as HTMLElement;
        if (contract) contract.received(parent.id, hospitalAddress);

        // navigate({ pathname: '/Mypage' });
    };

    const rejectBtn = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const parent = target.parentNode?.parentNode as HTMLElement;
        if (contract) contract.reject(parent.id, hospitalAddress, "병상없음");
    };

    useEffect(() => {
        if (!window.ethereum) return;
        const providers = new ethers.providers.Web3Provider(window.ethereum);
        const signers = providers.getSigner();
        signers.getAddress().then((result: string) => {
            setHospitalAddress(result);
        });
        setProvider(providers);
        setSigner(signers);
    }, []);

    useEffect(() => {
        if (!provider || !signer) return;
        const contract = new ethers.Contract("0x07A099e3AD17fE0932D85f7767f358662680ADd2", goldenTime.abi, provider); // AMB 콘트랙트입니다.
        const signedContract = contract.connect(signer);
        setContract(signedContract);
    }, [provider]);

    useEffect(() => {
        if (!contract) return;

        const listener = (level: Number, age: number, gender: number, state: string, timestamp: number, _tokenId: number) => {
            const data = { KTAS: Number(level), age: Number(age), gender: Number(gender), state: state, tokenId: Number(_tokenId), tokenBool: null };
            const patient = parsePatient(data);
            setPatientArray((prevPatientArray) => [...prevPatientArray, patient]);
        };
        const listener2 = (tokenId: Number, _hospital: string) => {
            const data = { tokenId: Number(tokenId), hospital: _hospital };
            setTokenArray((prev) => [...prev, data]);
        };

        contract.on("Emergency", listener);
        contract.on("Choice", listener2);

        return () => {
            contract.off("Emergency", listener);
            contract.off("Choice", listener2);
        };
    }, [contract]);

    useEffect(() => {
        // tokenBool();
    }, [tokenArray]);
    const tokenBool = (data: { tokenId: number; hospital: string }) => {
        console.log(patientArray);
        console.log(data.tokenId);
        const idx = patientArray.find((v) => v.tokenId === data.tokenId);
        console.log(idx);
    };

    const renderPatientArray = () => {
        const reverse = [...patientArray].reverse();
        return reverse.map((v, index) => (
            <>
                <DivContentWrapST width={"70rem"} flex={"true"} justify={"space-between"}>
                    <DivTextST width={"15rem"} height={"3rem"} size={"1.5rem"} justify={"space-between"} align={"center"}>
                        <div>환자{v.tokenId}</div>
                    </DivTextST>
                    <DivTextST width={"15rem"} height={"3rem"} size={"1.5rem"} justify={"space-between"} align={"center"}>
                        <div>{v.tokenBool === null ? <Text text="대기중" /> : v.tokenBool ? <Text text="후송중" color={true} /> : <Text text="타병원후송" color={false} />}</div>
                    </DivTextST>
                </DivContentWrapST>
                <Patient
                    key={index}
                    KTAS={v.KTAS}
                    age={v.age}
                    gender={v.gender}
                    state={v.state}
                    tokenId={v.tokenId}
                    tokenBool={v.tokenBool}
                    accept={acceptBtn}
                    reject={rejectBtn}
                    change={onChange}
                ></Patient>
            </>
        ));
    };

    return (
        <>
            <DivBasicST width={80} height={72}>
                {renderPatientArray()}
            </DivBasicST>
        </>
    );
};

