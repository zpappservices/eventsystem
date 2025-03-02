import { AccordionDetails, AccordionSummary } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = ({ description }) => {
   return (
      <Accordion>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon color="#000000" />}
            aria-controls="panel2-content"
            id="panel2-header"
            className="text-bold text-[18px]"
         >
            TICKET DETAILS
         </AccordionSummary>
         <AccordionDetails>
            {description}
         </AccordionDetails>
      </Accordion>
   );
};

export default CustomAccordion;
