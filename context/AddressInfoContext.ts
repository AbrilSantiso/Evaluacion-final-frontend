import { AddressData } from "dh-marvel/components/forms/AddressForm"
import { createContext, useContext } from "react"

export type AddressInfoContent = {
  addressInfo: AddressData | undefined,
  setAddressInfo:(state: AddressData) => void
}


export const AddressInfoContext = createContext<AddressInfoContent>({
  addressInfo: undefined,
  setAddressInfo: (state: AddressData) => {}}
)
export const useAddressInfoContext = () => useContext(AddressInfoContext)