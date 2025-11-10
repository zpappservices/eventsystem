import OptionsInput from "@/components/widgets/OptionsInput";
import React, { useState } from "react";

const DateTimeFormat = () => {
  const [time, setTime] = useState("FDD/MM/YYYY");
  return (
    <div>
      <OptionsInput
        value={time}
        label="Date and Time Format"
        options={[
          { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
        ]}
        style="rounded-[8px] !py-2.5 !px-2.5"
        onChange={(_, value) => setTime(value)}
        regularLabel
      />
    </div>
  );
};

export default DateTimeFormat;
