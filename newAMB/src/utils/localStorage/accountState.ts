import { IAccount } from "@utils/interface/interface"
import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist({
    key: "Account",
    storage: localStorage,
})

export const myAccountState = atom<IAccount | null>({
    key: "myAccountState",
    default: null,
    effects_UNSTABLE: [persistAtom],
})
