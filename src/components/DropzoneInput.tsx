import { styled } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const StyledImage = styled("img")({
  width: 100
});

type Props = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: File[];
};

const DropzoneInput: FC<Props> = ({ onChange, onBlur, value, ...rest }) => {
  const [files, setFiles] = useState<File[]>([]);
  console.log("files", files);

  useEffect(() => {
    if (!value) return;
    setFiles(value);
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const allFiles = [...files, ...acceptedFiles];
      onChange(allFiles);
      // setFiles(allFiles);
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
    // setFiles([]);
    onChange([]);
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps({ onChange, onBlur })} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {Array.isArray(files) &&
        files.map((file, index) => (
          <li key={index}>
            <StyledImage
              alt=""
              src={URL.createObjectURL(file)}
              // Revoke data uri after image is loaded
              // onLoad={() => {
              //   URL.revokeObjectURL(URL.createObjectURL(file));
              // }}
            />
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
