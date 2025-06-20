import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";

const Card = ({ icon, role, subHeading, selectedRole, setRole }) => {
  const isSelected = role === selectedRole;
  return (
    <div
      onClick={() => setRole(role)}
      className={`w-full max-w-[445px] border flex flex-col items-center py-10 sm:py-24 transition-all cursor-pointer mx-auto shadow-md rounded-[20px] space-y-10 relative ${
        isSelected ? "border-primary" : "border-neutrals100/20"
      }`}
    >
      <div
        className={`absolute w-full -top-5 left-0 right-0 transition-opacity ${
          isSelected ? "opacity-100" : "opacity-0"
        }`}
      >
        <StyledImage src="/img/selected-role.svg" className="mx-auto" />
      </div>
      <p className="text-baseBlack text-[50px] sm:text-[61px]">{icon}</p>

      <div>
        <p className="font-medium text-center text-xl sm:text-2xl text-baseBlack">
          {role}
        </p>
        <p className="font-medium text-center text-sm sm:text-base text-baseBlack/30">
          {subHeading}
        </p>
      </div>
    </div>
  );
};

const role = () => {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleProceed = () => {
    if (role === "User") {
      router.push("/");
    } else if (role === "Organizer") {
      router.push("/auth/onboarding");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1200px] px-5 sm:px-8 space-y-10 sm:space-y-20">
        <Link href="/" className="!z-[1400] mx-auto">
          <StyledImage
            src="/img/logo.svg"
            className="w-full sm:min-w-[150px] max-w-[200px] !z-30 mx-auto"
          />
        </Link>

        <div className="w-full max-w-[400px] mx-auto">
          <p className="text-center text-xl sm:text-[40px] not-italic font-bold leading-[140%] text-primary1000">
            Let’s get you started
          </p>
          <p className="text-base text-center sm:text-xl font-semibold text-baseBlack/50">
            Choose how you want to use the app
          </p>
        </div>

        <div className="w-full max-w-[1128px] grid sm:grid-cols-2 gap-5 gap-y-12 sm:gap-12 mx-auto">
          <Card
            icon={<FaUser />}
            role="User"
            subHeading="Let’s find the perfect event for you!"
            setRole={setRole}
            selectedRole={role}
          />

          <Card
            icon={<FaAddressCard />}
            role="Organizer"
            subHeading="Ready to create amazing events?"
            setRole={setRole}
            selectedRole={role}
          />
        </div>

        <Button
          style="mx-auto w-full max-w-[130px] !font-bold"
          onClick={handleProceed}
          disabled={!role}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default role;
