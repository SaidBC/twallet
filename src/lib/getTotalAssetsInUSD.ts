import getAssets from "./getAssets";
import getCryptoPrice from "./getCryptoPrice";

export default async function getTotalAssetsInUSD() {
  const assets = await getAssets();
  if (assets === null) return 0;
  let total = 0;
  assets.forEach(async (asset) => {
    if (asset.symbol === "USD" || asset.symbol === "EUR")
      return (total += asset.quantities);
    const cryptoPrice = await getCryptoPrice(asset.symbol);
    total += cryptoPrice * asset.quantities;
  });
  return total;
}
