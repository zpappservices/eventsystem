import { useState, useEffect, useRef } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { ClickAwayListener, MenuItem, Paper, Popper } from "@mui/material";

const OptionsInput = ({
  name,
  label,
  options = [],
  value,
  placeholder,
  error,
  onChange,
  labelStyle,
  errorStyle,
  style,
  container,
  placeholderStyle,
  optionsstyle,
  selectedStyle,
  arrowSize = 16,
  arrowColor = "#5A5555",
  optionsContainer,
  openIcon,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const selectRef = useRef(null);

  const errorBorderClass = error
    ? "border-error300"
    : value
    ? "border-primary"
    : "border-neutrals200";
  const errorTextClass = error ? "text-error300" : "text-neutrals700";

  const inputClass = `h-[48px] rounded-[8px] border py-2.5 px-4 
      outline-none transition-colors focus:border-primary focus:transition-all duration-300 text-baseBlack
      text-[16px] leading-[22.4px] placeholder:text-neutrals400 placeholder:text-[16px] bg-white ${style} ${errorTextClass} ${errorBorderClass}`;

  const handleClose = (event) => {
    if (selectRef.current && selectRef.current.contains(event.target)) {
      return;
    }
    setIsOpen(false);
  };

  const handleSelect = (value) => {
    onChange(name, value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div
      className={`flex flex-col gap-1.5 relative ${container}`}
      ref={selectRef}>
      <label
        htmlFor={name}
        className={`text-[14px] sm:text-[16px] leading-[22px] text-baseBlack  ${
          error ? "text-error300" : ""
        } ${labelStyle}`}>
        {label}
      </label>
      <div
        className={`relative ${inputClass} flex items-center justify-between cursor-pointer`}
        onClick={toggleDropdown}>
        <span
          className={
            selected
              ? `text-baseBlack text-[12px] sm:text-[14px] not-italic font-normal leading-normal ${selectedStyle}`
              : `text-neutral600 text-[12px] sm:text-[14px] not-italic font-normal leading-normal ${placeholderStyle}`
          }>
          {selected || placeholder}
        </span>
        {isOpen
          ? openIcon || <GrUp size={arrowSize} color={arrowColor} />
          : openIcon || <GrDown size={arrowSize} color={arrowColor} />}
      </div>

      <Popper
        open={isOpen}
        anchorEl={selectRef.current}
        placement="bottom-start"
        style={{ minWidth: selectRef.current?.offsetWidth }}>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper className="mt-2.5 max-h-[200px] overflow-y-auto min-w-fit">
            {children
              ? children
              : options?.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleSelect(item?.name || item)}
                    className="hover:!bg-primary100/20">
                    {item.name || item}
                  </MenuItem>
                ))}
          </Paper>
        </ClickAwayListener>
      </Popper>

      <p
        className={`text-[12px] font-lato leading-[16.8px] text-error300 ${
          error ? "visible" : "hidden"
        } ${errorStyle}`}>
        {error || "\u00A0"}
      </p>
    </div>
  );
};

export default OptionsInput;
