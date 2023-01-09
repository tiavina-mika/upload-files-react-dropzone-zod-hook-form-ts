import { FC } from "react";

import { Box, Button, Typography } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  onClick: () => void;
};

const RemoveAllButton: FC<Props> = ({ onClick }) => {
  return (
    <Box mt={1}>
      <Button
        onClick={onClick}
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
  );
};

export default RemoveAllButton;
