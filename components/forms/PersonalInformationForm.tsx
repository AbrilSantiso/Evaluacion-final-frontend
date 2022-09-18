import { useForm } from 'react-hook-form';

import {Box} from "@mui/material";
import { FC } from 'react';

const PersonalInformationForm:FC = () => {

    const {handleSubmit, control} = useForm();
    const onSubmit = (data:any) => console.log(data);

    return (
        <Box sx={{width: '100%', display:"flex", flexDirection:"column", alignItems:"center"}}  component="form" onSubmit={handleSubmit(onSubmit)}>
         
            
        </Box>
    )
}

export default PersonalInformationForm;