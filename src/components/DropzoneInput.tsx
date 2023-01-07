import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
};

const DropzoneInput: FC<Props> = ({ onChange, onBlur, ...rest }) => {
  const [files, setFiles] = useState<FileList[] | Blob[] | MediaSource[]>([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log({ acceptedFiles });
      const filesWithPreview = acceptedFiles.map((file, index) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: index
        });
      });
      const allFiles = [...files, ...filesWithPreview];
      onChange(allFiles);
      setFiles(allFiles);
    },
    [onChange, files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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
          <img
            alt=""
            src={file.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
          {/* <button onClick={removeFile(file)}>Remove File</button> */}
        </li>
      ))}
    </div>
  );
};

export default DropzoneInput;
