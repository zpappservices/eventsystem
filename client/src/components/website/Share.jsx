import React, { useState } from "react";
import CopyClipboardButton from "./CopyClipboardButton";
import Link from "next/link";
import Button from "../widgets/Button";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiFacebookFill } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";

const Share = ({ closeModal, text, url }) => {
  const [successMessage, setSuccessMessage] = useState(false);

  const shareUrl = url;
  const twitterText = url;
  const facebookText = url;
  const instagramText = url;
  const whatsappText = url;
  const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    whatsappText
  )}`;

  return (
    <div className="max-w-[576px] max-h-[95vh] overflow-y-auto bg-white rounded-[40px] w-full flex flex-col items-center p-5 sm:p-10 gap-y-[20px] mx-auto md:mx-0 relative">
      <div className="w-full border-[#E7E7E7] border flex flex-col items-center gap-y-[40px] rounded-[16px] py-8 p-2 z-10 relative">
        <p className="sm:text-[16px] text-[13px] sm:leading-[20px] text-baseBlack">
          Share with
        </p>
        <div className="w-fit flex gap-x-2.5 md:gap-[21px] mx-auto">
          <Link
            href={whatsappShareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-y-2">
            <FaWhatsapp className="text-white bg-success500 text-[28px] p-1 cursor-pointer rounded-sm" />
            <p className="text-[13px] sm:text-[14px] text-[#81909D] leading-[11px] text-center">
              Whatsapp
            </p>
          </Link>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}&quote=${encodeURIComponent(facebookText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-y-2">
            <RiFacebookFill className="text-white bg-[#1877F2] text-[28px] p-0.5 cursor-pointer rounded-sm" />
            <p className="text-[13px] sm:text-[14px] text-[#81909D] leading-[11px] text-center">
              Facebook
            </p>
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}&text=${encodeURIComponent(twitterText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-y-2">
            <FaXTwitter className="text-white bg-baseBlack text-[28px] p-1 cursor-pointer rounded-sm" />
            <p className="text-[13px] sm:text-[14px] text-[#81909D] leading-[11px]">
              Twitter
            </p>
          </Link>
          <Link
            href={`mailto:?subject=${encodeURIComponent(
              instagramText
            )}&body=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-y-2">
            <MdAlternateEmail className="text-neutrals800 bg-neutrals200 text-[28px] p-1 cursor-pointer rounded-sm" />
            <p className="text-[13px] sm:text-[14px] text-[#81909D] leading-[11px]">
              E-mail
            </p>
          </Link>
        </div>
        <div className="w-full flex flex-col items-center ">
          <p className="text-[16px] font-semibold text-center leading-[19.29px] text-baseBlack">
            Or share with link
          </p>
          <CopyClipboardButton
            copyText={shareUrl}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
        <p
          className={`text-[16px] flex gap-x-1.5 items-center text-center text-[#223263] font-medium absolute bottom-[2px] transition-all ${
            successMessage ? "opacity-100" : "opacity-0"
          }`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-copy-check"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#223263"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
            <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
            <path d="M11 14l2 2l4 -4" />
          </svg>
          copied!
        </p>
      </div>
      <Button
        style="!py-3.5 !px-10 mx-auto !font-medium !leading-normal !text-[16px] !w-full !max-w-[214px] mt-2"
        onClick={closeModal}>
        Close
      </Button>
    </div>
  );
};

export default Share;
