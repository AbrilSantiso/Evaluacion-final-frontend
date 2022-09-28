import { PersonalInformationData } from "dh-marvel/components/forms/PersonalInformationForm"
import { createContext, useContext } from "react"

export type PersonalInfoContent = {
  personalInfo: PersonalInformationData | undefined,
  setPersonalInfo:(state: PersonalInformationData) => void
}

export const PersonalInfoContext = createContext<PersonalInfoContent>({
  personalInfo: undefined,
  setPersonalInfo: (state: PersonalInformationData) => {}}
)
export const usePersonalInfoContext = () => useContext(PersonalInfoContext)