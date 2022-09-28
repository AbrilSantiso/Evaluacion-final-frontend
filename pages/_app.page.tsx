import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import {theme} from "dh-marvel/styles/material-theme";
import { OrderContext } from 'context/OrderContext';
import { useState } from 'react';
import { Comic } from 'types';


function MyApp({ Component, pageProps }: AppProps) {
  const [order, setOrder] = useState<Comic>()

  const LayoutComponent = (Component as any).Layout;
  
  return <ThemeProvider theme={theme}>
     <OrderContext.Provider value={{order, setOrder}}>
    <CssBaseline />
   
    {LayoutComponent && 
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
      }
      {!LayoutComponent && 
        <LayoutGeneral>
        <Component {...pageProps} />
      </LayoutGeneral>
      }
    <style jsx global>{`
              /* Other global styles such as 'html, body' etc... */

              #__next {
                height: 100%;
              }
            `}</style>
           </OrderContext.Provider>
  </ThemeProvider>
}

export default MyApp
