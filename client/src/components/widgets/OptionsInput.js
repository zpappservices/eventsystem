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
  disabled,
  startIcon,
  index = 0,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const selectRef = useRef(null);

  const errorBorderClass = error
    ? "border-error300"
    : value
    ? ""
    : "border-neutrals100";
  const errorTextClass = error ? "text-error300" : "text-neutrals700";

  const inputClass = `p-4 py-3.5 rounded-[4px] border 
      outline-none transition-colors focus:border-primary focus:transition-all duration-300 text-baseBlack
      text-[16px] leading-[22.4px] placeholder:text-neutrals500 placeholder:text-[16px] bg-white ${style} `;

  const handleClose = (event) => {
    if (selectRef.current && selectRef.current.contains(event.target)) {
      return;
    }
    setIsOpen(false);
  };

  const handleSelect = (value) => {
    onChange(name, value, index);
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
      ref={selectRef}
    >
      <p className="absolute -top-2 bg-white px-1 z-10 left-3 text-[14px] leading-[16px] text-neutrals700">
        {label}
      </p>
      <div
        className={`relative ${inputClass} flex items-center gap-2.5 justify-between cursor-pointer`}
        onClick={!disabled ? toggleDropdown : () => {}}
      >
        {startIcon && (
          <span className="flex items-center gap-1.5">{startIcon}</span>
        )}
        <span
          className={
            selected
              ? `text-neutrals700 text-[14px] sm:text-[16px] not-italic font-normal leading-normal ${selectedStyle}`
              : `text-neutrals500 text-[14px] sm:text-[16px] not-italic font-normal leading-normal ${placeholderStyle}`
          }
        >
          {selected || placeholder}
        </span>
        {isOpen
          ? openIcon || <GrUp size={arrowSize} color={arrowColor} />
          : openIcon || <GrDown size={arrowSize} color={arrowColor} />}
      </div>

      <Popper
        className="!z-20"
        open={isOpen}
        anchorEl={selectRef.current}
        placement="bottom-start"
        style={{ minWidth: selectRef.current?.offsetWidth }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper className="mt-2.5 max-h-[200px] overflow-y-auto min-w-fit">
            {children
              ? children
              : options?.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() =>
                      handleSelect(item?.name || item?.value || item)
                    }
                    className="hover:!bg-primary100/20 !font-outfit !text-[16px] !text-neutrals700"
                  >
                    {item.label || item.name || item}
                  </MenuItem>
                ))}
          </Paper>
        </ClickAwayListener>
      </Popper>

      <p
        className={`text-[12px] leading-[16.8px] -mt-1 ms-1 text-error ${
          error ? "visible" : "hidden"
        } ${errorStyle}`}
      >
        {error || "\u00A0"}
      </p>
    </div>
  );
};

export default OptionsInput;
