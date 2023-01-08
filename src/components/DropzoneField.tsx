import { FC } from "react";

import { Box, FormHelperText, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import DropzoneInput from "./DropzoneInput";
import { DropzoneOptions } from "react-dropzone";

// ------------------------------------------ //
// -------------- component ----------------- //
// ------------------------------------------ //
type Props = {
  name: string;
  label?: string;
  helperText?: string;
} & DropzoneOptions;

const DropzoneField: FC<Props> = ({ name, label, helperText, ...rest }) => {
  // hooks
  const {
    control,
    setError,
    formState: { errors }
  } = useFormContext();

  return (
    <>
      {/* ----------- label ----------- */}
      {label && <InputLabel sx={{ mb: 1, color: "#000" }}>{label}</InputLabel>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <Box>
            <DropzoneInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              onError={(error: any) => {
                setError(name, { type: "custom", message: error });
              }}
              hasError={!!(errors as any)[name]}
              {...rest}
            />
            {errors[name] && (
              <FormHelperText error sx={{ my: 1 }}>
                {(errors as any)[name]?.message}
              </FormHelperText>
            )}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </Box>
        )}
      />
    </>
  );
};

export default DropzoneField;
