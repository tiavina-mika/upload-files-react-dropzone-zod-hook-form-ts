import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const StyledImage = styled("img")({
  width: 100
});

const StyledDropzone = styled("div")({
  border: "2px solid " + grey[400],
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
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </StyledDropzone>

      {Array.isArray(files) &&
        files.map((file, index) => (
          <li key={index}>
            <StyledImage alt={file.name} src={URL.createObjectURL(file)} />
            {file && (
              <button onClick={() => removeFile(file)}>Remove File</button>
            )}
          </li>
        ))}

      {files.length > 0 && <button onClick={removeAll}>Remove all</button>}
    </div>
  );
};

export default DropzoneInput;
