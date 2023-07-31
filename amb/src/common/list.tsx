import { Header } from "@components/Header"
import { useQuery } from "@tanstack/react-query"
import { useSigner } from "@utils/hooks/useSigner"
import { TokenId } from "@utils/localStorage"
import { get } from "http"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

export const List = () => {
    const { contract } = useSigner()
    const [hospitalList, setHospitalList] = useState([])
    const tokenId = useRecoilValue(TokenId)

    const getList = async () => {
        if (!contract) return
        const result = await contract.getHospitalList(tokenId)
        setHospitalList(result)
        return result
    }

    useEffect(() => {
        const handleBeforeunload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
        }

        window.addEventListener("beforeunload", handleBeforeunload)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeunload)
        }
    }, [])

    useEffect(() => {
        if (!contract) return
        console.log("tokenId", tokenId)
        const listenser = (_tokenId: number, _hospital: string) => {
            console.log("HospitalList", Number(_tokenId), _hospital)
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
