import { SubmitBtn } from "@components/button"
import { InputComp } from "@components/input"
import { Select } from "@components/select"
import { MatchFormST } from "@components/select/styled"
import { FormEvent, useEffect, useState } from "react"
declare const kakao: any

export const MatchForm = () => {
    const [location, setLocation] = useState("")

    const getAddressFromCoordinates = (latitude: number, longitude: number) => {
        const geocoder = new kakao.maps.services.Geocoder()
        const coord = new kakao.maps.LatLng(latitude, longitude)

        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: number) => {
            if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name
                console.log(address)
                setLocation(address)
            }
        })
    }

    const currentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            getAddressFromCoordinates(position.coords.latitude, position.coords.longitude)
        })
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const level = Number((form.querySelector("#level") as HTMLSelectElement).value)
        const gender = Number((form.querySelector("#gender") as HTMLSelectElement).value)
        const age = Number((form.querySelector("#ages") as HTMLSelectElement).value)
        const state = String((form.querySelector("#state") as HTMLTextAreaElement).value)
        console.log(level, gender, age, state)
        if (isNaN(level) || isNaN(gender) || isNaN(age)) return alert("입력값을 확인해주세요")
    }
    useEffect(() => {
        currentLocation()
    }, [])
    return (
        <MatchFormST onSubmit={submitHandler}>
            <InputComp label={"현재 위치"} width={"100%"} height={"5rem"} value={location} disable={true} />
            <Select id="level" label={"KTAS 단계"} />
            <Select id="ages" label={"연령대"} />
            <Select id="gender" label={"성별"} />
            <Select id="state" label={"환자 상태"} />
            <SubmitBtn
                text={"병원 찾기"}
                height={"5rem"}
                width={"100%"}
                bg={"#4786DA"}
                hover={"#33609A"}
                margin={"3rem 0 0 0"}
                color="#f8f8f8"
            />
        </MatchFormST>
    )
}
