import OptionsInput from "@/components/widgets/OptionsInput";
import React, { useState } from "react";

const AdminDashboardTheme = () => {
  const [theme, setTheme] = useState("Light Theme");
  return (
    <div>
      <OptionsInput
        value={theme}
        label="Admin Dashboard Theme"
        options={[
          { label: "Light Theme", value: "Light Theme" },
          { label: "Dark Theme", value: "Dark Theme" },
        ]}
        style="rounded-[8px] !py-2.5 !px-2.5"
        onChange={(_, value) => setTheme(value)}
        regularLabel
      />
    </div>
  );
};

export default AdminDashboardTheme;
