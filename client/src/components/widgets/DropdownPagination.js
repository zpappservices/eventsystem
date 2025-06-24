import { ClickAwayListener, MenuItem, Paper, Popper } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa6";

const DropdownPagination = ({ page, totalPages, handlePageChange }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false); // Close dropdown when page changes
  }, [page]);

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="border border-neutrals400 text-neutrals500 py-1 px-4 rounded-[5.28px] flex items-center gap-1 cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
      ref={anchorRef}
    >
      <p className="text-[14px] leading-[19.6px]">{page}</p>
      <FaCaretDown className="text-neutrals500" />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{ width: anchorRef.current?.offsetWidth }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper className="mt-2.5 max-h-[200px] overflow-auto w-fit">
            {pagesArray?.map((item) => (
              <MenuItem
                className="text-[14px] !text-neutrals500 !font-outfit hover:!bg-primary100"
                onClick={() => handlePageChange(item)}
                key={item}
              >
                {item}
              </MenuItem>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default DropdownPagination;
