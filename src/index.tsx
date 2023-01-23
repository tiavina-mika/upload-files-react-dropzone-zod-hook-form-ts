import * as React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";

import App from "./App";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
