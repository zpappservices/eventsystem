import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import { CreateEventProvider } from "@/context/CreateEventContext";
import EventDtoForm from "./EventDtoForm";
import ContactDto from "./ContactDto";
import TicketDto from "./TicketDto";

const steps = ["Event Details", "Contact Info", "Ticket Details"];

export default function EventStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResetStepper = (setForm) => {
    setForm((prev) => ({
      ...prev,
      eventDto: {
        ...prev.eventDto,
        title: "",
        description: "",
        categoryId: "",
        location: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
      },
      contactDto: {
        email: "",
        phone: "",
        facebook: "",
      },
      ticketDto: [],
    }));
    
    setActiveStep(0);
  };
  

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              sx={{
                "& .MuiStepIcon-root": {
                  color: "gray", // Default (inactive) step color
                  transition: "color 1s ease-in-out", // Smooth transition
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#FF8000", // Active step color
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "#F9C0AB", // Completed step color (optional)
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <CreateEventProvider>
        {activeStep === 0 && <EventDtoForm handleNext={handleNext} />}

        {activeStep === 1 && <ContactDto handleNext={handleNext} handleBack={handleBack} />}

        {activeStep === 2 && <TicketDto handleBack={handleBack} handleReset={handleResetStepper} />}
      </CreateEventProvider>
    </Box>
  );
}
