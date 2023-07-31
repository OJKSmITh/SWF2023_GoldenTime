import { HeaderST } from "./styled"

export const Header = ({ subject }: { subject: string }) => {
    return (
        <>
            <HeaderST>{subject}</HeaderST>
        </>
    )
}
