import { Btn } from '@components/button/button'
import { DivBasicST,DivContentWrapST,DivTextST,DivWrapST } from '@components/div'
import { IHosMain } from 'interface/interface'
import { useEffect, useState } from 'react'
import { ContractFactory, ethers } from 'ethers'
import goldenTime from "@contracts/GoldenTime.json" 
import { Navigate, useNavigate } from 'react-router-dom'


type Patient = {
    KTAS: number;
    age: number;
    gender: number;
    state: string;
}

type PatientArray = {
    KTAS:string
    age:string
    gender:string
    state: string
}

type TokenArray = {
    tokenId: number
    hospital: string
}

export const AmbSection = ({Amb, PatientState}:IHosMain) =>{
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
    const [signer, setSigner] = useState<ethers.Signer | null>(null)
    const [patient, setPatient] = useState<Patient | null>(null);
    const [patientArray, setPatientArray] = useState<PatientArray[]>([]);
    const [tokenArray, setTokenArray] = useState<TokenArray[]>([]);
    const [contract, setContract] = useState<ethers.Contract | null>(null)
    const [clickBool, setClickBool] = useState<boolean>(false)
    const [tokenBool, setTokenBool] = useState<boolean>(false)
    const [KTASMessage, setKTASMessage] =useState<string>("")
    const [ageString, setAgeString] =useState<string>("")
    const [genderString, setGenderString] =useState<string>("")
    const [hospitalAddress, setHospitalAddress ] = useState<string>("")
    const navigate = useNavigate()
    
    const getKTASMessage = (KTAS: number) => {
        const KTASMessages: {[index: string]: string} = {
            '1': 'KTAS 1단계',
            '2': 'KTAS 2단계',
            '3': 'KTAS 3단계',
            '4': 'KTAS 4단계',
            '5': 'KTAS 5단계',
        };
    
        return KTASMessages[KTAS.toString()] || 'KTAS 정보 없음';
    };
    
    const getGenderString = (gender: number) => {
        const genderStrings: {[index: string]: string} = {
            '1': '남자',
            '2': '여자',
        };
        return genderStrings[gender.toString()] || '성별정보 없음';
    };
    
    const getAgeString = (age: number) => {
        const ageStrings: {[index: string]: string} = {
            '0': '0~9세 추정',
            '1': '10~19세 추정',
            '2': '20~29세 추정',
            '3': '30~39세 추정',
            '4': '40~49세 추정',
            '5': '50~59세 추정',
            '6': '60~69세 추정',
            '7': '70~79세 추정',
            '8': '80~89세 추정',
            '9': '90세 이상 추정',
        };
        return ageStrings[age.toString()] || '나이 모름';
    };

    const tokenValue = async (_tokenId: number) =>{
        if(!contract) return
        const checkTokenId = await contract.ownerOf(_tokenId)
        console.log(hospitalAddress)
        if(checkTokenId === hospitalAddress) setTokenBool(true)
        setTokenBool(false)
    }

    useEffect(()=>{
        if(!window.ethereum) return
        const providers = new ethers.providers.Web3Provider(window.ethereum)
        const signers = providers.getSigner()
        signers.getAddress().then((result:string)=>{
            setHospitalAddress(result)}
        )
        setProvider(providers)
        setSigner(signers)
    },[])

    useEffect(()=>{
        if(!provider || !signer) return
        const contract = new ethers.Contract("0xBC2CcBa66C4C7343E3FF9998800f8F83173809e4", goldenTime.abi, provider) // AMB 콘트랙트입니다. 
        const signedContract = contract.connect(signer)
        setContract(signedContract)
    },[provider])
    
    useEffect(()=>{
        if(!contract) return
        
        const listener = (level:Number, age:number, gender:number ,state:string, timestamp:number, tokenId:number) => {
            const data = {"KTAS":Number(level), "age":Number(age), "gender":Number(gender), "state":state}
            setPatient(data)
        };
        const listener2 = (tokenId:Number, _hospital:string)=>{
            const data = {"tokenId":Number(tokenId), "hospital":_hospital}
            console.log(data)   
            setTokenArray(prev => [...prev, data]);
        }

        contract.on("Emergency", listener)
        contract.on("Choice", listener2)

        return ()=>{
            contract.off("Emergency", listener)
            contract.off("Choice", listener2)
          }
      
      },[contract])

    useEffect(() => {
        if (patient) {
            setKTASMessage(getKTASMessage(patient.KTAS));
            setGenderString(getGenderString(patient.gender));
            setAgeString(getAgeString(patient.age));
        }
    }, [patient]);
    
    useEffect(()=>{
        if(!patient) return
        const newData:PatientArray = {
            "KTAS": KTASMessage,
            "age": ageString,
            "gender": genderString,
            "state": patient.state
        };
        setPatientArray((prevPatientArray) => [...prevPatientArray, newData]);
    },[ageString])

    useEffect(()=>{
        if(patientArray.length ===0)return
    },[patientArray])

    useEffect(()=>{
        if(tokenArray.length ===0)return
        console.log(tokenArray)
        const lastToken = tokenArray[tokenArray.length-1]
        tokenValue(lastToken.tokenId)
    }, [tokenArray])

    useEffect(() => {
        if (tokenBool !== undefined) return 
            processPatientArray();
    }, [tokenBool]);

    
    const acceptBtn = async (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        if(!contract) return
        const signers = await signer?.getAddress()
        const tx = await contract.received(28, signers)
        await tx.wait()
        // navigate({ pathname: '/Mypage' });
    }

    const accept2Btn = async (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        if(!contract) return
        const signers = await signer?.getAddress()
        const tx = await contract.reject(28, signers, "사망")
        console.log(tx)
    }

    const hamBtn = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setClickBool(!clickBool)
    }

    const renderPatientArray = () => {
        return patientArray.map((item, index) => (
            <DivContentWrapST key={index} width={100} height={"auto"} flex={"true"} direction={"column"} justify={"flex-start"} align={"flex-start"}>
                <DivWrapST width={100} height={4.8} size={3} flex={"true"} direction={"row"} justify={"space-between"} align={"center"}>
                    <DivTextST width={"auto"} height={4.8} size={3} justify={"center"} align={"center"}>환자{index + 1}</DivTextST>
                    <div style={{ display: 'flex', alignItems: 'center', justifyItems:"center" }}>
                        <Btn width={8} height={5} text={"수락"} size={2} onclick={acceptBtn}></Btn>        
                        <Btn width={8} height={5} text={"거절"} size={2} onclick={accept2Btn}></Btn>
                    </div>
                </DivWrapST>
                <DivWrapST width={100} height={"auto"} size={3} flex={"true"} direction={"column"} justify={"flex-start"} align={"flex-start"}>
                    <div>등급: {item.KTAS}</div>
                    <div>환자 나이: {item.age}</div>
                    <div>성별: {item.gender}</div>
                    <div>환자 상태: {item.state}</div>
                </DivWrapST>
            </DivContentWrapST>
        ));
    };

    const processPatientArray = () =>{
        return patientArray.map((item, index) => (
            <DivContentWrapST key={index} width={100} height={"auto"} flex={"true"} direction={"column"} justify={"flex-start"} align={"flex-start"}>
                <DivWrapST width={100} height={"auto"} size={3} flex={"true"} direction={"column"} justify={"flex-start"} align={"flex-start"}>
                    <div>등급: {item.KTAS}</div>
                    <div>환자 나이: {item.age}</div>
                    <div>성별: {item.gender}</div>
                    <div>환자 상태: {item.state}</div>
                    <div>진행 상태: {tokenBool? "선택됨": "다른 병원 선택 됨"}</div>
                </DivWrapST>
            </DivContentWrapST>
        ));
    }
    
    if(!patient)return <></>
    return (
        <>
            <DivBasicST width={36} height={72}>
                <DivContentWrapST width={100} height={100} flex={"true"} direction={"column"} justify={"true"} align={"true"} right={5}>
                    {renderPatientArray()}
                </DivContentWrapST>
                <Btn width={8} height={5} text={"???"} size={2} onclick={hamBtn}></Btn>        
                {clickBool && (
                <DivContentWrapST width={100} height={100} flex={"true"} direction={"column"} justify={"true"} align={"true"} right={5}>
                    {processPatientArray()}
                </DivContentWrapST>
            )}
            </DivBasicST>
        </>
    )
}