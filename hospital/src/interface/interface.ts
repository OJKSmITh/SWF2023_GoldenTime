import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IBtn {
    text: string;
    color: string;
}
export interface IDiv {
    width?: number;
    height?: number;
    flex?: string;
    text?: string;
}

export interface IHosMain {
    Amb?: string;
    PatientState?: string;
}

export interface ICustomModal {
    isOpen?: boolean;
    content?: ReactNode;
    onClose?: Dispatch<SetStateAction<boolean>>;
    width?: number;
    height?: number;
    left?: number;
}

export interface IKTASProps {
    ktas?: string | number;
    key?: number;
}
