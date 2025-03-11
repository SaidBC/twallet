import RightSide from "./RightSide";
import TransferForm from "./TranferForm";

export default function TransferBox() {
  return (
    <div className="bg-white w-full py-8 rounded-2xl shadow-xl mt-8 px-8 grid grid-cols-2">
      <TransferForm />
      <RightSide />
    </div>
  );
}
