import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
 

const TextFieldWrapper = ({control, name, defaultValue}: UseControllerProps) =>{
 
const{field, fieldState} = useController({control, name, defaultValue});
const type = name === "CVV" ? "password" : "text"
  return (
      <TextField {...field} label={name}  error={!!fieldState.error}
      helperText={`${fieldState.error?.message || ''}`} type={type} sx={{margin:"10px 0"}} />
  );
}

export default TextFieldWrapper;