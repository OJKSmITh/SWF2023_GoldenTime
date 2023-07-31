import { DivProps } from 'interface/styled.interface';
import { styled } from 'styled-components';

export const DivBasicST = styled.div<DivProps>`
    width: ${(props)=> props.width? props.width:5}rem;
    height: ${(props)=> props.height? props.height:5}rem;  
    font-size: ${(props)=> props.size? props.size:1}rem;
    display: ${(props)=> props.flex? "flex": ""};
    justify-content: ${(props)=> props.justify? "center": ""};
    align-items: ${(props)=> props.align? "center": ""};
`

export const DivflexST = styled.div<DivProps>`
    width: ${(props)=> props.width? props.width:5}rem;
    height: ${(props)=> props.height? props.height:5}rem;
    font-size: ${(props)=> props.size? props.size:1}rem;
    display: ${(props)=> props.flex? "flex": ""};
    flex-direction: ${(props)=> props.direction? props.direction:""};
`
