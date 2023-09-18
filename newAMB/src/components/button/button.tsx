import { IBtn, ISubmitBtn } from "@utils/interface/interface"
import { Button } from "./btn.styled"

export const SubmitBtn = (props: ISubmitBtn) => {
    return (
        <>
            <Button
                type="submit"
                bg={props.bg}
                hover={props.hover}
                width={props.width}
                height={props.height}
                margin={props.margin}
                color={props.color}
            >
                {props.text}
            </Button>
        </>
    )
}
export const Btn = (props: IBtn) => {
    return (
        <>
            <Button
                type="button"
                bg={props.bg}
                hover={props.hover}
                width={props.width}
                height={props.height}
                margin={props.margin}
                color={props.color}
                onClick={props.onClick}
            >
                {props.text}
            </Button>
        </>
    )
}
