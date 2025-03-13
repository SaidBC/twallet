import getCryptoPrice from "@/lib/getCryptoPrice";
import clsx from "clsx";
import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import padZeros from "../utils/padZeros";
import Link from "next/link";

interface AssetCardProps {
  quantity: number;
  name: string;
  symbol: string;
  icon: React.ReactNode;
}

export default async function AssetCard({
  name,
  icon,
  symbol,
  quantity,
  className,
}: AssetCardProps &
  DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
  let cryptoPrice = 1;
  if (!["USD", "EUR"].includes(symbol))
    cryptoPrice = await getCryptoPrice(symbol);
  return (
    <li
      className={clsx(
        "px-4 rounded-xl text-white flex flex-col gap-6 py-6 items-center max-w-md w-full",
        className
      )}
    >
      <div className="flex justify-between items-center w-full px-2">
        <span className="font-bold">{name}</span>
        {symbol !== "USD" ? (
          <span className="font-bold">{quantity * cryptoPrice}</span>
        ) : (
          <span></span>
        )}
        <div className="rounded-full text-lg flex justify-center items-center w-10 h-10 border-2 border-white">
          {icon}
        </div>
      </div>
      <div className="flex font-bold ">
        <span className="text-6xl">{quantity.toString().split(".")[0]}</span>
        <span className="text-2xl text-white/70">
          .{padZeros(cryptoPrice, +quantity.toString().split(".")[1] || 0)}{" "}
          {symbol}
        </span>
      </div>
      <div className="flex gap-2">
        <Link
          href="/receive"
          className="border-1 border-white px-8 py-0.5 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
        >
          Deposit
        </Link>
        <Link
          href="send"
          className="border-1 border-white px-8 py-0.5 rounded-full cursor-pointer hover:bg-white hover:text-gray-800"
        >
          Withdraw
        </Link>
      </div>
    </li>
  );
}
