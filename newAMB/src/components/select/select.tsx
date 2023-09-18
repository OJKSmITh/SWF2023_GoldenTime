import { InputLabel } from ".."
import { SeelctWrap, TextArea } from "./styled"

export const Select = ({ id, label }: { id: string; label: string }) => {
    return (
        <>
            <InputLabel>{label}</InputLabel>
            {id === "level" ? (
                <SeelctWrap id={id}>
                    <option defaultChecked>KTAS 단계</option>
                    <option value="1">KTAS 1단계</option>
                    <option value="2">KTAS 2단계</option>
                    <option value="3">KTAS 3단계</option>
                    <option value="4">KTAS 4단계</option>
                    <option value="5">KTAS 5단계</option>
                </SeelctWrap>
            ) : id === "ages" ? (
                <SeelctWrap id={id}>
                    <option defaultChecked>연령대</option>
                    <option value="0">0~9세</option>
                    <option value="1">10~19세</option>
                    <option value="2">20~29세</option>
                    <option value="3">30~39세</option>
                    <option value="4">40~49세</option>
                    <option value="5">50~59세</option>
                    <option value="6">60~69세</option>
                    <option value="7">70~79세</option>
                    <option value="8">80~89세</option>
                    <option value="9">90세 이상</option>
                </SeelctWrap>
            ) : id === "gender" ? (
                <SeelctWrap id={id}>
                    <option defaultChecked>성별</option>
                    <option value="1">남성</option>
                    <option value="2">여성</option>
                </SeelctWrap>
            ) : (
                <TextArea id={id} placeholder="환자의 상태 또는 신고 내용을 적어주세요" />
            )}
        </>
    )
}
