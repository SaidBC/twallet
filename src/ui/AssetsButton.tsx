import getAssets from "@/lib/getAssets";
import getTotalAssetsInUSD from "@/lib/getTotalAssetsInUSD";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function AssetsButton() {
  const total = await getTotalAssetsInUSD();
  return (
    <div>
      <button className="flex items-center gap-2 bg-green-500 border-2 text-white rounded-full px-8 py-2 cursor-pointer">
        <FontAwesomeIcon icon={faSackDollar} className="text-xl" />
        <div className="flex">
          <span className="text-2xl">${total.toString().split(".")[0]}</span>
          <span className="text-xs">.00</span>
        </div>
      </button>
    </div>
  );
}
