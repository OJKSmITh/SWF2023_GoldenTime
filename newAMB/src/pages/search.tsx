import { MatchForm } from "@common/matchForm"
import { Header } from "@components/header"

export const Search = () => {
    return (
        <>
            <Header text={"병원 찾기"} bg="#242424" />
            <MatchForm />
        </>
    )
}
