import { Header } from "@components/header"
import { Input } from "@components/input"
import { SearchMaps } from "@components/searchMap"
import { MapWrapper } from "@styled/index"
import { useRef, useEffect, useState } from "react"
declare const kakao: any

export const Maps = () => {
    const mapRef = useRef(null) // 지도를 담을 ref 생성
    const [location, setLocation] = useState({ lat: 0, lng: 0 }) // 현재 위치 [위도, 경도

    useEffect(() => {
        const defaultPosition = new kakao.maps.LatLng(37.541, 126.986) // 기본 위치
        const options = {
            center: defaultPosition,
            level: 5,
        }
        let map = new kakao.maps.Map(mapRef.current, options) // 지도 생성
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            console.log(`위도: ${position.coords.latitude}`)
            console.log(`경도: ${position.coords.longitude}`)
            setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
            options.center = new kakao.maps.LatLng(location.lat, location.lng)
            options.level = 1
            // 지도 생성
            map.setCenter(options.center)
            map.setLevel(options.level)
        })
    }, [mapRef])

    useEffect(() => {
        console.log(location)
        const center = new kakao.maps.LatLng(location.lat, location.lng)
        const level = 1
        let map = new kakao.maps.Map(mapRef.current, { center, level }) // 지도 생성
        // 지도 생성
        map.setCenter(center)
        map.setLevel(level)
        const message = '<div style="padding:5px; color:#000">여기에 계신가요?!</div>' // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(center, message, map)
    }, [location])

    const displayMarker = (locPosition: any, message: string, map: any) => {
        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
        })

        let iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true

        // 인포윈도우를 생성합니다
        let infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
        })

        // 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker)

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition)
    }

    return (
        <>
            <Header text={"위치 찾기"} />
            <MapWrapper ref={mapRef} />
            {typeof kakao !== "undefined" && kakao.maps && <SearchMaps kakao={kakao} setLocation={setLocation} />}
        </>
    )
}
