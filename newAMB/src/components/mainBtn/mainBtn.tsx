import { NavBtn, NavImg, NavText } from "./mainBtn.styled"

export const MainBtn = ({ id, onClick, img }: { id: string; onClick: (id: string) => void; img: string }) => {
    return (
        <NavBtn id={id} onClick={() => onClick(id)}>
            <NavImg src={img} alt={id} />
            <NavText>{id === "search" ? "병원 찾기" : "위치 찾기"}</NavText>
        </NavBtn>
    )
}
