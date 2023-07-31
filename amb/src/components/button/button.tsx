import { IBtn } from "@utils/interface/interface"
import { BtnWrap } from "./styled"

export const Button = (props: IBtn) => {
    const { text, bg, width, height, id, margin, disable, color, onClick } = props
    return (
        <BtnWrap bg={bg} width={width} height={height} id={id} margin={margin} disabled={disable} color={color} onClick={onClick}>
            {text}
        </BtnWrap>
    )
}
