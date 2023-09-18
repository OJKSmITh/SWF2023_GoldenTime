import { IInput } from "@utils/interface/interface"
import { Input, InputLabel } from "./input.styled"

export const InputComp = (props: IInput) => {
    return (
        <>
            <InputLabel>{props.label}</InputLabel>
            <Input
                type={props.type}
                placeholder={props.placeholder}
                width={props.width}
                height={props.height}
                value={props.value}
                disabled={props.disable}
            />
        </>
    )
}
