import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import SignUpSignInModal from "./SignUpSignInModal";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);

  const handleHomeClick = () => console.log("Home clicked");

  const handleHelpClick = () => console.log("Help clicked");

  const handleLoginClick = () => {
    setIsLoginModal(true);
    setIsModalOpen(true);
  };

  const handleCreateEventClick = () => console.log("Create Event clicked");

  const navItems = [
    { item: "Home", id: 1, ariaLabel: "Home", onClick: handleHomeClick },
    {
      item: (
        <>
          Help
          <span>
            <MdKeyboardArrowDown />
          </span>
        </>
      ),
      id: 2,
      ariaLabel: "Help",
      onClick: handleHelpClick,
    },
    { item: "Create Event", id: 4, ariaLabel: "Create Event", onClick: handleCreateEventClick },
    { item: "Login", id: 3, ariaLabel: "Login", onClick: handleLoginClick },
  ];

  return (
    <>
      <nav className="flex justify-end py-5 px-5 bg-[#F1F1F1] items-center font-bold text-sm lg:text-xl">
        <ul className="flex items-center gap-6 cursor-pointer">
          {navItems.map((i) => (
            <li
              role="button"
              className="flex justify-center items-center transition-transform duration-200 ease-in-out hover:scale-[1.1] hover:text-[#FF7F50] hover:opacity-80"
              key={i.id}
              aria-label={i.ariaLabel}
              onClick={i.onClick}
            >
              {i.item}
            </li>
          ))}
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
