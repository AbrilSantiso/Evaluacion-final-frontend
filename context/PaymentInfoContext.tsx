import { PaymentInformationData } from "dh-marvel/components/forms/PaymentForm"
import { createContext, useContext } from "react"

export type PaymentInfoContent = {
  paymentInfo: PaymentInformationData | undefined,
  setPaymentInfo:(state: PaymentInformationData) => void
}

export const PaymentInfoContext = createContext<PaymentInfoContent>({
  paymentInfo: undefined,
  setPaymentInfo: (state: PaymentInformationData) => {}}
)
export const usePaymentInfoContext = () => useContext(PaymentInfoContext)