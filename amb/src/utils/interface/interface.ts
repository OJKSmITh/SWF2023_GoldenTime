export interface IBtn {
    text: string
    bg: string
    height: number | string
    width: number | string
    id?: string
    onClick?: (e: MouseEvent) => void
    margin?: string
    color?: string
    disable?: boolean

}
export interface IHospital {
    tokenId: number
    hospital: string
    state: boolean
    reason: string
}
