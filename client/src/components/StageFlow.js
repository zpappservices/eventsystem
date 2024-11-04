const StageFlow = ({ steps, currentStep, handleNext, handlePrev }) => {

   console.log(handleNext)

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
