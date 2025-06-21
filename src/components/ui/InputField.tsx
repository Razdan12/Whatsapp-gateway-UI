import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Message } from "./error.field";
import { RiSearchLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

type InputProps = {
  error?: string | FieldError;
  type:
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "search"
    | "tel"
    | "text"
    | "password"
    | "time";
    
  placeholder?: string;
  className?: string;
  icon?: string;
  direction?: "left" | "right";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { error, className, placeholder, type, icon, direction = "left", ...rest },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    const selectedIcon = {
      search: <RiSearchLine />,
      email: <MdEmail />,
    };

    return (
      <div className="w-full">
        <label
          className={twMerge(
            icon
              ? "border h-[48px] rounded-lg px-3 flex items-center gap-2 focus-within:border-primary fill-[#b3b3b3] focus-within:fill-primary"
              : "form-control w-full",
            className
          )}
        >
          {icon && direction == "left"
            ? selectedIcon[icon as keyof typeof selectedIcon]
            : null}
          <input
            type={type}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (type == "tel") {
                const allowedKeys = /[0-9]/;
                const specialKeys = [
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                ];

                if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }
            }}
            className={twMerge(
              `${
                icon ? "grow outline-none group" : "input input-bordered"
              } w-full ${error ? "border-red-600" : ""}`,
              className
            )}
            {...rest}
            ref={ref}
          />
          {icon && direction == "right"
            ? selectedIcon[icon as keyof typeof selectedIcon]
            : null}
        </label>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;