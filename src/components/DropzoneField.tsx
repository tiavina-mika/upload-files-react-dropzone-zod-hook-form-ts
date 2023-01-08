import { FC } from "react";

import { Box, FormHelperText, InputLabel, SxProps, Theme } from "@mui/material";
import { DropzoneOptions } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

import DropzoneInput from "./DropzoneInput";

type Props = {
  name: string;
  label?: string;
  inputLabel?: string;
  helperText?: string;
  sx?: SxProps<Theme>;
  type?: "image" | "csv" | "json" | "pdf";
} & DropzoneOptions;

const DropzoneField: FC<Props> = ({
  name,
  label,
  helperText,
  inputLabel,
  sx,
  type = "image",
  ...rest
}) => {
  // hooks
  const {
    control,
    setError,
    formState: { errors }
  } = useFormContext();

  return (
    <Box sx={sx}>
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
              type={type}
              inputLabel={inputLabel}
              {...rest}
            />

            {/* ----------- errors ----------- */}
            {errors[name] && (
              <FormHelperText error sx={{ my: 1 }}>
                {(errors as any)[name]?.message}
              </FormHelperText>
            )}

            {/* ----------- helper text ----------- */}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </Box>
        )}
      />
    </Box>
  );
};

export default DropzoneField;
