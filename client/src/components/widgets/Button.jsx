const Button = ({
  size = "medium",
  children,
  style,
  background = "bg-primary",
  text = "text-baseWhite",
  border = "border-primary",
  hover = "hover:bg-primary/90",
  outline,
  textButton,
  isLoading = false,
  loaderFillColor = "#fff",
  disabledLoadingStyle = "disabled:bg-baseBlack disabled:text-primary",
  ...props
}) => {
  const sizeClasses = {
    small: "py-1 px-[11px] text-[14px] leading-[21px]",
    medium: "py-2.5 px-[16px]",
    large: "py-5 px-[21px]",
  };

  const outlineClass = outline
    ? `border-[2px] border bg-white ${border} ${text}`
    : "border-none";
  const backgroundColor = textButton ? "" : `${background} ${hover} ${text}`;
  const textOnly = textButton && `bg-none border-none ${text}`;

  return (
    <button
      className={`btn hover:scale-[1.02] active:hover:scale-[1.05] min-h-fit h-fit normal-case relative rounded-[8px] transition-all duration-300 ease-in-out flex items-center justify-center font-semibold ${
        isLoading
          ? disabledLoadingStyle
          : "disabled:bg-neutrals200 disabled:text-neutrals500"
      } ${backgroundColor} ${
        sizeClasses[size]
      } ${text} ${outlineClass} ${textOnly} ${style}`}
      {...props}>
      {isLoading ? (
        <span className="flex items-center justify-center mt-0.5">
          <svg
            className="w-[15px] h-[15px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
            fill="none">
            <path
              d="M50 100C22.4179 100 0 77.5821 0 50C0 22.4179 22.4179 0 50 0C77.5821 0 100 22.4179 100 50C100 77.5821 77.5821 100 50 100ZM50 5C25.4655 5 5 25.4655 5 50C5 74.5345 25.4655 95 50 95C74.5345 95 95 74.5345 95 50C95 25.4655 74.5345 5 50 5ZM50 80C60.6287 80 69.5393 73.7957 72.4167 65.5H27.5833C30.4607 73.7957 39.3713 80 50 80Z"
              fill={loaderFillColor}
            />
          </svg>
        </span>
      ) : (
        <span className="transition-opacity">{children}</span>
      )}
    </button>
  );
};

export default Button;
