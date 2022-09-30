import { Alert, Box, Button, Snackbar, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useOrderContext } from "context/OrderContext";
import { PersonalInfoContext, usePersonalInfoContext } from "context/PersonalInfoContext";
import AddressForm, { AddressData } from "dh-marvel/components/forms/AddressForm";
import PaymentForm, { PaymentInformationData } from "dh-marvel/components/forms/PaymentForm";
import PersonalInformationForm, { PersonalInformationData } from "dh-marvel/components/forms/PersonalInformationForm";
import ProductCard from "dh-marvel/components/home/productCard/productCard";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { AddressInfoContext, useAddressInfoContext } from "context/AddressInfoContext";
import { PaymentInfoContext, usePaymentInfoContext } from "context/PaymentInfoContext";



const CheckoutPage: NextPage = () => {

  const { order: orderInfo } = useOrderContext();
  const { paymentInfo: paymentInformation } = usePaymentInfoContext();
  const { personalInfo: personalInformation } = usePersonalInfoContext();
  const { addressInfo: addressInformation } = useAddressInfoContext();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInformationData>();
  const [addressInfo, setAddressInfo] = useState<AddressData>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInformationData>();
  const [error, setError] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);


  const onSubmit = async () => {

    fetchCheckout().then(()=>{
      console.log(error)
      if(error){
        setOpen(true)
      }

    })

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const fetchCheckout = async () => {
    const checkoutData = {
      customer: {
        name: personalInformation?.Nombre,
        lastname: personalInformation?.Apellido,
        email: personalInformation?.Email,
        address: {
          address1: addressInformation?.Dirección,
          address2: addressInformation?.Departamento,
          city: addressInformation?.Ciudad,
          state: addressInformation?.Provincia,
          zipCode: addressInformation?.["Codigo Postal"]
        },
      },
      card: {
        number: paymentInformation?.["Número de tarjeta"],
        cvc: paymentInformation?.CVV,
        expDate: paymentInformation?.["EXP MM/YY"],
        nameOnCard: paymentInformation?.["Nombre como aparece en la tarjeta"]
      },
      order: {
        name: orderInfo?.title,
        image: orderInfo?.thumbnail,
        price: orderInfo?.price
      },
    }

    await fetch(`/api/checkout`, {
      method: 'POST', body: JSON.stringify(checkoutData), headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      if (res.status !== 200) {
        let data = await res.json()
        setError(data.message)
      }
    })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (!orderInfo) {
    return (
      <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "30px" }}>No tienes ningún comic en tu carrito</Typography>
        <Link href="/">Volver al home</Link>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography align="center" variant="h4">
        Checkout:
      </Typography>
      <Box sx={{ width: '100%', display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>

        <Box sx={{ width: '100%', display: "flex", flexDirection: "column", margin: "0 20px", '@media (min-width:1400px)': { width: '70%' } }}>
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
          <PaymentInfoContext.Provider value={{ paymentInfo, setPaymentInfo }} >
            <AddressInfoContext.Provider value={{ addressInfo, setAddressInfo }} >
              <PersonalInfoContext.Provider value={{ personalInfo, setPersonalInfo }} >
                {activeStep === 0 && <PersonalInformationForm handleNext={handleNext} />}
                {activeStep === 1 && <AddressForm handleNext={handleNext} handleBack={handleBack} />}
                {activeStep === 2 && <PaymentForm handleNext={onSubmit} handleBack={handleBack} />}
              </PersonalInfoContext.Provider>
            </AddressInfoContext.Provider>
          </PaymentInfoContext.Provider>
        </Box>
        <ProductCard comic={orderInfo} isCheckout />
        <Snackbar open={open} autoHideDuration={6000} onClose={()=>{setOpen(false)}}>
          <Alert onClose={()=>{setOpen(false)}} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>)
}
(CheckoutPage as any).Layout = LayoutCheckout;
export default CheckoutPage;