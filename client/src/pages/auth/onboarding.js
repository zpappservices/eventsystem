import Onboarding from "@/components/auth/Onboarding";
import StageFlow from "@/components/StageFlow";
import SubAccount from "@/components/auth/SubAccount";
import React, { useState } from "react";
import OnboardingHeader from "@/components/auth/OnboardingHeader";
import PrivateRoute from "@/components/dashboard/PrivateRoute";

const onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{ component: Onboarding }, { component: SubAccount }];
  
  return (
    <PrivateRoute>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full flex flex-col  gap-10 py-20">
          <div className="max-w-[370px] mx-auto text-black">
            <p className="text-center text-[22px] font-medium leading-[30px]">
              Let’s create something spectacular
            </p>
            <p className="text-center text-[22px] font-medium leading-[30px]">
              Start your event journey today!
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <OnboardingHeader step={currentStep} />
            <StageFlow
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default onboarding;
