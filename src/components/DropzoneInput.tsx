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
  // const [files, setFiles] = useState<FileList[]>([]);
  // const [files, setFiles] = useState<FileList[] | Blob[] | MediaSource[]>([]);
  // console.log('files', files);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      // console.log({ acceptedFiles });
      // const filesWithPreview = acceptedFiles.map((file, index) => {
      //   return Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //     id: index
      //   });
      // });
      const allFiles = [...files, ...acceptedFiles];
      onChange(allFiles);
      setFiles(allFiles);
    },
    [onChange, files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file) => {
    const newFiles = [...files]; // make a var for the new array
    newFiles.splice(file, 1); // remove the file from the array
    setFiles(newFiles);
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
        <li key={file.name + index}>
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
