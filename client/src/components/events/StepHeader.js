import { Check } from "lucide-react";

const StepHeader = ({ stepNumber, totalSteps }) => {
  const getTitle = (step) => {
    switch (step) {
      case 1:
        return "Select ticket type";
      case 2:
        return "Buyer’s Information";
      default:
        return "";
    }
  };

  return (
    <div className="">
      <div className="max-w-sm mx-auto">
        <div className="w-full flex items-center mb-2 mx-auto justify-center">
          {[1, 2].map((step, index) => (
            <div key={step} className="flex items-center">
              {/* Step Circle */}
              <div className="relative">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                    step <= stepNumber
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < stepNumber ? <Check size={16} /> : step}
                </div>

                <h1 className="text-xs text-baseBlack absolute -left-8 top-7 w-fit whitespace-nowrap">
                  {getTitle(step)}
                </h1>
              </div>

              {/* Connector Line */}
              {step < totalSteps && (
                <div
                  className={`h-0.5 flex-1 w-[30vw] md:w-[15vw] ${
                    step < stepNumber ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepHeader;
