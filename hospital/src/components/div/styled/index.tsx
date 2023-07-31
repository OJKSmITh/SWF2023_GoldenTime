import { DivProps } from 'interface/styled.interface';
import { styled } from 'styled-components';

export const DivBasicST = styled.div<DivProps>`
    width: ${(props)=> props.width? props.width:5}rem;
    height: ${(props)=> props.height? props.height:5}rem;
    font-size: ${(props)=> props.size? props.size:1}rem;
    display: ${(props)=> props.flex? "flex": ""};
    flex-direction: ${(props)=> props.direction? props.direction:""};
    justify-content: ${(props)=> props.justify? "flex-start": ""};
    align-items: ${(props)=> props.align? "flex-start": ""};
`

export const DivTextST = styled.div<DivProps>`
    width: ${(props)=> props.width? props.width:5}rem;
    height: ${(props)=> props.height? props.height:5}rem;
    font-size: ${(props)=> props.size? props.size:1}rem;
    display: ${(props)=> props.flex? "flex": ""};
    flex-direction: ${(props)=> props.direction? props.direction:""};
    justify-content: ${(props)=> props.justify? "center": ""};
    align-items: ${(props)=> props.align? "center": ""};
`

export const DivWrapST = styled.div<DivProps>`
    width: ${(props)=> props.width? props.width:5}%;
    height: ${(props)=> props.height? props.height:5}%;
    font-size: ${(props)=> props.size? props.size:1}rem;
    display: ${(props)=> props.flex? "flex": ""};
    flex-direction: ${(props)=> props.direction? props.direction:""};
    justify-content: ${(props)=> props.justify? "flex-start": ""};
    align-items: ${(props)=> props.align? "flex-start": ""};
    margin-top:${(props)=> props.right? props.right: 0}rem;
`
export const DivContentWrapST = styled.div<DivProps>`
    width: ${(props)=> props.width? props.width:5}%;
    height: ${(props)=> props.height? props.height:5}%;
    font-size: ${(props)=> props.size? props.size:1}rem;
    display: ${(props)=> props.flex? "flex": ""};
    flex-direction: ${(props)=> props.direction? props.direction:""};
    justify-content: ${(props)=> props.justify? "center": ""};
    align-items: ${(props)=> props.align? "center": ""};
    margin-top:${(props)=> props.right? props.right: 0}rem;
`


