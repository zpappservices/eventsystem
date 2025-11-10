import React, { useState } from "react";
import IOSSwitch from "../widgets/IOSSwitch";

const ToggleCard = ({ container, label, style, title, action }) => {
  const [toggle, setToggle] = useState(true);

  const inputClass = `px-2.5 py-2.5 border-t
      outline-none transition-colors focus:border-primary focus:transition-all duration-300 text-baseBlack
      text-[16px] leading-[22.4px] flex items-center justify-between ${style} `;
  return (
    <div className={`flex flex-col gap-2 relative ${container}`}>
      <p className=" bg-white px-1 text-[14px] leading-[16px] text-black">
        {label}
      </p>

      <div className={`${inputClass}`}>
        <p>{title}</p>
        <IOSSwitch open={toggle} onChange={(event) => setToggle(event.target.checked)} />
      </div>
    </div>
  );
};

export default ToggleCard;
