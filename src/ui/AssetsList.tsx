import DollarIcon from "@/components/Icons/DollarIcon";
import AssetCard from "./AssetCard";
import EthereumIcon from "@/components/Icons/EthereumIcon";
import BitcoinIcon from "@/components/Icons/BitcoinIcon";
import LitecoinIcon from "@/components/Icons/LitecoinIcon";
import XrpIcon from "@/components/Icons/XrpIcon";
import EuroIcon from "@/components/Icons/EuroIcon";
import getAssets from "@/lib/getAssets";

export default async function AssetsList() {
  const assets = await getAssets();
  if (assets === null) return <>Something went wrongs</>;

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <div className="bg-gray-100 w-fit p-4 rounded-t-lg font-bold text-gray-700">
        <h1>ALL ASSETS</h1>
      </div>
      <div className="bg-gray-100 rounded-lg rounded-tl-none">
        <ul className="grid grid-cols-3 gap-4 px-4 py-3 ">
          <AssetCard
            name="Dollar"
            symbol="USD"
            icon={<DollarIcon className="fill-white w-6 h-6" />}
            quantity={
              assets.find((asset) => asset.symbol === "USD")?.quantities || 0
            }
            className="bg-green-500"
          />
          <AssetCard
            name="Euro"
            symbol="EUR"
            icon={<EuroIcon className="fill-white w-6 h-6" />}
            quantity={
              assets.find((asset) => asset.symbol === "EUR")?.quantities || 0
            }
            className="bg-blue-500"
          />
          <AssetCard
            name="Bitcoin"
            symbol="BTC"
            icon={<BitcoinIcon className="fill-white w-6 h-6" />}
            quantity={
              assets.find((asset) => asset.symbol === "BTC")?.quantities || 0
            }
            className="bg-amber-500"
          />
          <AssetCard
            name="Ripple"
            symbol="XRP"
            icon={<XrpIcon className="text-white w-6 h-6" />}
            quantity={
              assets.find((asset) => asset.symbol === "XRP")?.quantities || 0
            }
            className="bg-black "
          />
          <AssetCard
            name="Litecoin"
            symbol="LTC"
            icon={<LitecoinIcon className="fill-white w-6 h-6" />}
            quantity={
              assets.find((asset) => asset.symbol === "LTC")?.quantities || 0
            }
            className="bg-gray-500"
          />
          <AssetCard
            name="Ethereum"
            symbol="ETH"
            icon={<EthereumIcon className="fill-white w-6 h-6" />}
            quantity={
              assets.find((asset) => asset.symbol === "ETH")?.quantities || 0
            }
            className="bg-slate-500"
          />
        </ul>
      </div>
    </div>
  );
}
