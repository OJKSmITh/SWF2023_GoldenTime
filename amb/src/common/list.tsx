import { Header } from "@components/Header"
import { ColWrap } from "@components/button"
import { ListComp } from "@components/list"
import { Wrap } from "@styled/index"
import { useSigner } from "@utils/hooks/useSigner"
import { IHospital } from "@utils/interface/interface"
import { TokenId } from "@utils/localStorage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

export const List = () => {
    const { contract } = useSigner()
    const navigator = useNavigate()
    const [hospitalList, setHospitalList] = useState<IHospital[]>([])
    const tokenId = useRecoilValue(TokenId)
    

    useEffect(() => {
        if (tokenId === null) navigator("/")
        
        const handleBeforeunload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            e.returnValue = ""
        }

        window.addEventListener("beforeunload", handleBeforeunload)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeunload)
        }
    }, [])

    useEffect(() => {
        if (!contract) return
        console.log("tokenId", tokenId)
        const listenser = (_tokenId: number, _hospital: string, state: boolean, reason: string) => {
            console.log("HospitalList", Number(_tokenId), _hospital, state, reason)
            if (tokenId === Number(_tokenId)) {
                const newHospital: IHospital = {
                    tokenId: Number(_tokenId),
                    hospital: _hospital,
                    state: state,
                    reason: reason,
                }
                setHospitalList((prev) => [...prev, newHospital])
            }
            
        }
        console.log(hospitalList)
        contract.on("HospitalList", listenser)

        return () => {
            contract.off("HospitalList", listenser)
        }
    }, [contract, hospitalList, tokenId])

    
    return (
        <>
            <Header subject={"병원 리스트"} />
            <ColWrap>
            {hospitalList.length === 0 ? <div style={{fontSize :"2rem", textAlign:"center"}}>병원 응답을 대기 중입니다.</div> :hospitalList.map((hospital, index) => (
                <ListComp hospital={hospital} key={index} />
                ))}
            </ColWrap>
            
        </>
    )
}
