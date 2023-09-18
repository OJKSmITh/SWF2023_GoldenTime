import { InputComp } from "@components/input/input"
import { Btn, SubmitBtn } from "@components/button/button"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("submit")
    }
    const navigate = useNavigate()

    return (
        <>
            <form onSubmit={submitHandler} style={{ width: "100%", marginTop: "3rem" }}>
                <InputComp label={"구급차 계정"} placeholder={"Enter username"} width={"100%"} height={"4rem"} />
                <InputComp
                    type={"password"}
                    label={"비밀번호"}
                    placeholder={"Enter password"}
                    width={"100%"}
                    height={"4rem"}
                />
                <SubmitBtn
                    text={"로그인"}
                    bg={"#4786DA"}
                    hover={"#33609A"}
                    height={"4rem"}
                    width={"100%"}
                    margin={"5rem 0 0 0"}
                    color={"#f8f8f8"}
                />
            </form>
            <Btn
                text={"회원가입"}
                bg={"#dadada"}
                height={"4rem"}
                width={"100%"}
                margin={"2rem 0 0 0"}
                color={"#000"}
                hover={"#a1a1a1"}
                onClick={() => {
                    console.log("회원가입")
                    navigate("/signin")
                }}
            />
        </>
    )
}
