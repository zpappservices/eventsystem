import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import SignUpSignInModal from "./SignUpSignInModal";
import { useRouter } from "next/router";
import useAuthToken from "@/hooks/useAuthToken";
import { FaCartShopping } from "react-icons/fa6";
import { useTicketContext } from "@/context/TicketContext"; // Assuming this provides the cart data
import Link from "next/link";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { cart, setCart } = useTicketContext();

  const { activeUser, token } = useAuthToken();
  console.log(activeUser, token);

  const { grandTotalQuantity } = useTicketContext();

  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoginModal(true);
    setIsModalOpen(true);
  };

  const becomeVendor = () => router.push("/auth/onboarding.js");

  console.log(cart, grandTotalQuantity);

  const navItems = [
    { item: "Home", id: 1, ariaLabel: "Home", onClick: () => router.push("/") },
    token && activeUser
      ? {
          item: "Become a Vendor",
          id: 2,
          ariaLabel: "Create Event",
          onClick: becomeVendor,
        }
      : {
          item: "Login",
          id: 3,
          ariaLabel: "Login",
          onClick: handleLoginClick,
        },
  ];

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) =>
        sum +
        item.tickets.reduce(
          (ticketSum, ticket) => ticketSum + ticket.quantity,
          0
        ),
      0
    );
    setTotalQuantity(total);
  }, [cart]);

  return (
    <>
      <nav className="flex justify-end py-5 px-5 bg-[#FF7F50] items-center font-medium text-sm lg:text-lg font-inter">
        <ul className="flex items-center justify-between gap-6 cursor-pointer">
          {navItems.map((i) => (
            <li
              role="button"
              className="flex justify-center items-center transition-all duration-300 ease-in-out hover:scale-[1.1] hover:opacity-80"
              key={i.id}
              aria-label={i.ariaLabel}
              onClick={i.onClick}
            >
              {i.item}
            </li>
          ))}
          <Link href="/cart">
            <div className="relative shrink-0">
              <FaCartShopping color="black" size={21} />
              <p className="text-[9px] h-[17px] w-[17px] font-semibold flex items-center transition-all duration-300 justify-center absolute bg-white rounded-full text-[black] -top-2 -right-2 border-[#FF7F50] border-2">
                {totalQuantity}
              </p>
            </div>
          </Link>
        </ul>
      </nav>

      {/*--------------------------------- Login and sign up modal */}
      {isModalOpen && (
        <SignUpSignInModal
          isLoginModal={isLoginModal}
          setIsLoginModal={setIsLoginModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default NavBar;
