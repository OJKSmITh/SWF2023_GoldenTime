import { SubmitBtn, Btn } from "@components/button/button"
import { InputComp } from "@components/input/input"
import { NewAccount } from "@components/account"
import { sha256 } from "@utils/crypto/sha256"
import { myAccountState } from "@utils/localStorage"
import { Wallet } from "ethers"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

export const SigninForm = () => {
    const navigator = useNavigate()
    const [account, setAccount] = useState({ privateKey: "", publicKey: "", address: "" })
    const [myAccount, setMyAccount] = useRecoilState(myAccountState)
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const id = (e.currentTarget[0] as HTMLInputElement).value
        const password = (e.currentTarget[1] as HTMLInputElement).value
        const checkPassword = (e.currentTarget[2] as HTMLInputElement).value
        if (password !== checkPassword) return alert("비밀번호가 일치하지 않습니다.")
        const privateKey = "0x" + (await sha256(id + password))
        const wallet = new Wallet(privateKey)
        const publicKey = wallet.publicKey
        const address = wallet.address
        setAccount({ privateKey, publicKey, address })
        console.log("privateKey", privateKey, "publicKey", publicKey, "address", address)
        console.log("submit")
    }
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
                <InputComp
                    type={"password"}
                    label={"비밀번호 확인"}
                    placeholder={"Enter password"}
                    width={"100%"}
                    height={"4rem"}
                />
                <SubmitBtn
                    text={"계정 생성하기"}
                    bg={"#4786DA"}
                    hover={"#33609A"}
                    height={"4rem"}
                    width={"100%"}
                    margin={"2rem 0 0 0"}
                    color={"#f8f8f8"}
                />
            </form>
            <NewAccount account={account} />
            <Btn
                text={"회원가입 완료"}
                bg={"#4786DA"}
                hover={"#33609A"}
                height={"4rem"}
                width={"100%"}
                margin={"2rem 0 0 0"}
                color={"#f8f8f8"}
                onClick={() => {
                    confirm("Private Key를 저장하셨나요?")
                    setMyAccount(account)
                    navigator("/")
                }}
            />
        </>
    )
}
