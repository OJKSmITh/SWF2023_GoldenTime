import { Header } from "@components/Header"
import { Form, TransferWrap } from "./styled"
import { useRecoilValue } from "recoil"
import { SelectHopital } from "@utils/localStorage"
import { Button } from "@components/button"


export const Transfer = () => {
    
    const selectHospital = useRecoilValue(SelectHopital)
    if(selectHospital === "") return null;  // 값을 반환하도록 수정
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        console.log("submit")
    }

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