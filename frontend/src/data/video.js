import { atom } from 'jotai'

const videoURICore = atom("")
const videoURI = atom((get) => get(videoURICore), (get, set, action) => set(videoURICore, action.value))

export default videoURI