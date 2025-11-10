import OptionsInput from "@/components/widgets/OptionsInput";
import React, { useState } from "react";

const TimeZone = () => {
  const [time, setTime] = useState("NGN (N)");
  return (
    <div>
      <OptionsInput
        value={time}
        label="Time Zone"
        options={[
          {
            label: "NGN (N)",
            value: "NGN (N)",
          },
          {
            label: "USD ($)",
            value: "USD ($)",
          },
        ]}
        style="rounded-[8px] !py-2.5 !px-2.5"
        onChange={(_, value) => setTime(value)}
        regularLabel
      />
    </div>
  );
};

export default TimeZone;
