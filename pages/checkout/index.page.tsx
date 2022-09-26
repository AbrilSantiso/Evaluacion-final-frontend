import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import AddressForm from "dh-marvel/components/forms/AddressForm";
import PaymentForm from "dh-marvel/components/forms/PaymentForm";
import PersonalInformationForm from "dh-marvel/components/forms/PersonalInformationForm";
import ProductCard from "dh-marvel/components/home/productCard/productCard";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import { useState } from "react";


const CheckoutPage: NextPage = () => {

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

          {activeStep === 0 && <PersonalInformationForm handleNext={handleNext} />}
          {activeStep === 1 && <AddressForm handleNext={handleNext} />}
          {activeStep === 2 && <PaymentForm handleNext={handleNext} />}
        </Box>
      {<ProductCard comic={{
    "id": 331,
    "title": "Gun Theory (2003) #4",
            "price": 2,
    "thumbnail": {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/60/4bc69f11baf75",
        "extension": "jpg"
    }
    
}} isCheckout/>}  
      </Box>
    </Box>
  )
}
(CheckoutPage as any).Layout = LayoutCheckout;
export default CheckoutPage;