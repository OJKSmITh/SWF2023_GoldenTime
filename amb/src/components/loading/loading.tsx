import { Header } from "@components/Header"
import { Loader } from "./styled"

export const Loading = () => {
    const { pathname } = window.location

    return (
        <>
            <Loader />
            {pathname === "/" ? (
                <Header subject={"병원에 요청 중입니다."} />
            ) : pathname === "/list" ? (
                <Header subject={"병원 리스트를 불러오는 중입니다."} />
            ) : null}
        </>
    )
}
