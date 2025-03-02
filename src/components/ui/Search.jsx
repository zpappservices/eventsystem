import useApiRequest from "@/hooks/useApiRequest";
import useSearch from "@/hooks/useSearch";
import { ClickAwayListener, MenuItem, Paper, Popper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Button from "../widgets/Button";
import { IoCalendarOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const router = useRouter();

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: "event/getallevent",
  });

  const events = data?.data;

  const searchFunction = (item, term) => {
    return (
      item?.title?.toLowerCase()?.includes(term?.toLowerCase()) ||
      item?.location?.toLowerCase()?.includes(term?.toLowerCase())
    );
  };

  const searchedItems = useSearch(events, searchTerm, searchFunction);

  const search = () => {
    if (searchedItems?.length > 0) {
      setOpen(true);
    }
  };

  const getAllEvents = async () => {
    await request();
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="w-full max-w-[699px] flex items-center py-2.5 sm:py-3 px-2.5 sm:px-5 gap-5 border border-neutrals200 rounded-[8px]">
      <div
        ref={anchorRef}
        className="w-full max-w-[400px] flex items-center rounded-[8px] gap-1.5">
        <input
          type="text"
          placeholder="Search by events, name, location, and more"
          value={searchTerm}
          className="w-full outline-none border-none placeholder:text-neutrals600 text-[14px] sm:text-[16px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          className="!z-30"
          style={{ minWidth: anchorRef.current?.offsetWidth, maxWidth: 400 }}>
          <ClickAwayListener onClickAway={handleClose}>
            <Paper className="mt-7">
              {searchedItems?.map((item, index) => (
                <MenuItem
                  className="text-[14px] py-3 !font-outfit"
                  onClick={() => router.push(`/events/${item?.id}`)}
                  key={index}>
                  {item.title}
                </MenuItem>
              ))}
            </Paper>
          </ClickAwayListener>
        </Popper>
      </div>

      <div className="border-r hidden sm:block border-neutrals100 min-h-full h-full py-5"></div>

      <div className="min-w-fit hidden sm:flex items-center gap-2">
        <IoCalendarOutline className="text-baseBlack cursor-pointer" />
        <p className="text-[14px] sm:text-[16px] text-neutrals500">
          Select date
        </p>
      </div>

      <Button
        style="!font-normal !rounded-[4px]"
        text="text-baseBlack"
        background="bg-primary200"
        hover="hover:bg-primary300"
        onClick={search}>
        <div className="flex items-center gap-1.5">
          <CiSearch size={21} />
          Search
        </div>
      </Button>
    </div>
  );
};

export default Search;
