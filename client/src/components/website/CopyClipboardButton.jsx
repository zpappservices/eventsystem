import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const CopyClipboardButton = ({ copyText, setSuccessMessage }) => {
  const handleCopyClipboard = async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(copyText);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      setSuccessMessage(false);
    }
  };
  return (
    <button
      className={`${inter.className} !min-h-fit h-auto gap-x-2 sm:gap-x-[30px] px-2 py-3.5 md:px-4 flex items-center w-fit font-medium normal-case text-[13px] sm:text-[16px] text-neutral700 bg-baseWhite mt-5 rounded-[20.57px]`}>
      {copyText}
      <img
        src="/images/copy-icon.svg"
        className="w-5 sm:w-[30.88px] hover:scale-105 active:scale-110 transition-all duration-300"
        onClick={handleCopyClipboard}
      />
    </button>
  );
};

export default CopyClipboardButton;
