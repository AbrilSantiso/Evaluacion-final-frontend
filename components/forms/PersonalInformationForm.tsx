import TextFieldWrapper from '../textFieldWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { FC, useEffect } from 'react';
import {  usePersonalInfoContext} from 'dh-marvel/context/PersonalInfoContext';

export const personalInformationSchema = yup.object({
    Nombre: yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener minimo 3 caracteres'),
    Apellido: yup.string().required('El apellido es requerido').min(3, 'El apellido debe tener minimo 3 caracteres'),
    Email: yup.string().email("El email no tiene un formato válido").required('El email es requerido')
}).required();

export type PersonalInformationData = {
    Nombre: string,
    Apellido: string,
    Email: string
}

export type PersonalInformationFormProps = {
    handleNext: () => void
}

const PersonalInformationForm: FC<PersonalInformationFormProps> = ({ handleNext }: PersonalInformationFormProps) => {
    
    const {setPersonalInfo: setPersonalInfoConContext} = usePersonalInfoContext();

    const methods = useForm<PersonalInformationData>({
        resolver: yupResolver(personalInformationSchema)
    });

    const { setFocus, handleSubmit } = methods;
   
    
    const onSubmit = (data: any) => {
        setPersonalInfoConContext(data)
        handleNext();
    }

    useEffect(() => {
        setFocus("Nombre");
    }, [])

    return (
        <Box sx={{ width: '95%', display: "flex", flexDirection: "column" }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6'>
                Datos personales
            </Typography>
            <FormProvider {...methods}>
            <TextFieldWrapper  name="Nombre" defaultValue={""} />
            <TextFieldWrapper  name="Apellido" defaultValue={""} />
            <TextFieldWrapper  name="Email" defaultValue={""} />
            </FormProvider>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: "flex-end !important" }}>
                <Button type="submit" variant='contained'>Seguir</Button>
            </Box>
        </Box>
    )
}

export default PersonalInformationForm;