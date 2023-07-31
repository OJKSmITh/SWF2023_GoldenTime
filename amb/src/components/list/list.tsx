import { IHospital } from "@utils/interface/interface"
import { FirstSection, ListWrap } from "./styled"
import { Button } from "@components/button"
import { useSigner } from "@utils/hooks/useSigner"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { SelectHopital } from "@utils/localStorage"
import { useNavigate } from "react-router-dom"

export const ListComp = ({ hospital }: { hospital: IHospital }) => {
    const { contract } = useSigner()
    const navigator = useNavigate()
    const [selectHospital, setSelectHospital] = useRecoilState(SelectHopital)
    const handleClick = async() => {
        if (!contract) return
        const result = await contract.choice(hospital.tokenId, hospital.hospital)
        console.log(result)
     }
    
    useEffect(() => {
    if (!contract) return
    const listenser = ( tokenId : number, _hospital :string ) => {
        console.log("Choice", tokenId, _hospital)
        setSelectHospital(_hospital);
        navigator("/transfer")
    }
    contract.on("Choice", listenser)

    return () => {
        contract.off("Choice", listenser)
    }
    }, [contract])

    return <ListWrap>
        <FirstSection>
            <div>
                {hospital.hospital.substring(0, 8) + "..." + hospital.hospital.substring(36, 42)}
            </div>
            {hospital.state ? <Button text={"병원 선택"} bg={" #4caf50"} height={"5rem"} width={"8rem"} onClick={handleClick}></Button> : <Button text={"선택 불가"} bg={" #bababa"} height={"5rem"} width={"8rem"} disable={true}></Button>}
        </FirstSection>
        {hospital.state ? <></> : <div style={{ width:"100%" }}>
            사유 : {hospital.reason}
        </div>}
    </ListWrap>
}

