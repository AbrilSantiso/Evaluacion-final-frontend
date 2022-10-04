import { TextField } from "@mui/material";
import { useController, UseControllerProps, useFormContext } from "react-hook-form";



type textFieldWrappertProps = {
  name: string;
  defaultValue?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
}

const TextFieldWrapper = ({ name, defaultValue, onFocus }:textFieldWrappertProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, name, defaultValue });
  const type = name === "CVV" ? "password" : "text"
  return (
    <TextField {...field} label={name} error={!!fieldState.error}
      helperText={`${fieldState.error?.message || ''}`} type={type} sx={{ margin: "10px 0" }}  onFocus={onFocus ? (e) => onFocus(e): undefined}/>
  );
}

export default TextFieldWrapper;