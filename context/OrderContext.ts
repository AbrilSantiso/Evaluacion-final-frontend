import { createContext, useContext } from "react"
import { Comic } from "types"

export type OrderContent = {
  order: Comic | undefined,
  setOrder:(comic: Comic) => void
} 

export const OrderContext = createContext<OrderContent>({
order: undefined,
setOrder: (comic: Comic) => {}
}
)
export const useOrderContext = () => useContext(OrderContext)