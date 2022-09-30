import TextFieldWrapper from '../textFieldWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect } from 'react';
import { usePaymentInfoContext } from 'context/PaymentInfoContext';

export const PaymentSchema = yup.object({
    "Número de tarjeta": yup.string().required('El número de tarjeta es requerido').min(13, 'El número de tarjeta debe tener minimo 13 caracteres'),
    "Nombre como aparece en la tarjeta": yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener minimo 3 caracteres'),
    "EXP MM/YY": yup.string().required('La fecha de expiración es requerida').length(5, "El formato de la fecha de expiración no es el correcto"),
    CVV : yup.string().required('El código de seguridad es requerido').length(3, "El formato del código de seguridad no es el correcto")
}).required();

export type PaymentInformationData = {
    "Número de tarjeta": string,
    "Nombre como aparece en la tarjeta": string,
    "EXP MM/YY": string,
    CVV: string
}

export type PaymentFormProps = {
    handleNext: () => void,
    handleBack: () => void
}

const PaymentForm: FC<PaymentFormProps> = ({ handleNext, handleBack }: PaymentFormProps) => {

    const {setPaymentInfo} = usePaymentInfoContext();

    const methods = useForm<PaymentInformationData>({
        resolver: yupResolver(PaymentSchema)
    });  
    const { setFocus, handleSubmit} = methods;

    const onSubmit = (data: any) => {
        setPaymentInfo(data);
        handleNext();
    }

    useEffect(() => {
        setFocus("Número de tarjeta");
    }, [])

    return (
        <Box sx={{ width: '95%', display: "flex", flexDirection: "column" }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6'>
                Datos del pago           
                </Typography>
                <FormProvider {...methods}>
            <TextFieldWrapper  name="Número de tarjeta" defaultValue={""} />
            <TextFieldWrapper  name="Nombre como aparece en la tarjeta" defaultValue={""} />
            <TextFieldWrapper  name="EXP MM/YY" defaultValue={""} />
            <TextFieldWrapper  name="CVV" defaultValue={""} />
            </FormProvider>
            <Box sx={{ display: 'flex',width: '100%', justifyContent: "space-between"}}>
            <Button  onClick={handleBack} variant='outlined'>Anterior</Button>
            <Button type="submit" variant='contained'>Seguir</Button>
          </Box>
        </Box>
    )
}

export default PaymentForm;