import { FC } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
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
    <Box sx={{ py: 2 }}>
      <Stack direction="row" spacing={3}>
        {/* ----- file previews ----- */}
        {Array.isArray(files) &&
          files.map((file, index) => (
            <Card
              sx={{ maxWidth: 200, position: "relative", p: 1 }}
              key={index}
              elevation={1}
            >
              <CardMedia
                component="img"
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

      {/* ----- remove all button ----- */}
      {files.length > 0 && (
        <Box mt={1}>
          <Button
            onClick={removeAll}
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center"
            }}
          >
            <FiTrash2 size={18} />
            <Typography sx={{ ml: 1 }}>Remove all</Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImagesPreview;
