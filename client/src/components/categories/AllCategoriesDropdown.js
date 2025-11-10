import useApiRequest from "@/hooks/useApiRequest";
import { ClickAwayListener, MenuItem, Paper, Popper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaListUl } from "react-icons/fa";

const AllCategoriesDropdown = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: "setup/getallcategory",
  });

  const getEventsCategories = async () => {
    await request();
  };

  useEffect(() => {
    getEventsCategories();
  }, []);

  const { data: categories } = data || {};
  return (
    <div
      className="min-w-fit flex items-center gap-4 cursor-pointer"
      ref={anchorRef}
      onClick={() => setOpen(true)}>
      <FaListUl className="text-[20px] sm:text-[24px] text-baseBlack" />
      All categories
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        className="!z-20"
        style={{ minWidth: anchorRef.current?.offsetWidth, maxWidth: "fit" }}>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper className="mt-4">
            {categories?.length > 0 &&
              categories?.map((item, index) => (
                <MenuItem
                  className="text-[14px] text-baseBlack py-2.5  hover:!bg-primary100/50 !font-outfit"
                  key={index}>
                  {item.name}
                </MenuItem>
              ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default AllCategoriesDropdown;
