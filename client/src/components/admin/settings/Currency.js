import OptionsInput from "@/components/widgets/OptionsInput";
import React, { useState } from "react";

const Currency = () => {
  const [currency, setCurrency] = useState("CET- Central European Time");
  return (
    <div>
      <OptionsInput
        value={currency}
        label="Admin Dashboard Theme"
        options={[
          {
            label: "CET- Central European Time",
            value: "CET- Central European Time",
          },
        ]}
        style="rounded-[8px] !py-2.5 !px-2.5"
        onChange={(_, value) => setCurrency(value)}
        regularLabel
      />
    </div>
  );
};

export default Currency;
