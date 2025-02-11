import { GoDotFill } from "react-icons/go";
import Button from "./widgets/Button";
import StyledImage from "./StyledImage";
import { motion } from "framer-motion";

const Header = ({ step }) => {
  return (
    <div className="w-full transition-all py-20 sm:py-[100px] px-5 sm:px-[98px] hero overflow-hidden">
      <div
        className="w-full hero-content bg-cover bg-center flex flex-col gap-y-20 md:flex-row items-center justify-between"
        style={{ backgroundImage: "url('/path/to/your-image.jpg')" }}>
        <div className="w-full max-w-[608px] space-y-5 text-white">
          <div className="space-y-3">
            <p className="text-[18px] sm:text-[20px] font-bold sm:leading-[24px]">
              {" "}
              All the fun starts here
            </p>
            <p className="text-[22px] sm:text-[48px] font-bold sm:leading-[57px]">
              Exclusive event, priceless moments
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-2 sm:gap-3">
              <GoDotFill className="text-[16px] text-neutrals100 mt-1" />
              <p className="text-[16px] sm:text-[18px] font-semibold leading-normal">
                Safe, Secure, Reliable event management
              </p>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <GoDotFill className="text-[16px] text-neutrals100 mt-1" />
              <p className="text-[16px] sm:text-[18px] font-semibold leading-normal">
                Your ticket to live events
              </p>
            </div>
          </div>

          <div className="w-full max-w-[507px] !mt-10 flex flex-col sm:flex-row items-center gap-6">
            <Button size="large" style="w-full sm:w-auto flex-1">
              Book Ticket
            </Button>
            <Button
              size="large"
              style="w-full sm:w-auto flex-1"
              background="!bg-inherit"
              hover="hover:!bg-primary"
              border="border-1 border-primary"
              outline={true}>
              Create Event
            </Button>
          </div>
        </div>

        <div className="w-full max-w-[595px] grid grid-cols-2 gap-4">
          <div className="">
            <div className="max-w-[274px] h-[242px] mx-auto">
              <StyledImage
                src="/img/hero-2.png"
                className="w-full h-full object-cover animate-pulseScale"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="max-w-[205px] h-[181px] mx-auto relative">
              <StyledImage
                src="/img/hero-3.png"
                className="w-full h-full object-cover animate-pulseScale"
              />

              <StyledImage
                src="/img/top-right-border.svg"
                className="absolute -top-4 -right-4"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="max-w-[191px] h-[169px] mx-auto relative">
              <StyledImage
                src="/img/hero-4.png"
                className="w-full h-full object-cover animate-pulseScale"
              />
              <StyledImage
                src="/img/borrom-left-border.svg"
                className="absolute -bottom-4 -left-4"
              />
            </div>
          </div>
          <div className="">
            <div className="max-w-[274px] h-[242px] mx-auto">
              <StyledImage
                src="/img/hero-5.png"
                className="w-full h-full object-cover animate-pulseScale"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
