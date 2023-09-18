export interface IBtn {
    text: string
    bg: string
    height: number | string
    width: number | string
    id?: string
    margin?: string
    color?: string
    disable?: boolean
    hover: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export interface IHospital {
    tokenId: number
    hospital: string
    state: boolean
    reason: string
}

export interface IInput {
    label: string
    placeholder?: string
    width: number | string
    height: number | string
    type?: string
    disable?: boolean
    value?: string
}

export interface ISubmitBtn extends IBtn {}

export interface IAccount {
    privateKey: string
    publicKey: string
    address: string
}

export interface Ilocation {
    lat: number
    lng: number
}
