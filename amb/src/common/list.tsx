import { Header } from "@components/Header"
import { useSigner } from "@utils/hooks/useSigner"
import { TokenId } from "@utils/localStorage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

export const List = () => {
    const { contract } = useSigner()
    const navigator = useNavigate()
    const [hospitalList, setHospitalList] = useState([])
    const tokenId = useRecoilValue(TokenId)

    useEffect(() => {
        if (tokenId === null) navigator("/")
        tokenId !== null && navigator("/list")
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
        }
        contract.on("HospitalList", listenser)

        return () => {
            contract.off("HospitalList", listenser)
        }
    }, [contract])

    return (
        <>
            <Header subject={"리스트"} />
            {hospitalList}
        </>
    )
}
