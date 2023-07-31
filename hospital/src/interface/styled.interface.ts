export interface BtnProps{
    text?: string
    color?: string
    width?: number
    height?: number
    size?: number
    onclick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface DivProps{
    width?: number
    height? : number | string
    justify? :string
    align? : string
    flex? : string
    size? : number
    direction?: string
    right? :number
}