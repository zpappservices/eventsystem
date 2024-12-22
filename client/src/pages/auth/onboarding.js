import Onboarding from "@/components/auth/Onboarding";
import StageFlow from "@/components/StageFlow";
import SubAccount from "@/components/auth/SubAccount";
import React, { useState } from "react";
import OnboardingHeader from "@/components/auth/OnboardingHeader";
import PrivateRoute from "@/components/dashboard/PrivateRoute";
import OnboardingLayout from "@/components/auth/OnboardingLayout";
import { useRouter } from "next/router";

const onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{ component: Onboarding }, { component: SubAccount }];

  const router = useRouter();

  const goBack = () => {
    router.push("/auth/vendor/signup");
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-[600px] flex flex-col gap-10 py-20 relative">
          <p
            className="absolute left-0 top-10 flex items-center gap-x-2 text-[18px] font-medium cursor-pointer mr-auto mb-5"
            onClick={goBack}>
            <img src="/img/return.svg" />
            Back
          </p>
          <div className="max-w-[370px] mx-auto text-black">
            <p className="text-center text-[22px] font-medium leading-[30px]">
              Let’s create something spectacular
            </p>
            <p className="text-center text-[22px] font-medium leading-[30px]">
              Start your event journey today!
            </p>
          </div>
          <OnboardingLayout>
            <div className="flex flex-col gap-5">
              <OnboardingHeader step={currentStep} />
              <StageFlow
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>
          </OnboardingLayout>
        </div>
      </div>
    </>
  );
};

export default onboarding;
