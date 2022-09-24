import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
 

 
const TextFieldWrapper = ({control, name, defaultValue}: UseControllerProps) =>{
 
const{field, fieldState} = useController({control, name, defaultValue});

  return (
      <TextField {...field} label={name}  error={!!fieldState.error}
      helperText={`${fieldState.error?.message || ''}`}  />
  );
}

export default TextFieldWrapper;