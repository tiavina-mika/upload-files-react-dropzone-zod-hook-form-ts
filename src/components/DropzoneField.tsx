import { FC } from "react";

import { Box, FormHelperText, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import DropzoneInput from "./DropzoneInput";

// ------------------------------------------ //
// -------------- component ----------------- //
// ------------------------------------------ //
type Props = {
  name: string;
  label?: string;
  helperText?: string;
};

const DropzoneField: FC<Props> = ({ name, label, helperText, ...rest }) => {
  // hooks
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext();

  return (
    <>
      {/* ----------- label ----------- */}
      {label && <InputLabel sx={{ mb: 1, color: "#000" }}>{label}</InputLabel>}

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <Box>
            <DropzoneInput
              onChange={(value) => {
                console.log("value", value);
                // onChange(value);
                setValue("image", value);
              }}
              onBlur={onBlur}
              value={value}
              {...rest}
            />
            {errors[name] && (
              <FormHelperText error>{(errors as any)[name]}</FormHelperText>
            )}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </Box>
        )}
      />
    </>
  );
};

export default DropzoneField;
