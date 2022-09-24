import TextFieldWrapper from '../textFieldWrapper';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect } from 'react';

export const personalInformationSchema = yup.object({
    Firstname: yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener minimo 3 caracteres'),
    Surname: yup.string().required('El apellido es requerido').min(3, 'El apellido debe tener minimo 3 caracteres'),
    Email: yup.string().email("El email no tiene un formato válido").required('El email es requerido')
}).required();

export type FormData = {
    Firstname: string,
    Surname: string,
    Email: string
}

export type PersonalInformationFormProps = {
    handleNext: () => void
}

const PaymentForm: FC<PersonalInformationFormProps> = ({ handleNext }: PersonalInformationFormProps) => {
    //PREGUNTAR COMO TIPAR EL CONTROL
    const { handleSubmit, setFocus, control } = useForm({ resolver: yupResolver(personalInformationSchema) });

    const onSubmit = (data: any) => {
        handleNext();
        console.log(data)
    }

    useEffect(() => {
        setFocus("Firstname");
    }, [])

    return (
        <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center" }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h4'>
                Datos del pago           
                </Typography>
            <TextFieldWrapper control={control} name="Firstname" defaultValue={""} />
            <TextFieldWrapper control={control} name="Surname" defaultValue={""} />
            <TextFieldWrapper control={control} name="Email" defaultValue={""} />
            <Button type="submit">Seguir</Button>
        </Box>
    )
}

export default PaymentForm;