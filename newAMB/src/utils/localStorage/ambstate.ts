import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist({
    key: "AMB",
    storage: localStorage,
})

export const TokenId = atom({
    key: "TokenId",
    default: null,
    effects_UNSTABLE: [persistAtom],
})
export const SelectHopital = atom<string | null>({
    key: "SelectHopital",
    default: null,
    effects_UNSTABLE: [persistAtom],
})
