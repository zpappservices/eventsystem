import { Loader2 } from "lucide-react";

const FormButton = ({ handleAction, position, direction, isLoading, ...props }) => {
  return (
    <div className={`p-4 flex ${position ? position : "justify-center"}`}>
      <button
        className="sm:w-auto px-3 py-1 mt-9 text-lg font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out bg-[#FF7F50] disabled:bg-gray-400 disabled:text-gray-700 text-white hover:bg-[#FFB26F] hover:scale-[1.05] "
        onClick={() => handleAction()}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : direction}
      </button>
    </div>
  );
};

export default FormButton;
