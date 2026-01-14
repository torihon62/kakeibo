"use client";

import { createContext, useContext, useState } from "react";
import { Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Severity = "info" | "success" | "warning" | "error";

interface SnackbarProviderContextType {
  open: boolean;
  openSnackbar: (message: string, severity: Severity) => void;
}

const SnackbarProviderContext = createContext<SnackbarProviderContextType>(
  {} as SnackbarProviderContextType
);

export const useSnackbarProviderContext = (): SnackbarProviderContextType => {
  return useContext<SnackbarProviderContextType>(SnackbarProviderContext);
};

interface Props {
  children: React.ReactNode;
}

export const SnackbarProvider = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [severityValue, setSeverityValue] = useState<Severity>("error");

  const openSnackbar = (message: string, severity: Severity): void => {
    setMessageValue(message);
    setSeverityValue(severity);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const value: SnackbarProviderContextType = {
    open,
    openSnackbar,
  };

  return (
    <SnackbarProviderContext.Provider value={value}>
      {props.children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={severityValue}
          sx={{ width: "100%", whiteSpace: "pre-wrap" }}
        >
          {messageValue}
        </Alert>
      </Snackbar>
    </SnackbarProviderContext.Provider>
  );
};
