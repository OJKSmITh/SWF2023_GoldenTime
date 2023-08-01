import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "Hospital",
    storage: localStorage,
});

export const PatientList = atom({
    key: "PatientList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

