import axios from "axios";
const BINANCE_URL = process.env.BINANCE_URL;

interface IBinanceAvgPriceResponse {
  mins: number;
  price: string;
  closeTime: number;
}

export default async function getCryptoPrice(symbol: string) {
  const res = await axios.get<IBinanceAvgPriceResponse>(
    BINANCE_URL + `avgPrice?symbol=${symbol}USDT`
  );
  const cryptoPrice = res.data.price;
  return Number(cryptoPrice);
}
