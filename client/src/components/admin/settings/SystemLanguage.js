import OptionsInput from "@/components/widgets/OptionsInput";
import React, { useState } from "react";

const SystemLanguage = () => {
  const [language, setLanguage] = useState("English");
  return (
    <div>
      <OptionsInput
        value={language}
        label="System Language"
        options={[
          { label: "English", value: "English" },
          { label: "French", value: "French" },
        ]}
        style="rounded-[8px] !py-2.5 !px-2.5"
        onChange={(_, value) => setLanguage(value)}
        regularLabel
      />
    </div>
  );
};

export default SystemLanguage;
