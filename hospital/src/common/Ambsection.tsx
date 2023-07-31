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

export const AmbSection = ({Amb, PatientState}:IHosMain) =>{
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
    const [signer, setSigner] = useState<ethers.Signer | null>(null)
    const [patient, setPatient] = useState<Patient | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null)
    const [KTASMessage, setKTASMessage] =useState("")
    const [ageString, setAgeString] =useState("")
    const [genderString, setGenderString] =useState("")
    const navigate = useNavigate()

    useEffect(()=>{
            if(!window.ethereum) return
            const providers = new ethers.providers.Web3Provider(window.ethereum)
            const signers = providers.getSigner()
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
        
        const listener = (level:Number, age:number, gender:number ,state:string, timestamp:number) => {
            const data = {"KTAS":Number(level), "age":Number(age), "gender":Number(gender), "state":state}
            setPatient(data)
        };
        contract.on("Emergency", listener)

        return ()=>{
            contract.off("Emergency", listener)
          }
      
      },[contract])

    
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


    useEffect(() => {
        if (patient) {
            setKTASMessage(getKTASMessage(patient.KTAS));
            setGenderString(getGenderString(patient.gender));
            setAgeString(getAgeString(patient.age));
        }
    }, [patient]);

    
    const acceptBtn = async (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        if(!contract) return
        const signers = await signer?.getAddress()
        const tx = await contract.received(12, signers)
        await tx.wait()
        navigate({ pathname: '/Mypage' });
    }

    const accept2Btn = async (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        if(!contract) return
        const signers = await signer?.getAddress()
        const tx = await contract.reject(0, signers,"사망")
        console.log(tx)
    }
    
    if(!patient)return <></>
    return (
        <>
            <DivBasicST width={36} height={72}>
                <DivContentWrapST width={100} height={100} flex={"true"} direction={"column"} justify={"true"} align={"true"} right={5}>
                    <DivContentWrapST width={100} height={"auto"} flex={"true"} justify={"true"} align={"true"}>
                        <DivTextST width={8} height={4.8} flex={"true"} size={3} justify={"true"} align={"true"}>{Amb}</DivTextST>       
                        <Btn width={8} height={4.8} text={"수락"} size={2} onclick={acceptBtn}></Btn>        
                        <Btn width={8} height={4.8} text={"거절"} size={2} onclick={accept2Btn}></Btn>        
                    </DivContentWrapST>
                    <DivContentWrapST width={100}  height={"auto"} size={3} flex={"true"} justify={"true"} align={"true"}>
                        KTAS : {KTASMessage}
                        <br/>
                        환자 나이:{ageString}
                        <br/>
                        성별 :{genderString}
                        <br/>
                        환자 상태 : {patient?.state}
                    </DivContentWrapST>
                </DivContentWrapST>
            </DivBasicST>
        </>
    )
}