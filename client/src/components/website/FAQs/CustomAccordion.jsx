import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { LuPlus, LuMinus } from "react-icons/lu";

const CustomAccordion = ({ question, answer, id, expandedId, onTogglePanel }) => {
  const isExpanded = expandedId === id;

  return (
    <div className="max-w-[600px] h-fit">
      <Accordion
        expanded={isExpanded}
        className="flex flex-col justify-center shadow-none bg-[#e3e3e382] min-h-[72px] font-outfit !rounded-[10px] md:ps-3"
      >
        <AccordionSummary
          aria-controls={`panel${id}-content`}
          id={`panel${id}-header`}
          onClick={() => onTogglePanel(id)} // ✅ Now toggles only when clicking the header
          className="gap-3 overflow-hidden flex"
        >
          <Typography
            sx={{ fontSize: { xs: "16px", lg: "20px" }, fontWeight: 500 }}
            className="text-baseBlack font-outfit mr-4"
          >
            {question}
          </Typography>
          <div className="!ms-auto shrink-0 self-center">
            {isExpanded ? <LuMinus size={18} /> : <LuPlus size={18} />}
          </div>
        </AccordionSummary>

        <AccordionDetails className="-mt-4 mb-1">
          <div className="h-[0.5px] w-full bg-[#586A61] mb-2"></div>
          <Typography
            component="div"
            sx={{ fontSize: { xs: "13px", sm: "14px", md: "16px" } }}
            className="text-neutrals900 font-outfit"
          >
            {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomAccordion;
