import { ethers } from "ethers"
import { useEffect, useState } from "react"
import GoldenTime from "@contracts/GoldenTime.json"

declare global {
    interface Window {
        ethereum: any
    }
}

export const useSigner = () => {
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
    const [signer, setSigner] = useState<ethers.Signer | null>(null)
    const [contract, setContract] = useState<ethers.Contract | null>(null)

    useEffect(() => {
        if (!window.ethereum) return alert("메타마스크를 설치해주세요")
        const providers = new ethers.providers.Web3Provider(window.ethereum)
        const signers = providers.getSigner()
        setProvider(providers)
        setSigner(signers)
    }, [])
    useEffect(() => {
        if (!provider || !signer) return
        const contract = new ethers.Contract("0xf02F713033F0B7730dC3110101832Ab3eD5C183d", GoldenTime.abi, provider)
        const signedContract = contract.connect(signer)
        setContract(signedContract)
    }, [signer])

    return { provider, signer, contract }
}
