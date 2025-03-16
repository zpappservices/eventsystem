const Modal = ({ isOpen, children, container }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative w-full max-h-screen overflow-y-auto z-10">
        <div className="flex justify-center px-5">
          {/* Modal content container with scrollable behavior */}
          <div className={`max-h-[96vh] py-3 overflow-y-auto ${container}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
