import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Input } from ".."
import { SearchMapForm } from "./styled"
import { Ilocation } from "@utils/interface/interface"

declare const kakao: any

export const SearchMaps = ({
    kakao,
    setLocation,
}: {
    kakao: any
    setLocation: Dispatch<SetStateAction<Ilocation>>
}) => {
    const [search, setSearch] = useState("")

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        if (typeof kakao !== "undefined" && kakao.maps && kakao.maps.services) {
            let geocoder = new kakao.maps.services.Geocoder()
            // 나머지 로직
            geocoder.addressSearch(search, (result: any, status: any) => {
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                    console.log(result, status)
                    setLocation({ lat: result[0].y, lng: result[0].x })
                }
            })
        } else {
            console.log("Kakao Map API is not loaded yet.")
        }
    }

    return (
        <SearchMapForm onSubmit={submitHandler}>
            <Input
                width="80vw"
                height="4rem"
                type="text"
                placeholder="상세 주소를 입력해주세요"
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                id="search"
                style={{
                    borderRadius: "2rem",
                    border: "solid 0.2rem #cbcbcb",
                    fontSize: "1.6rem",
                    padding: "0 2rem",
                    color: "#000",
                    textAlign: "start",
                }}
            />
        </SearchMapForm>
    )
}
