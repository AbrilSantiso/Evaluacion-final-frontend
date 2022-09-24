import TextFieldWrapper from '../textFieldWrapper';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Box, Button, Typography} from "@mui/material";
import { FC, useEffect } from 'react';

export const addressSchema = yup.object({
    Dirección: yup.string().required('La Dirección es requerida'),
    Departamento: yup.string(),
    Ciudad: yup.string().required('La Ciudad es requerida')
}).required();

export type FormData = {
    Dirección: string,
    Departamento: string,
    Ciudad: string
}

export type PersonalInformationFormProps = {
    handleNext: () => void
}

const AddressForm:FC<PersonalInformationFormProps> = ({handleNext}:PersonalInformationFormProps) => {
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
        <Box sx={{width: '100%', display:"flex", flexDirection:"column", alignItems:"center"}}  component="form" onSubmit={handleSubmit(onSubmit)}>
           <Typography variant='h4'>
           Dirección de entrega
           </Typography>
         <TextFieldWrapper control={control} name="Dirección" defaultValue={""}  />
         <TextFieldWrapper control={control} name="Departamento" defaultValue={""}/>
         <TextFieldWrapper control={control} name="Ciudad" defaultValue={""} />
         <TextFieldWrapper control={control} name="Ciudad" defaultValue={""} />
         <TextFieldWrapper control={control} name="Ciudad" defaultValue={""} />
         <Button type="submit">Seguir</Button>
        </Box>
    )
}

export default AddressForm;