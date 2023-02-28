import { Box, Stack, Typography } from "@mui/material";

import Form from "./Form";

const App = () => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2
      }}
    >
      <Stack spacing={2.4}>
        <div>
          <Typography variant="h5">
            Upload files with React Hook Form, Zod, TypeScript and Material UI
          </Typography>
        </div>
        <Form />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
            <Typography>By Tiavina Michael Ralainirina</Typography>
          </a>
        </Box>
      </Stack>
    </Box>
  );
};

export default App;
