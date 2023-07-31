export interface BtnProps {
    bg: string
    width: number | string
    margin?: string
    height: number | string
    color?: string
    disabled?: boolean
    onClick?: (e:MouseEvent) => void
}
