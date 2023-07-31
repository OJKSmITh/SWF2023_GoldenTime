import { ethers } from "ethers"
import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist({
    key: "AMB",
    storage: localStorage,
})
export type SignedContractState = ethers.Contract | null

export const TokenId = atom({
    key: "TokenId",
    default: 0,
    effects_UNSTABLE: [persistAtom],
})
export const SignedContract = atom<SignedContractState>({
    key: "SignedContract",
    default: null,
})
