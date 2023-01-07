import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
};

const DropzoneInput: FC<Props> = ({ onChange, onBlur, ...rest }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log({ acceptedFiles });
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ onChange, onBlur })} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default DropzoneInput;
