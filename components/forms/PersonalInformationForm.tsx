import TextFieldWrapper from '../textFieldWrapper';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Box, Button, Typography} from "@mui/material";
import { FC, useEffect } from 'react';

export const personalInformationSchema = yup.object({
    Nombre: yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener minimo 3 caracteres'),
    Apellido: yup.string().required('El apellido es requerido').min(3, 'El apellido debe tener minimo 3 caracteres'),
    Email: yup.string().email("El email no tiene un formato válido").required('El email es requerido')
}).required();

export type FormData = {
    Nombre: string,
    Apellido: string,
    Email: string
}

export type PersonalInformationFormProps = {
    handleNext: () => void
}

const PersonalInformationForm:FC<PersonalInformationFormProps> = ({handleNext}:PersonalInformationFormProps) => {
//PREGUNTAR COMO TIPAR EL CONTROL
    const {handleSubmit, setFocus, control} = useForm({resolver: yupResolver(personalInformationSchema)});
    
    const onSubmit = (data:any) => {
        handleNext();
        console.log(data)
    }
        
    useEffect(() => {
        setFocus("Nombre");
    },[])

    return (
        <Box sx={{width: '90%', display:"flex", flexDirection:"column"}}  component="form" onSubmit={handleSubmit(onSubmit)}>
           <Typography variant='h6'>
            Datos personales
           </Typography>
         <TextFieldWrapper control={control} name="Nombre" defaultValue={""} />
         <TextFieldWrapper control={control} name="Apellido" defaultValue={""}/>
         <TextFieldWrapper control={control} name="Email" defaultValue={""} />
         <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button type="submit" variant='contained'>Seguir</Button>
          </Box>
        </Box>
    )
}

export default PersonalInformationForm;