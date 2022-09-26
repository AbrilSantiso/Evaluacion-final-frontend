import TextFieldWrapper from '../textFieldWrapper';
import { useForm,  FormProvider  } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Box, Button, Typography} from "@mui/material";
import { FC, useEffect } from 'react';

export const addressSchema = yup.object({
    Dirección: yup.string().required('La Dirección es requerida'),
    Departamento: yup.string(),
    Ciudad: yup.string().required('La Ciudad es requerida'),
    Provincia: yup.string().required('La Provincia es requerida'),
    "Codigo Postal": yup.string().required('El código postal es requerido')
}).required();

export type FormData = {
    Dirección: string,
    Departamento: string,
    Ciudad: string,
    Provincia: string,
    "Codigo Postal": string
}

export type AddressFormProps = {
    handleNext: () => void,
    handleBack: () => void
}

const AddressForm:FC<AddressFormProps> = ({handleNext, handleBack}:AddressFormProps) => {

    const methods = useForm<FormData>({
        resolver: yupResolver(addressSchema)
    });  
    const { setFocus, handleSubmit} = methods;

    const onSubmit = (data:any) => {
        handleNext();
        console.log(data)
    }
        
    useEffect(() => {
        setFocus("Dirección");
    },[])

    return (
        <Box sx={{width: '95%', display:"flex", flexDirection:"column"}}  component="form" onSubmit={handleSubmit(onSubmit)}>
           <Typography variant='h6'>
           Dirección de entrega
           </Typography>
           <FormProvider {...methods}>
         <TextFieldWrapper  name="Dirección" defaultValue={""}/>
         <TextFieldWrapper  name="Departamento" defaultValue={""} />
         <TextFieldWrapper  name="Ciudad" defaultValue={""} />
         <TextFieldWrapper  name="Provincia" defaultValue={""} />
         <TextFieldWrapper  name="Codigo Postal" defaultValue={""} />
         </FormProvider>
         <Box sx={{ display: 'flex',width: '100%', justifyContent: "space-between"}}>
            <Button  variant='outlined' onClick={handleBack}>Anterior</Button>
            <Button type="submit" variant='contained'>Seguir</Button>
          </Box>
        </Box>
    )
}

export default AddressForm;