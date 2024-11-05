import {create} from 'zustand'

type SideBarStoreProps = {
    itemOpenIndex: number,
    setItemOpenIndex: (index: number) => void
}


export const useSideBarStore = create<SideBarStoreProps>((set) => ({
    itemOpenIndex: 0,
    setItemOpenIndex: (index) => set(() => ({itemOpenIndex: index}))
}))

/*type LoginStoreProps = {
    email: string;
    setEmail: (email: string) => void;
}

export const useLoginStore = create<LoginStoreProps>((set) => ({
    email: localStorage.getItem("email") || "",
    setEmail: (email) => {
        set(() => ({ email }));
        localStorage.setItem("email", email); // Met à jour localStorage
    },
}));*/

type EmployeStoreProps = {
    code: string;
    setCode: (code: string) => void;
    fullname: string;
    setFullname: (fullname: string) => void;
    email: string;
    setEmail: (email: string) => void;
}

export const useEmployeStore = create<EmployeStoreProps>((set) => ({
    code: localStorage.getItem("emp_code") || "",
    setCode: (code) => {
        set(() => ({ code }));
        localStorage.setItem("emp_code", code);
    },
    fullname: localStorage.getItem("emp_fullname") || "",
    setFullname: (fullname) => {
        set(() => ({ fullname }));
        localStorage.setItem("emp_fullname", fullname);
    },
    email: localStorage.getItem("emp_email") || "",
    setEmail: (email) => {
        set(() => ({ email }));
        localStorage.setItem("emp_email", email);
    },
}));



