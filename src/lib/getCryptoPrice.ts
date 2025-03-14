import envClient from "@/utils/envClient";
import axios from "axios";
const BINANCE_URL = envClient.NEXT_PUBLIC_BINANCE_URL;

interface IBinanceAvgPriceResponse {
  mins: number;
  price: string;
  closeTime: number;
}

export default async function getCryptoPrice(symbol: string) {
  try {
    const res = await axios.get<IBinanceAvgPriceResponse>(
      BINANCE_URL + `avgPrice?symbol=${symbol}USDT`
    );
    const cryptoPrice = res.data.price;
    return Number(cryptoPrice);
  } catch (err) {
    console.error(err);
    return 0;
  }
}
