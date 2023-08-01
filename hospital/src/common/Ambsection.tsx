import { Btn } from "@components/button/button";
import { DivBasicST, DivContentWrapST, DivTextST, DivWrapST } from "@components/div";
import { IHosMain } from "interface/interface";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import goldenTime from "@contracts/GoldenTime.json";
import { Patient } from "@components/patient/patient";

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
    const [patient, setPatient] = useState<Patient | null>(null);
    const [patientArray, setPatientArray] = useState<PatientArray>([]);
    const [tokenArray, setTokenArray] = useState<TokenArray[]>([]);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [tokenBool, setTokenBool] = useState<boolean>(false);
    const [hospitalAddress, setHospitalAddress] = useState<string>("");

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

    const tokenValue = async (_tokenId: number) => {
        if (!contract) return;
        const checkTokenId = await contract.ownerOf(_tokenId);
        console.log(hospitalAddress);
        if (checkTokenId === hospitalAddress) setTokenBool(true);
        setTokenBool(false);
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
        const contract = new ethers.Contract("0xBC2CcBa66C4C7343E3FF9998800f8F83173809e4", goldenTime.abi, provider); // AMB 콘트랙트입니다.
        const signedContract = contract.connect(signer);
        setContract(signedContract);
    }, [provider]);

    useEffect(() => {
        if (!contract) return;

        const listener = (level: Number, age: number, gender: number, state: string, timestamp: number, _tokenId: number) => {
            const data = { KTAS: Number(level), age: Number(age), gender: Number(gender), state: state, tokenId: Number(_tokenId), tokenBool: null };
            const patient = parsePatient(data);
            setPatient(patient);
        };
        const listener2 = (tokenId: Number, _hospital: string) => {
            const data = { tokenId: Number(tokenId), hospital: _hospital };
            console.log(data);
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
        if (patient) {
            const cloneArray = [...patientArray, patient];
            setPatientArray(cloneArray);
        }
    }, [patient]);

    useEffect(() => {
        if (tokenArray.length === 0) return;
        console.log(tokenArray);
        const lastToken = tokenArray[tokenArray.length - 1];
        tokenValue(lastToken.tokenId);
    }, [tokenArray]);


    const renderPatientArray = () => {
        return patientArray.map((v, index) => (
            <>
                <DivContentWrapST width={"70rem"} flex={"true"} justify={"space-between"}>
                    <DivTextST width={"15rem"} height={"3rem"} size={"1.5rem"} justify={"space-between"} align={"center"}>
                        <div>환자{index + 1}</div>
                    </DivTextST>
                    <DivTextST width={"15rem"} height={"3rem"} size={"1.5rem"} justify={"space-between"} align={"center"}>
                        <div>{v.tokenBool === null ? "Waiting" : v.tokenBool ? "후송중" : "타병원후송"}</div>{" "}
                    </DivTextST>
                </DivContentWrapST>
                <Patient key={index} KTAS={v.KTAS} age={v.age} gender={v.gender} state={v.state} tokenId={v.tokenId} tokenBool={v.tokenBool}></Patient>
            </>
        ));
    };

    if (!patient) return <></>;
    return (
        <>
            <DivBasicST width={80} height={72}>
                {renderPatientArray()}
                <Btn width={8} height={5} text={"???"} size={2}></Btn>
            </DivBasicST>
        </>
    );
};

