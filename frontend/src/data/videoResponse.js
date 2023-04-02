import { atom } from "jotai"

const resCore = atom(null)
const response = atom(get => get(resCore), (get, set, action) => set(resCore, action.value))

export default response