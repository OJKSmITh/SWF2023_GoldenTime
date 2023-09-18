import { IAccount } from "@utils/interface/interface"
import { ListUl } from "./list.styled"

export const NewAccount = ({ account }: { account: IAccount }) => {
    const { privateKey, publicKey, address } = account
    const getFirstAndLastSixChars = (str: string) => str.slice(0, 8) + "..." + str.slice(-6)

    const displayAddress = getFirstAndLastSixChars(address)
    const displayPrivateKey = getFirstAndLastSixChars(privateKey)
    const displayPublicKey = getFirstAndLastSixChars(publicKey)

    const handleCopyClick = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            alert(`${text} 복사되었습니다!`)
        } catch (err) {
            console.error("클립보드에 복사하지 못했습니다.", err)
        }
    }
    console.log(account)
    return (
        <ListUl>
            <li>
                <span>PrivateKey</span>
                <span onClick={() => handleCopyClick(privateKey)}>{displayPrivateKey}</span>
            </li>
            <li>
                <span>PublicKey</span>
                <span onClick={() => handleCopyClick(publicKey)}>{displayPublicKey}</span>
            </li>
            <li>
                <span>Account</span>
                <span onClick={() => handleCopyClick(address)}>{displayAddress}</span>
            </li>
            <span>
                PrivateKey를 분실하면 계정을 복구할 수 없습니다. <br />
                분실하지 않도록 주의해주세요.
            </span>
        </ListUl>
    )
}
