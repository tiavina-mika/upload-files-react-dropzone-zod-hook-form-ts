import { FC } from "react";

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  useTheme
} from "@mui/material";
import { FiTrash2 } from "react-icons/fi";

import { convertBytesToFileSize } from "../../utils/fileUtils";
import InputActionButton from "./InputActionButton";

type Props = {
  files: File[];
  onRemoveFile: (file: File) => void;
  onRemoveAll: () => void;
};

const FilesPreview: FC<Props> = ({ files, onRemoveFile, onRemoveAll }) => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 0.5 }}>
      <Stack direction="row" spacing={3}>
        <List>
          {files.map((file: File, index: number) => (
            <ListItem
              key={file.name + index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemoveFile(file)}
                >
                  <FiTrash2 size={20} color={theme.palette.error.main} />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  file.name +
                  " (" +
                  convertBytesToFileSize(file.size, "mb", true) +
                  ")"
                }
              />
            </ListItem>
          ))}
        </List>
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
    </Box>
  );
};

export default FilesPreview;
