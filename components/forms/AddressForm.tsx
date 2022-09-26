import TextFieldWrapper from '../textFieldWrapper';
import { useForm } from 'react-hook-form';
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
    handleNext: () => void
}

const AddressForm:FC<AddressFormProps> = ({handleNext}:AddressFormProps) => {
//PREGUNTAR COMO TIPAR EL CONTROL
    const {handleSubmit, setFocus, control} = useForm({resolver: yupResolver(addressSchema)});
    
    const onSubmit = (data:any) => {
        handleNext();
        console.log(data)
    }
        
    useEffect(() => {
        setFocus("Dirección");
    },[])

    return (
        <Box sx={{width: '100%', display:"flex", flexDirection:"column"}}  component="form" onSubmit={handleSubmit(onSubmit)}>
           <Typography variant='h6'>
           Dirección de entrega
           </Typography>
         <TextFieldWrapper control={control} name="Dirección" defaultValue={""}/>
         <TextFieldWrapper control={control} name="Departamento" defaultValue={""} />
         <TextFieldWrapper control={control} name="Ciudad" defaultValue={""} />
         <TextFieldWrapper control={control} name="Provincia" defaultValue={""} />
         <TextFieldWrapper control={control} name="Codigo Postal" defaultValue={""} />
         <Button type="submit">Seguir</Button>
        </Box>
    )
}

export default AddressForm;