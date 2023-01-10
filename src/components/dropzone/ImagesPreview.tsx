import { FC, useState } from "react";

import {
  Box,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Stack,
  styled,
  useTheme
} from "@mui/material";
import { FiTrash2 } from "react-icons/fi";

import Dialog from "../Dialog";
import InputActionButton from "./InputActionButton";

const StyledImagePreview = styled("img")({
  width: "100%"
});

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
  files: File[];
  onRemoveFile: (file: File) => void;
  onRemoveAll: () => void;
};

const ImagesPreview: FC<Props> = ({ files, onRemoveFile, onRemoveAll }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const _onRemoveFile = (file: File) => (event: any) => {
    event.stopPropagation();
    onRemoveFile(file);
  };

  const onSelectImage = (file: File) => setSelectedImage(file);
  const clearSelectImage = () => setSelectedImage(null);

  return (
    <Box sx={{ pt: 2 }}>
      <Stack direction="row" spacing={3}>
        {/* ----- file previews ----- */}
        {Array.isArray(files) &&
          files.map((file, index) => (
            <Card
              sx={{
                maxWidth: 200,
                position: "relative",
                p: 1,
                cursor: "pointer",
                border:
                  "1px solid " +
                  ((file as any).path
                    ? "transparent"
                    : theme.palette.success.main)
              }}
              key={index}
              elevation={1}
              onClick={() => onSelectImage(file)}
            >
              {/* ----- image ----- */}
              <CardMedia
                component="img"
                sx={{ minHeight: 200 }}
                image={URL.createObjectURL(file)}
                title={file.name}
              />
              <span>{file.path}</span>

              {/* ----- buttons ----- */}
              <CardActions sx={sx.cardActions}>
                <IconButton
                  aria-label="delete-image"
                  onClick={_onRemoveFile(file)}
                  sx={sx.deleteButton}
                >
                  <FiTrash2 size={22} color={theme.palette.error.main} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </Stack>

      {/* ----- remove all button ----- */}
      {files.length > 1 && (
        <InputActionButton
          onClick={onRemoveAll}
          color={theme.palette.error.main}
          text="Clear"
          icon={<FiTrash2 size={18} />}
        />
      )}

      <Dialog
        title={selectedImage?.name}
        open={!!selectedImage}
        toggle={clearSelectImage}
        secondaryButtonText="Close"
      >
        {selectedImage ? (
          <StyledImagePreview
            alt={selectedImage?.name ?? ""}
            src={URL.createObjectURL(selectedImage)}
          />
        ) : null}
      </Dialog>
    </Box>
  );
};

export default ImagesPreview;
