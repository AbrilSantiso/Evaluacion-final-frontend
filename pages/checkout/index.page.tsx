import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useOrderContext } from "context/OrderContext";
import { PersonalInfoContext } from "context/PersonalInfoContext";
import AddressForm, { AddressData } from "dh-marvel/components/forms/AddressForm";
import PaymentForm from "dh-marvel/components/forms/PaymentForm";
import PersonalInformationForm, { PersonalInformationData } from "dh-marvel/components/forms/PersonalInformationForm";
import ProductCard from "dh-marvel/components/home/productCard/productCard";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { AddressInfoContext } from "context/AddressInfoContext";


const CheckoutPage: NextPage = () => {

  const {order} = useOrderContext();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInformationData>();
  const [addressInfo, setAddressInfo] = useState<AddressData>();


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if(!order){
    return (
      <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", height:"100%", justifyContent:"center" }}>
        <Typography variant="h4" sx={{marginBottom:"30px"}}>No tienes ningún comic en tu carrito</Typography>
      <Link href="/">Volver al home</Link>
      </Box>
    )
  }

 return (
   <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center" }}>
  <Typography align="center" variant="h4">
    Checkout:
  </Typography>
  <Box sx={{ width: '100%', display: "flex", alignItems: "center", flexWrap:"wrap", justifyContent:"center" }}>

    <Box sx={{ width: '100%', display: "flex", flexDirection: "column", margin:"0 20px",  '@media (min-width:1400px)':{width: '70%'}}}>
      <Stepper
        sx={{ width: '90%', marginBottom: 2, marginTop: 4 }}
        activeStep={activeStep}>
        <Step>
          <StepLabel>Datos personales</StepLabel>
        </Step>
        <Step>
          <StepLabel>Dirección de entrega</StepLabel>
        </Step>
        <Step>
          <StepLabel>Datos del pago</StepLabel>
        </Step>
      </Stepper>
      <AddressInfoContext.Provider value={{addressInfo, setAddressInfo}} >
      <PersonalInfoContext.Provider value={{personalInfo, setPersonalInfo}} >
      {activeStep === 0 && <PersonalInformationForm handleNext={handleNext}  />}
      {activeStep === 1 && <AddressForm handleNext={handleNext} handleBack={handleBack}/>}
      {activeStep === 2 && <PaymentForm handleNext={handleNext} handleBack={handleBack}/>}
      </PersonalInfoContext.Provider>
      </AddressInfoContext.Provider>
    </Box>
   <ProductCard comic={order} isCheckout/> 
  </Box>
</Box> )
}
(CheckoutPage as any).Layout = LayoutCheckout;
export default CheckoutPage;