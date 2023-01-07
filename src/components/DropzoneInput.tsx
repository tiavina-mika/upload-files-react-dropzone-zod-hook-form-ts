import { FC, useCallback, useEffect, useState } from "react";

import { Box, Stack, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";

import ImagesPreview from "./dropzone/ImagesPreview";

const StyledDropzone = styled("div")({
  border: "2px solid " + grey[300],
  borderRadius: 6,
  height: 266,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
});

type Props = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value?: File[];
};

const DropzoneInput: FC<Props> = ({ onChange, onBlur, value, ...rest }) => {
  const [files, setFiles] = useState<File[]>([]);

  // load file from form initial values
  useEffect(() => {
    if (!value) return;
    setFiles(value);
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const allFiles = [...files, ...acceptedFiles];
      onChange(allFiles);
    },
    [onChange, files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      <StyledDropzone {...getRootProps()} className="flexColumn">
        <input {...getInputProps({ onChange, onBlur })} />
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          // input labels
          <Stack direction="column" spacing={2} alignItems="center">
            <FaFileUpload size={32} color={grey[600]} />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography>Add image</Typography>
              <Typography variant="body2" sx={{ color: grey[600] }}>
                or drag and drop to upload
              </Typography>
            </Box>
          </Stack>
        )}
      </StyledDropzone>

      {/* ----- file previews ----- */}
      <ImagesPreview
        files={files}
        onRemoveAll={removeAll}
        onRemoveFile={removeFile}
      />
    </div>
  );
};

export default DropzoneInput;
