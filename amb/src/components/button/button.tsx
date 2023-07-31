import { IBtn } from "interface/interface"
import { BtnWrap } from "./styled"

export const Button = (props: IBtn) => {
    const { text, bg, width, height, id, margin } = props
    return (
        <BtnWrap bg={bg} width={width} height={height} id={id} margin={margin}>
            {text}
        </BtnWrap>
    )
}
