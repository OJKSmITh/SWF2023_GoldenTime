import { Header } from "@components/Header"
import { Form, TransferWrap } from "./styled"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { SelectHopital, TokenId } from "@utils/localStorage"
import { Button } from "@components/button"
import { useSigner } from "@utils/hooks/useSigner"
import { useState } from "react"
import { Loading } from "@components/loading"
import { useNavigate } from "react-router-dom"


export const Transfer = () => {
    const { contract } = useSigner()
    const tokenId = useRecoilValue(TokenId)
    const resetTokenId = useResetRecoilState(TokenId)
    const resetSelectHospital = useResetRecoilState(SelectHopital)
    const navigator = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const selectHospital = useRecoilValue(SelectHopital)
    if(selectHospital === "") return null;  // 값을 반환하도록 수정
    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!contract) return
        setIsLoading(true)
        const to = (e.target as HTMLFormElement).to.value
        const from = (e.target as HTMLFormElement).from.value
        try {
            await contract.transferFrom(from, to, tokenId)
            setIsLoading(false)
            resetTokenId()
            resetSelectHospital()
        } catch (e:any) {
            e.message.toString().includes("caller is not token owner or approved") ? alert("이미 환자 이송이 완료 되었습니다.") : alert(e.message)
        }
    }

    if (isLoading) return <Loading />
    if (tokenId === null || selectHospital === null) navigator("/");  
    return (
    <TransferWrap>
        {selectHospital !== "" && (
        <>
            <Header subject={"병원으로 이송 중"} content="응급실 인계 후 이송완료 버튼을 눌러주세요 "/>
                    <Form onSubmit={submitHandler}>
                        
                <div style={{ fontSize: "1.8rem", padding: "0.7rem 1.4rem" }}>이송 병원(응급실)</div>
                <input id="to" type="text" defaultValue={selectHospital || ''} style={{ fontSize: "1.6rem", padding: "0.7rem 1.4rem" }} />
                <div style={{ fontSize: "1.8rem", padding: "0.7rem 1.4rem" }}>이송 환자</div>
                <input id="from" type="text" style={{ fontSize: "1.6rem", padding: "0.7rem 1.4rem" }} defaultValue={window.ethereum.selectedAddress || '' }/>
                <Button text={"이송 완료"} bg={"green"} height={"5rem"} width={"100%"} color="#ffffff"/>
            </Form>
        </>
        )}
      </TransferWrap>)
}