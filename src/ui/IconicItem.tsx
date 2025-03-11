import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function IconicItem({
  href,
  className,
  icon,
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: IconDefinition; href: string }) {
  return (
    <li>
      <Link
        className={clsx(
          className,
          "flex justify-center hover:bg-white hover:text-blue-400 w-full py-5 border-r-3 border-transparent hover:border-r-blue-400"
        )}
        href={href}
      >
        <FontAwesomeIcon icon={icon} />
      </Link>
    </li>
  );
}
