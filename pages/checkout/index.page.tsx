import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";
import { NextPage } from "next";
import { useState} from "react";


const CheckoutPage: NextPage = () => {

    const [activeStep, setActiveStep] = useState<number>(0);
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    return (
        <Box sx={{width: '100%', display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Stepper
                sx={{width: '80%', marginBottom: 2, marginTop: 4}}
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
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            
            <Button onClick={handleNext}>
              {activeStep === 2 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </Box>
        )
}

export default CheckoutPage;