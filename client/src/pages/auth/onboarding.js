import Onboarding from "@/components/auth/Onboarding";
import StageFlow from "@/components/StageFlow";
import SubAccount from "@/components/auth/SubAccount";
import React, { useState } from "react";
import OnboardingHeader from "@/components/auth/OnboardingHeader";
import PrivateRoute from "@/components/dashboard/PrivateRoute";
import OnboardingLayout from "@/components/auth/OnboardingLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import StyledImage from "@/components/StyledImage";

const onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{ component: Onboarding }, { component: SubAccount }];

  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-[600px] flex flex-col gap-3 py-20 relative">
          <Link href="/" className="!z-[1400] mx-auto">
            <StyledImage
              src="/img/logo.svg"
              className="w-full sm:min-w-[150px] max-w-[200px] !z-30 mx-auto"
            />
          </Link>

          <div className="max-w-[370px] mx-auto text-black mb-8">
            <p className="text-center text-base font-medium">
              Let’s create something spectacular
            </p>
            <p className="text-center text-base font-medium">
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
