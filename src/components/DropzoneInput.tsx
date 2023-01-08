import { FC, useCallback, useEffect, useState } from "react";

import { Box, Stack, styled, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";

import ImagesPreview from "./dropzone/ImagesPreview";
import { convertFileSizetoBytes } from "../utils/fileUtils";

// -------------- styled dropzone -------------- //
type StyleDropzoneProps = {
  error: boolean;
};
const StyledDropzone = styled("div", {
  shouldForwardProp: (prop) => prop !== "error"
})<StyleDropzoneProps>(({ theme, error }) => ({
  border: "1px solid " + (error ? theme.palette.error.main : grey[300]),
  borderRadius: 6,
  height: 266,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}));

type Props = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value?: File[];
  onError: (error: any) => void;
  hasError: boolean;
  type: "image" | "csv" | "json" | "pdf";
  inputLabel: string;
} & DropzoneOptions;

const DropzoneInput: FC<Props> = ({
  onChange,
  onBlur,
  value,
  onError,
  hasError,
  type,
  inputLabel,
  ...rest
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  const theme = useTheme();

  // load file from form initial values
  useEffect(() => {
    if (!value) return;
    setFiles(value);
  }, [value]);

  // error from form
  useEffect(() => {
    if (!hasError) return;
    setFiles([]);
  }, [hasError]);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      const allFiles = [...files, ...acceptedFiles];
      onChange(allFiles);
      // error handling
      if (fileRejections.length) {
        const errors = fileRejections[0].errors;

        if (errors.length) {
          const defaultError = errors[0];
          let errorMessage = "";

          switch (defaultError?.code) {
            case "file-invalid-type":
              errorMessage = "PNG only are accepted";
              break;
            case "file-too-large":
              // get the max size from the error message
              const messagesArr = defaultError.message.split(" ");
              const maxSize = messagesArr.find((text: string) => Number(text));
              errorMessage =
                "File should be lesser than " +
                convertFileSizetoBytes(+maxSize, "mb");

              break;
            default:
              errorMessage = "An error occured";
          }

          if (errorMessage) {
            setError(errorMessage);
            onError(errorMessage as string);
          }
        }
      }
    },
    [onChange, files, onError]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop,
    ...rest
  });

  const removeFile = (file: File) => {
    const newFiles = files.filter(
      (currrentFile: File) => currrentFile.name !== file.name
    );

    onChange(newFiles);
  };

  const removeAll = () => {
    onChange([]);
  };

  return (
    <div>
      <StyledDropzone
        {...getRootProps()}
        className="flexColumn"
        error={isDragReject || !!error}
      >
        <input {...getInputProps({ onChange, onBlur })} />
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          // input labels
          <Stack direction="column" spacing={2} alignItems="center">
            <FaFileUpload size={32} color={grey[600]} />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography>{inputLabel}</Typography>
              <Typography
                variant="body2"
                sx={{ color: !!error ? theme.palette.error.main : grey[600] }}
              >
                or drag and drop to upload
              </Typography>
            </Box>
          </Stack>
        )}
      </StyledDropzone>

      {/* ----- image previews ----- */}
      {type === "image" && files.length > 0 && (
        <ImagesPreview
          files={files}
          onRemoveAll={removeAll}
          onRemoveFile={removeFile}
        />
      )}
    </div>
  );
};

export default DropzoneInput;
