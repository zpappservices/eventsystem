import Link from "next/link";
import React from "react";

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
    <div className="mt-auto bg-gray-900 py-3 px-5 text-[white] text-center sm:text-left space-y-6">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-[120px] items-center sm:items-start sm:justify-center">
        <div>
          <p className="text-[18px] font-bold leading-normal">Resources:</p>

          <Link
            href="/about"
            className="text-baseWhite text-[14px] leading-normal"
          >
            About us
          </Link>
          <Link href="/">
            <p className="text-baseWhite text-[14px] leading-normal">Jobs</p>
          </Link>
          <Link href="/">
            <p className="text-baseWhite text-[14px] leading-normal">Career</p>
          </Link>
          <Link href="/">
            <p className="text-baseWhite text-[14px] leading-normal">FAQ</p>
          </Link>
        </div>

        <div>
          <p className="text-[18px] font-bold leading-normal">Social:</p>
          <Link href="https://web.facebook.com/zafariplusng">
            <p className="text-baseWhite text-[14px] leading-normal">
              Facebook
            </p>
          </Link>
          <Link href="https://www.instagram.com/zafariplusafrika/">
            <p className="text-baseWhite text-[14px] leading-normal">
              Instagram
            </p>
          </Link>
          <Link
            href="https://x.com/zafariplus"
            target="_blank"
            className="text-baseWhite text-[14px] leading-normal"
          >
            Twitter
          </Link>
        </div>

        <div>
          <p className="text-[18px] font-bold leading-normal">Support:</p>
          <Link href="/">
            <p className="text-baseWhite text-[14px] leading-normal">
              Sell Tickets
            </p>
          </Link>
          <Link href="/">
            <p className="text-baseWhite text-[14px] leading-normal">FAQs</p>
          </Link>
          <p
            onClick={handleWhatsAppClick}
            className="text-baseWhite text-[14px] leading-normal cursor-pointer"
          >
            Chat with Agent Zafari
          </p>
          <Link href="/contact">
            <p className="text-baseWhite text-[14px] leading-normal">
              Contact us
            </p>
          </Link>
          <Link
            href="/terms"
            className="text-baseWhite text-[14px] leading-normal"
          >
            Terms & Privacy
          </Link>
          <Link
            href="/useragreement"
            className="text-baseWhite text-[14px] leading-normal"
          >
            User agreement
          </Link>
        </div>
      </div>
      <div className="w-full text-center ">
        <p className="text-[14px] sm:text-[16px]">
          &copy; {year} Zafariplus LTD, All Rights Reserved ZAFARIPLUS is not
          responsible for the content of external sites.
        </p>
      </div>
    </div>
  );
};

export default Footer;
