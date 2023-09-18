export interface BtnProps {
    bg: string
    width: number | string
    margin?: string
    height: number | string
    color?: string
    disabled?: boolean
    hover: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    children?: React.ReactNode
    type?: string
}
