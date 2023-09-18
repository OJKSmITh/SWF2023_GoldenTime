import { HeaderArrow, HeaderText, HeaderWrap } from "./header.styled"
import arrow from "@img/arrow.png"

export const Header = ({ text, bg }: { text: string; bg?: string }) => {
    const arrowHandler = () => {
        window.history.back()
    }
    return (
        <>
            <HeaderWrap style={{ fontSize: "2rem" }} bg={bg}>
                <HeaderArrow src={arrow} alt="뒤로" onClick={() => arrowHandler()} />
                <HeaderText>{text}</HeaderText>
            </HeaderWrap>
        </>
    )
}
