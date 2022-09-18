import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
 

 
const TextFieldWrapper = ({control, name, defaultValue, rules}: UseControllerProps) =>{
 
const{field, fieldState} = useController({control, name, defaultValue, rules});
 
  return (
      <TextField {...field} />
  );
}

export default TextFieldWrapper;