import TextFieldWrapper from '../textFieldWrapper';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect } from 'react';

export const PaymentSchema = yup.object({
    "Número de tarjeta": yup.string().required('El número de tarjeta es requerido').min(13, 'El número de tarjeta debe tener minimo 13 caracteres'),
    "Nombre como aparece en la tarjeta": yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener minimo 3 caracteres'),
    "EXP MM/YY": yup.string().required('La fecha de expiración es requerida').length(5, "El formato de la fecha de expiración no es el correcto"),
    CVV : yup.string().required('El código de seguridad es requerido').length(3, "El formato del código de seguridad no es el correcto")
}).required();

export type FormData = {
    "Número de tarjeta": string,
    "Nombre como aparece en la tarjeta": string,
    "EXP MM/YY": string,
    CVV: string
}

export type PaymentFormProps = {
    handleNext: () => void
}

const PaymentForm: FC<PaymentFormProps> = ({ handleNext }: PaymentFormProps) => {
    //PREGUNTAR COMO TIPAR EL CONTROL
    const { handleSubmit, setFocus, control } = useForm({ resolver: yupResolver(PaymentSchema) });

    const onSubmit = (data: any) => {
        handleNext();
        console.log(data)
    }

    useEffect(() => {
        setFocus("Número de tarjeta");
    }, [])

    return (
        <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6'>
                Datos del pago           
                </Typography>
            <TextFieldWrapper control={control} name="Número de tarjeta" defaultValue={""} />
            <TextFieldWrapper control={control} name="Nombre como aparece en la tarjeta" defaultValue={""} />
            <TextFieldWrapper control={control} name="EXP MM/YY" defaultValue={""} />
            <TextFieldWrapper control={control} name="CVV" defaultValue={""} />
            <Button type="submit">Finalizar</Button>
        </Box>
    )
}

export default PaymentForm;