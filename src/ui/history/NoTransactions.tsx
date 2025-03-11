import Image from "next/image";

export default function NoTransactions() {
  return (
    <div className="flex flex-col items-center mt-16 mb-10">
      <div>
        <Image
          src={"/noTransactionsImage.png"}
          width={175}
          height={175}
          alt="no transaction image"
        />
      </div>
      <h2 className="text-xl font-bold text-gray-700">No transactions yet !</h2>
    </div>
  );
}
