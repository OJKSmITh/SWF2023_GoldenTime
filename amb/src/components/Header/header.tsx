import { HeaderST,ContentST } from "./styled"

export const Header = ({ subject, content }: { subject: string;  content ?: string}) => {
    return (
        <>
            <HeaderST>{subject}</HeaderST>
            <ContentST>{content}</ContentST>
        </>
    )
}
