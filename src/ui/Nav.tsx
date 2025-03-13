"use client";
import {
  faClockRotateLeft,
  faDollar,
  faHouse,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import IconicItem from "./IconicItem";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="bg-gray-200 fixed w-18 h-full">
      <div className="w-full py-5 text-3xl font-bold text-white bg-green-400 text-center">
        <span>T</span>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        <IconicItem
          className={clsx(
            path === "/" && "bg-white border-r-green-400 text-green-400"
          )}
          href="/"
          icon={faHouse}
        />
        <IconicItem
          className={clsx(
            path === "/receive" && "bg-white border-r-green-400 text-green-400"
          )}
          href="/receive"
          icon={faPlus}
        />
        <IconicItem
          className={clsx(
            path === "/send" && "bg-white border-r-green-400 text-green-400"
          )}
          href="/send"
          icon={faPaperPlane}
        />
        <IconicItem
          className={clsx(
            path === "/history" && "bg-white border-r-green-400 text-green-400"
          )}
          href="/history"
          icon={faClockRotateLeft}
        />
        <IconicItem
          className={clsx(
            path === "/rewards" && "bg-white border-r-green-400 text-green-400"
          )}
          href="/rewards"
          icon={faDollar}
        />
      </ul>
    </nav>
  );
}
