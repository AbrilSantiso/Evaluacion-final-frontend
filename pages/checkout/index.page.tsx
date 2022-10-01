import { Alert, Box, Button, Snackbar, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useOrderContext } from "dh-marvel/context/OrderContext";
import {  usePersonalInfoContext } from "context/PersonalInfoContext";
import AddressForm from "dh-marvel/components/forms/AddressForm";
import PaymentForm, { PaymentInformationData } from "dh-marvel/components/forms/PaymentForm";
import PersonalInformationForm from "dh-marvel/components/forms/PersonalInformationForm";
import ProductCard from "dh-marvel/components/home/productCard/productCard";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAddressInfoContext } from "context/AddressInfoContext";
import { useRouter } from 'next/router'



const CheckoutPage: NextPage = () => {

  const { order: orderInfo } = useOrderContext();
  const { personalInfo } = usePersonalInfoContext();
  const { addressInfo} = useAddressInfoContext();

  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [succes, setSucces] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [paymentInfo,  setPaymentInfo] = useState<PaymentInformationData>();

  const handleChangePaymentInfo = (paymentInformation: PaymentInformationData) => {
    setPaymentInfo(paymentInformation)
  }

  useEffect(() => {
    if (succes) {
      router.push("/confirmacion-compra")
      return
    };
    if (error) {
      setOpen(true)
    };
  }, [error, succes])

  useEffect(() => {
    if (paymentInfo) {
      onSubmit();
    };
    
  }, [paymentInfo])


  const onSubmit = async () => {
    fetchCheckout();
  }

  const translateErrors = (error: string) => {
    switch (error) {
      case 'INCORRECT_ADDRESS':
        setError("Dirección de entrega incorrecta");
        break;
      case 'CARD_WITHOUT_FUNDS':
        setError("Tarjeta sin fondos disponibles");
        break;
      case 'CARD_WITHOUT_AUTHORIZATION':
        setError("Tarjeta sin autorización. Comuníquese con su banco e intente nuevamente.")
        break;
      case 'CARD_DATA_INCORRECT':
        setError("Datos de tarjeta incorrecta");
        break;
      default:
        setError("Error de servidor. Intente nuevamente")
    }
  };

  const fetchCheckout = async () => {
    const checkoutData = {
      customer: {
        name: personalInfo?.Nombre,
        lastname: personalInfo?.Apellido,
        email: personalInfo?.Email,
        address: {
          address1: addressInfo?.Dirección,
          address2: addressInfo?.Departamento,
          city: addressInfo?.Ciudad,
          state: addressInfo?.Provincia,
          zipCode: addressInfo?.["Codigo Postal"]
        },
      },
      card: {
        number: paymentInfo?.["Número de tarjeta"],
        cvc: paymentInfo?.CVV,
        expDate: paymentInfo?.["EXP MM/YY"],
        nameOnCard: paymentInfo?.["Nombre como aparece en la tarjeta"]
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
        translateErrors(data.error)
      } else {
        setSucces(true);
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
                {activeStep === 0 && <PersonalInformationForm handleNext={handleNext} />}
                {activeStep === 1 && <AddressForm handleNext={handleNext} handleBack={handleBack} />}
                {activeStep === 2 && <PaymentForm  handleBack={handleBack} handleNext={handleChangePaymentInfo}/>}
        </Box>
        <ProductCard comic={orderInfo} isCheckout />
        <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
          <Alert onClose={() => { setOpen(false) }} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>)
}
(CheckoutPage as any).Layout = LayoutCheckout;
export default CheckoutPage;