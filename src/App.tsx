import { Box, Typography } from "@mui/material";

import Form from "./Form";

const App = () => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Form />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
          <Typography>By Tiavina Michael Ralainirina</Typography>
        </a>
      </Box>
    </Box>
  );
};

export default App;
