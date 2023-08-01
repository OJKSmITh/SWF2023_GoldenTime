import { IHospital } from "@utils/interface/interface"
import { FirstSection, ListWrap } from "./styled"
import { Button } from "@components/button"
import { useSigner } from "@utils/hooks/useSigner"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { SelectHopital } from "@utils/localStorage"
import { useNavigate } from "react-router-dom"
import { Loading } from "@components/loading"


export const ListComp = ({ hospital }: { hospital: IHospital; }) => {
    const { contract } = useSigner()
    const [isLoagind, setIsLoading] = useState(false)
    const navigator = useNavigate()
    const [selectHospital, setSelectHospital] = useRecoilState(SelectHopital)
    const handleClick = async() => {
        if (!contract) return
        try {
            setIsLoading(true)
            await contract.choice(hospital.tokenId, hospital.hospital)
            
        } catch (e:any) {
            alert(e.message)
        }
    }
    
    useEffect(() => {
        if (!contract) return
        console.log(contract,11111)
    const listenser = ( tokenId : number, _hospital:string ) => {
        console.log("Choice", tokenId, _hospital)
        setSelectHospital(_hospital);
        setIsLoading(false)
        navigator("/transfer")
    }
    contract.on("Choice", listenser)

    return () => {
        contract.off("Choice", listenser)
    }
    }, [contract, selectHospital])

    if(isLoagind) return <Loading/>
    return <ListWrap>
        <FirstSection>
            <div>
                {hospital.hospital.substring(0, 8) + "..." + hospital.hospital.substring(36, 42)}
            </div>
            {hospital.state ? <Button text={"병원 선택"} bg={" #4caf50"} height={"5rem"} width={"8rem"} onClick={handleClick}></Button> : <Button text={"선택 불가"} bg={" #bababa"} height={"5rem"} width={"8rem"} disable={true}></Button>}
        </FirstSection>
        {hospital.state ? <></> : <div style={{ width:"80%" }}>
            사유 : {hospital.reason}
        </div>}
    </ListWrap>
}

