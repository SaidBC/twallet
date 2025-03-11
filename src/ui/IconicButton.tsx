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
      className={clsx(className, "text-gray-500 cursor-pointer")}
    >
      <FontAwesomeIcon className="text-2xl" icon={icon} />
    </button>
  );
}
