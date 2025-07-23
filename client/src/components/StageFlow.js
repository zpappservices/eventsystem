import React from "react";

const StageFlow = ({ steps, currentStep, setCurrentStep, ...props }) => {
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleNextTwoSteps = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 2);
    }
  };

  const CurrentStepComponent = steps[currentStep]?.component;

  return (
    <CurrentStepComponent
      next={handleNext}
      prev={handlePrev}
      nextTwoSteps={handleNextTwoSteps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      {...steps[currentStep]?.props}
      {...props}
    />
  );
};

export default StageFlow;
