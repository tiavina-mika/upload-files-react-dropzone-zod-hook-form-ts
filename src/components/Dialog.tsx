import { FC, MouseEventHandler, ReactNode } from "react";

import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import MUIDialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FiX } from "react-icons/fi";

const StyledDialog = styled(MUIDialog)(({ theme }) => ({
  "& .MuiDialog-root": {
    padding: theme.spacing(1.5)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

type Props = {
  title: string;
  description?: string;
  open?: boolean;
  toggle?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonAction?: () => void;
  formId?: string;
  content?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & DialogProps;

const Dialog: FC<Props> = ({
  title,
  description,
  open,
  toggle,
  content,
  onPrimaryButtonAction,
  primaryButtonText,
  secondaryButtonText,
  formId,
  maxWidth,
  onClick,
  children,
  ...dialogProps
}) => {
  const handlePrimaryButtonAction = () => {
    if (onPrimaryButtonAction) onPrimaryButtonAction();
    if (!toggle) return;
    toggle();
  };

  return (
    <StyledDialog
      {...dialogProps}
      open={!!open}
      onClose={toggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
      onClick={onClick}
    >
      {dialogProps.fullScreen ? (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggle}
              aria-label="close"
            >
              <FiX />
            </IconButton>
            <Box
              sx={{ ml: 2, flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6" component="div">
                {title}
              </Typography>
              {description && (
                <Typography variant="body2">{description}</Typography>
              )}
            </Box>
            <Button
              type="submit"
              form={formId}
              variant="outlined"
              color="primary"
              sx={{ backgroundColor: "#fff" }}
            >
              {primaryButtonText ?? "Save"}
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      )}
      <DialogContent>
        {description && !dialogProps.fullScreen && (
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        )}
        {children ?? content}
      </DialogContent>
      {!dialogProps.fullScreen && (
        <DialogActions>
          <Button onClick={toggle}>{secondaryButtonText ?? "Cancel"}</Button>

          {onPrimaryButtonAction && (
            <Button
              onClick={handlePrimaryButtonAction}
              autoFocus
              variant="contained"
            >
              {primaryButtonText ?? "Confirm"}
            </Button>
          )}

          {formId && (
            <Button
              type="submit"
              form={formId}
              color="primary"
              variant="contained"
            >
              {primaryButtonText ?? "Save"}
            </Button>
          )}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default Dialog;
