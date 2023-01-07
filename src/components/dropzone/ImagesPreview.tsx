import { FC } from "react";

import { styled } from "@mui/material";

const StyledImage = styled("img")({
  width: 100
});

type Props = {
  files?: File[];
  removeFile: (file: File) => void;
  removeAll: () => void;
};

const ImagesPreview: FC<Props> = ({ files, removeFile, removeAll }) => {
  return (
    <div>
      {/* ----- file previews ----- */}
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

export default ImagesPreview;
