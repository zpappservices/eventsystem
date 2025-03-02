import React from "react";
import { Loader2 } from "lucide-react";

export function ButtonLoading({ isLoading = false, children, className = "", ...props }) {
  return (
    <button
      className={`w-full self-center p-1 py-2.5 mt-3 font-medium bg-[#FF7F50] text-white rounded transition-transform duration-200 ease-in-out hover:scale-[1.05] flex items-center justify-center gap-2 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
}
