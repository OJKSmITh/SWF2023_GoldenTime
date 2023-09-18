import { MainBtn } from "@components/mainBtn/mainBtn"
import markerImg from "@img/marker.png"
import searchImg from "@img/search.png"
import { useNavigate } from "react-router-dom"

export const MainNav = () => {
    const navigator = useNavigate()
    const clickHandler = (id: string) => {
        navigator("/" + id)
    }

    return (
        <>
            <MainBtn id="maps" onClick={clickHandler} img={markerImg} />
            <MainBtn id="search" onClick={clickHandler} img={searchImg} />
        </>
    )
}
