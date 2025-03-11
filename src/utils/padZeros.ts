export default function padZeros(price: number, quantities: number) {
  const zeros = price.toString().split(".")[0].length + 1;
  return quantities.toString().padEnd(zeros, "0");
}
