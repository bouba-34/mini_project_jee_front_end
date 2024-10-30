import {create} from 'zustand'

type SideBarStoreProps = {
    itemOpenIndex: number,
    setItemOpenIndex: (index: number) => void
}

const useSideBarStore = create<SideBarStoreProps>((set) => ({
    itemOpenIndex: 0,
    setItemOpenIndex: (index) => set(() => ({itemOpenIndex: index}))
}))

export {useSideBarStore}