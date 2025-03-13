import Image from "next/image";

export default function RightSide() {
  return (
    <div className="flex flex-col justify-center items-center row-end-2 lg:row-end-auto">
      <div className="w-100 h-100">
        <Image
          src={"/depositImage.png"}
          width={400}
          height={400}
          alt="deposit image"
        />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-800 text-center">
        Deposit your money for safety 100%
      </h1>
    </div>
  );
}
