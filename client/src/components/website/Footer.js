import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { RiFacebookFill } from "react-icons/ri";
import Newsletter from "./Newsletter";

const Footer = () => {
  const year = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const phoneNumber = "+2349032335845";
    const message = "Hello, I have a question about ZafariPlus.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="mt-auto bg-baseBlack py-10 sm:py-20 text-[white] text-center sm:text-left space-y-6">
      <div className="w-full max-w-[1512px] mx-auto flex flex-col sm:flex-row sm:flex-wrap px-5 sm:px-10 gap-10 items-center md:items-start sm:justify-center">
        <div className="space-y-2.5 w-full max-w-[354px] mx-auto sm:mx-0 xl:mx-auto">
          <p className="text-[28px] font-extrabold">
            Zarafi<span className="text-[24px] font-semibold">plus</span>
          </p>
          <p className="text-sm text-white">
            Zarafiplus is a global self-service ticketing platform for live
            experiences that allows anyone to create, share, find and attend
            events that fuel their passions and enrich their lives.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Link href="https://web.facebook.com/zafariplusng">
              <RiFacebookFill className="text-white text-[34px] p-1 bg-[#4267B2] rounded-full" />
            </Link>
            <Link href="https://x.com/zafariplus">
              <FaTwitter className="text-white text-[34px] p-1.5 bg-[#1DA1F2] rounded-full" />
            </Link>
            <Link href="https://www.linkedin.com/in/zafariplus/">
              <div className="text-white w-[34px] h-[34px] p-1.5 bg-[#0A66C2] rounded-full">
                <FaLinkedinIn className="w-full h-full" />
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-3 shrink-0 mx-auto sm:mx-0 xl:mx-auto">
          <p className="text-base font-bold leading-normal">Plan Events</p>

          <div className="flex flex-col gap-1">
            <Link href="/" className="text-white text-[14px] leading-normal">
              Create and Set Up
            </Link>
            <Link href="/">
              <p className="text-white text-[14px] leading-normal">
                Sell Tickets
              </p>
            </Link>
            <Link href="/">
              <p className="text-white text-[14px] leading-normal">
                Online RSVP{" "}
              </p>
            </Link>
            <Link href="/">
              <p className="text-white text-[14px] leading-normal">
                Online Events
              </p>
            </Link>
          </div>
        </div>

        <div className="space-y-3 shrink-0 mx-auto sm:mx-0 xl:mx-auto">
          <p className="text-[18px] font-bold leading-normal">About Us</p>

          <div className="flex flex-col gap-1">
            <Link href="/contact">
              <p className="text-white text-[14px] leading-normal">
                Contact Us
              </p>
            </Link>
            <Link href="/">
              <p className="text-white text-[14px] leading-normal">
                Help Center
              </p>
            </Link>
            <Link href="/" className="text-white text-[14px] leading-normal">
              <p className="text-white text-[14px] leading-normal">
                How it Works
              </p>
            </Link>
            <Link
              href="/useragreement"
              className="text-white text-[14px] leading-normal"
            >
              <p className="text-white text-[14px] leading-normal">Privacy</p>
            </Link>
            <Link
              href="/terms"
              className="text-white text-[14px] leading-normal"
            >
              <p className="text-white text-[14px] leading-normal">Terms</p>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[387px]  space-y-2.5 mx-auto sm:mx-0 xl:mx-auto">
          <p className="text-[18px] font-bold leading-normal">
            Stay in the loop
          </p>

          <p className="text-white text-[14px] leading-normal">
            Join our mailing list to stay in the loop with our newest for Event
            and concert
          </p>

          <Newsletter />
        </div>
      </div>
      {/* <div className="w-full text-center ">
        <p className="text-[14px] sm:text-[16px]">
          &copy; {year} Zafariplus LTD
        </p>
      </div> */}
    </div>
  );
};

export default Footer;
