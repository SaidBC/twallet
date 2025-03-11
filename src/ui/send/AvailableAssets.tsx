import { Asset } from "@/types";

export default function AvailableAssets({
  assets,
  symbol,
}: {
  assets: Asset[];
  symbol: string;
}) {
  if (assets === null) return <span>0.00 {symbol} available</span>;
  return (
    <span className="text-gray-700 font-bold">
      {assets.find((asset) => asset.symbol === symbol)?.quantities || "0.00"}{" "}
      {symbol} available
    </span>
  );
}
