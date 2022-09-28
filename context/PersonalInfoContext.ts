import { createContext, useContext } from "react"

export type PersonalInfoContent = {
  personalInfo: PersonalInfoStateType | undefined,
  setPersonalInfo:(state: PersonalInfoStateType) => void
}

export type PersonalInfoStateType = {
  nombre: string,
    apellido:string,
    email: string
}


export const PersonalInfoContext = createContext<PersonalInfoContent>({
  personalInfo:{
    nombre: "",
    apellido: "",
    email: ""
  },
  setPersonalInfo: (state: PersonalInfoStateType) => {}}
)
export const usePersonalInfoContext = () => useContext(PersonalInfoContext)