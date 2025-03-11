import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function IconicButton({
  icon,
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: IconDefinition }) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        "rounded-full flex w-10 h-10 justify-center items-center border-2 border-current text-gray-400 hover:text-white active:text-white hover:border-blue-400 active:border-blue-600 hover:bg-blue-400 cursor-pointer active:bg-blue-600"
      )}
    >
      <FontAwesomeIcon className="text-xl" icon={icon} />
    </button>
  );
}
