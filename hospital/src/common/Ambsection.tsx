import { Btn } from '@components/button/button'
import { DivflexST } from '@components/div'
import { DivBasicST } from '@components/div'
import { IHosMain } from 'interface/interface'




export const AmbSection = ({Amb, PatientState}:IHosMain) =>{
    const a='{"KTAS": 1, "age": 1, "gender": 1, "state": "환자상태입니다."}';
    const realA = JSON.parse(a)
    const {KTAS, age, gender, state}= realA

    let KTASMessage = '';
    switch (KTAS) {
    case 1:
        KTASMessage = 'KTAS 1단계';
        break;
    case 2:
        KTASMessage = 'KTAS 2단계';
        break;
    case 3:
        KTASMessage = 'KTAS 3단계';
        break;
    case 4:
        KTASMessage = 'KTAS 4단계';
        break;
    case 5:
        KTASMessage = 'KTAS 5단계';
        break;
    default:
        KTASMessage = 'KTAS 정보 없음';
        break;
    }
    let genderString = "";
    switch (gender) {
        case 1:
            genderString = '남자';
            break;
        case 2:
            genderString = '여자';
            break;
        default:
            genderString = '성별정보 없음';
            break;
        }
    let ageString ="";
    switch (gender) {
        case 1:
            genderString = '남자';
            break;
        case 2:
            genderString = '여자';
            break;
        default:
            genderString = '성별정보 없음';
            break;
        }

    return (
        <>
            <DivflexST width={122.3} height={55.4} flex={"true"} direction={"column"}>
                <DivflexST width={122.3} height={5.2} flex={"true"}>
                    <DivBasicST width={12.9} height={4.8} flex={"true"} size={3} justify={"true"} align={"true"}>{Amb}</DivBasicST>       
                    <Btn width={8} height={4.8} text={"수락"} size={2}></Btn>        
                    <Btn width={8} height={4.8} text={"거절"} size={2} ></Btn>        
                </DivflexST>
                <DivBasicST width={51.4} height={23.3} size={3}>
                    KTAS : {KTASMessage}
                    <br/>
                    환자 나이:{age}
                    <br/>
                    성별 :{genderString}
                    <br/>
                    환자 상태 : {}
                </DivBasicST>
            </DivflexST>
        </>
    )
}