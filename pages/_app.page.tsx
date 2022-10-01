import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import {theme} from "dh-marvel/styles/material-theme";
import { OrderContext } from 'context/OrderContext';
import { useState } from 'react';
import { Comic } from 'types';
import { AddressInfoContext } from 'context/AddressInfoContext';
import { PersonalInfoContext } from 'context/PersonalInfoContext';
import { PersonalInformationData } from 'dh-marvel/components/forms/PersonalInformationForm';
import { AddressData } from 'dh-marvel/components/forms/AddressForm';



function MyApp({ Component, pageProps }: AppProps) {
  const [order, setOrder] = useState<Comic>()
  const [personalInfo, setPersonalInfo] = useState<PersonalInformationData>();
  const [addressInfo, setAddressInfo] = useState<AddressData>();


  const LayoutComponent = (Component as any).Layout;
  
  return <ThemeProvider theme={theme}>
     <OrderContext.Provider value={{order, setOrder}}>
            <AddressInfoContext.Provider value={{ addressInfo, setAddressInfo }} >
              <PersonalInfoContext.Provider value={{ personalInfo, setPersonalInfo }} >
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
           
           </PersonalInfoContext.Provider>
            </AddressInfoContext.Provider>
          </OrderContext.Provider>
  </ThemeProvider>
}

export default MyApp
