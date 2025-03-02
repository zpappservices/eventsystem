import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Toast({ message, duration = 5000, actionLabel, onActionClick, position = { vertical: "bottom", horizontal: "center" } }) {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const action = (
    <React.Fragment>
      {actionLabel && (
        <Button color="secondary" size="small" onClick={onActionClick || handleClose}>
          {actionLabel}
        </Button>
      )}
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button onClick={handleOpen}>Show Toast</Button>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message || "Default message"}
        action={action}
        anchorOrigin={position}
      />
    </div>
  );
}
