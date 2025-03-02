const StageFlow = ({ steps, currentStep, setCurrentStep, handlePrev }) => {

   const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    };

   const CurrentStepComponent = steps[currentStep].component;

   return (
      <CurrentStepComponent
         next={handleNext}
         prev={handlePrev}
         currentStep={currentStep}
         {...steps[currentStep].props}
      />
   );
};

export default StageFlow;
