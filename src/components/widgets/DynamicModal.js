import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "inherit",
  p: "20px",
  border: "none",
  outline: "none",
  borderRadius: 8,
  maxWidth: "610px",
  width: "100%",
};
const DynamicModal = ({
  open,
  onClose,
  style = {},
  children,
  ariaLabel = "modal-title",
  ariaDescription = "modal-description",
  disableBackdropClick = false,
}) => {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") return;
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={ariaLabel}
      aria-describedby={ariaDescription}>
      <Box sx={{ ...defaultStyle, ...style }}>{children}</Box>
    </Modal>
  );
};

export default DynamicModal;
