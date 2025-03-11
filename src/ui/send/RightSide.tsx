import Image from "next/image";

export default function RightSide() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-100 h-100">
        <Image
          src={"/withdrawImage.png"}
          width={400}
          height={400}
          alt="withdraw image"
        />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-800 text-center">
        ENJOY WITH 0$ / 0% FEES ON USD TRANSFERS
      </h1>
    </div>
  );
}
