import TextFieldWrapper from '../textFieldWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { FC, useEffect } from 'react';


export const PaymentSchema = yup.object({
    "Número de tarjeta": yup.string().required('El número de tarjeta es requerido').min(13, 'El número de tarjeta debe tener minimo 13 caracteres'),
    "Nombre como aparece en la tarjeta": yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener minimo 3 caracteres'),
    "EXP MM/YY": yup.string().required('La fecha de expiración es requerida').length(5, "El formato de la fecha de expiración no es el correcto"),
    CVV: yup.string().required('El código de seguridad es requerido').length(3, "El formato del código de seguridad no es el correcto")
}).required();

export type PaymentInformationData = {
    "Número de tarjeta": string,
    "Nombre como aparece en la tarjeta": string,
    "EXP MM/YY": string,
    CVV: string,
    focus: Focused | undefined
}

export type PaymentFormProps = {
    handleBack: () => void,
    handleNext: (data: PaymentInformationData) => void,
}

const PaymentForm: FC<PaymentFormProps> = ({ handleBack, handleNext }: PaymentFormProps) => {

    const methods = useForm<PaymentInformationData>({
        resolver: yupResolver(PaymentSchema),
        defaultValues: {
          "Número de tarjeta": "",
          "Nombre como aparece en la tarjeta": "",
          "EXP MM/YY": "",
          CVV: "",
          focus: "number",
        },
    });
    const { setFocus, handleSubmit, watch, setValue } = methods;

    const cvc = watch("CVV");
    const expiry = watch("EXP MM/YY");
    const name = watch("Nombre como aparece en la tarjeta");
    const number = watch("Número de tarjeta");
    const focus = watch("focus");

    const onSubmit = (data: PaymentInformationData) => {
        handleNext(data);
    }

    const handleFocus = (e: any) => {
        setValue("focus", e.target.name);
      };

    useEffect(() => {
        setFocus("Número de tarjeta");
    }, [])

    return (
        <Box sx={{ width: '95%', display: "flex", flexDirection: "column" }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6'>
                Datos del pago
            </Typography>
            <FormProvider {...methods}>
            <Cards
              cvc={cvc}
              expiry={expiry}
              name={name}
              number={number}
              focused={focus}
            />
                <TextFieldWrapper name="Número de tarjeta" defaultValue={""} onFocus={handleFocus}/>
                <TextFieldWrapper name="Nombre como aparece en la tarjeta" defaultValue={""} onFocus={handleFocus}/>
                <TextFieldWrapper name="EXP MM/YY" defaultValue={""} onFocus={handleFocus}/>
                <TextFieldWrapper name="CVV" defaultValue={""} onFocus={handleFocus}/>
            </FormProvider>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: "space-between", marginBottom:"10px"}}>
                <Button onClick={handleBack} variant='outlined'>Anterior</Button>
                <Button type="submit" variant='contained'>Seguir</Button>
            </Box>
        </Box>
    )
}

export default PaymentForm;