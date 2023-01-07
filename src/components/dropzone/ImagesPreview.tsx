import { FC } from "react";

import { Card, CardActions, CardMedia, IconButton, Stack } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";

const sx = {
  cardActions: {
    position: "absolute",
    right: 2,
    bottom: 2
  },
  deleteButton: {
    bgcolor: "#fff",
    "&:hover": {
      bgcolor: "#fff",
      opacity: 0.8
    }
  }
};
type Props = {
  files?: File[];
  removeFile: (file: File) => void;
  removeAll: () => void;
};

const ImagesPreview: FC<Props> = ({ files, removeFile, removeAll }) => {
  return (
    <div>
      <Stack direction="row" spacing={3}>
        {/* ----- file previews ----- */}
        {Array.isArray(files) &&
          files.map((file, index) => (
            <Card
              sx={{ maxWidth: 200, position: "relative" }}
              key={index}
              elevation={0}
            >
              <CardMedia
                component="img"
                // sx={{ height: '100%' }}
                sx={{ height: 200 }}
                image={URL.createObjectURL(file)}
                title={file.name}
              />
              <CardActions sx={sx.cardActions}>
                <IconButton
                  aria-label="delete-image"
                  onClick={() => removeFile(file)}
                  sx={sx.deleteButton}
                >
                  <FiTrash2 size={22} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </Stack>
      {files.length > 0 && <button onClick={removeAll}>Remove all</button>}
    </div>
  );
};

export default ImagesPreview;
