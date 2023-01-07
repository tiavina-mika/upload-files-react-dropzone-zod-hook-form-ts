import { styled } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const StyledImage = styled("img")({
  width: 100
});

type Props = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
};

const DropzoneInput: FC<Props> = ({ onChange, onBlur, ...rest }) => {
  const [files, setFiles] = useState<File[]>([]);
  // console.log('files', files);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const allFiles = [...files, ...acceptedFiles];
      onChange(allFiles);
      setFiles(allFiles);
    },
    [onChange, files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: File) => {
    const newFiles = files.filter(
      (currrentFile: File) => currrentFile.name !== file.name
    );
    //   // newFiles.splice(newFiles.indexOf(file), 1)
    //   setFiles(newFiles as FileList[])
    // const newFiles = [...files];     // make a var for the new array
    // newFiles.splice(file, 1);        // remove the file from the array
    setFiles(newFiles);
    onChange(newFiles);
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

      {files.map((file, index) => (
        <li key={index}>
          <StyledImage
            alt=""
            src={URL.createObjectURL(file)}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(URL.createObjectURL(file));
            }}
          />
          <button onClick={() => removeFile(file)}>Remove File</button>
        </li>
      ))}
    </div>
  );
};

export default DropzoneInput;
