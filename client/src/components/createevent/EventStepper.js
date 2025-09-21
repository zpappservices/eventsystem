import { useState } from "react";
import { CreateEventProvider } from "@/context/CreateEventContext";
import EventDtoForm from "./EventDtoForm";
import ContactDto from "./ContactDto";
import TicketDto from "./TicketDto";
import { IoMdCheckmark } from "react-icons/io";

const steps = ["General Information", "Contact Info", "Ticket Details"];

export default function EventStepper() {
  const [activeStep, setActiveStep] = useState(2);

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
    <div className="space-y-10">
      <div className="flex  relative">
        {steps?.map((item, index) => {
          const isActive = activeStep === index;
          const isDone = activeStep > index;
          return (
            <div className="flex-1 z-10">
              <div className="space-y-2" key={index}>
                <div
                  className={`w-[40px] h-[40px] rounded-full text-sm flex items-center justify-center mx-auto ${
                    isActive ? "bg-primary/30" : ""
                  }`}
                >
                  <div
                    className={`w-[30px] h-[30px] rounded-full text-sm flex items-center justify-center ${
                      isActive || isDone
                        ? "text-white bg-primary "
                        : "text-baseBlack bg-neutrals100"
                    }`}
                  >
                    {isDone ? <IoMdCheckmark className="text-white text-[21px]" /> : index + 1}
                  </div>
                </div>
                <p className="text-xs text-baseBlack mx-auto text-center">
                  {item}
                </p>
              </div>
            </div>
          );
        })}

        <div className="border w-[64%] mx-auto absolute left-0 top-5 right-0 z-0"></div>
      </div>

      <div>
        <CreateEventProvider>
          {activeStep === 0 && <EventDtoForm handleNext={handleNext} />}

          {activeStep === 1 && (
            <ContactDto handleNext={handleNext} handleBack={handleBack} />
          )}

          {activeStep === 2 && (
            <TicketDto
              handleBack={handleBack}
              handleReset={handleResetStepper}
            />
          )}
        </CreateEventProvider>
      </div>
    </div>
  );
}
