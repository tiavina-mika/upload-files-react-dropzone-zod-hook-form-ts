import { colors } from "@mui/material";

export const getMUIColorsList = () => {
  const newColors = [];
  Object.values(colors).forEach((color) => {
    newColors.push(...Object.values(color));
  });

  return newColors;
};
