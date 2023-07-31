import { Header } from "@components/Header"
import { Select } from "@components/select"
import { Button } from "@components/button"
import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

import { Loading } from "@components/loading"
import { TokenId } from "@utils/localStorage"
import { useSigner } from "@utils/hooks/useSigner"

export const Main = () => {
    const [tokenId, setTokenId] = useRecoilState(TokenId)
    const { provider, signer, contract } = useSigner()
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()
    const occurse = async (props: { level: number; age: number; gender: number; state: string }) => {
        if (!contract) return
        if (window.ethereum.selectedAddress === null) return alert("메타마스크를 연결해주세요")
        const { level, age, gender, state } = props
        try {
            setIsLoading(true)
            const result = await contract.occurs(level, age, gender, state)
            return result
        } catch (e: any) {
            if (e.message.toString().includes("user rejected")) {
                alert("취소 되었습니다.")
            }
            alert(e.message)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const level = Number((form.querySelector("#level") as HTMLSelectElement).value)
        const gender = Number((form.querySelector("#gender") as HTMLSelectElement).value)
        const age = Number((form.querySelector("#ages") as HTMLSelectElement).value)
        const state = String((form.querySelector("#state") as HTMLTextAreaElement).value)
        console.log(level, gender, age, state)
        if ((typeof level !== "number" || typeof gender !== "number" || typeof age !== "number") && contract)
            return alert("입력값을 확인해주세요")
        occurse({ level, age, gender, state })
    }

    useEffect(() => {
        if (!contract) return
        if (tokenId !== 0) navigator("/list")
        console.log("tokenId", tokenId)
        const listenser = (toInfo: string, _tokenId: number) => {
            console.log("Minted", toInfo, _tokenId)
            setTokenId(Number(_tokenId))
            setIsLoading(false)
        }
        contract.on("Minted", listenser)

        return () => {
            contract.off("Minted", listenser)
        }
    }, [contract])

    if (isLoading) return <Loading></Loading>
    return (
        <form onSubmit={handleSubmit}>
            <Header subject={"발생"} />
            <Select id="level"></Select>
            <Select id="ages"></Select>
            <Select id="gender"></Select>
            <Select id="state"></Select>
            <Button
                id={"submit"}
                text={"제출하기"}
                bg={"#e24f4f"}
                height={"5rem"}
                width={"100%"}
                margin={"3rem 0 0 0"}
            ></Button>
        </form>
    )
}
