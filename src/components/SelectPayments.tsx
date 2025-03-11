import {
  ChangeEventHandler,
  DetailedHTMLProps,
  Dispatch,
  SelectHTMLAttributes,
  SetStateAction,
  useCallback,
} from "react";

type SelectPaymentProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  setInput: Dispatch<SetStateAction<string>>;
  label: string;
};

export default function SelectPayments({
  setInput,
  label,
  ...props
}: SelectPaymentProps) {
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      setInput(e.target.value);
    },
    []
  );
  return (
    <label className="flex flex-col-reverse gap-1 relative">
      <select
        onChange={handleChange}
        className="w-full p-3 outline-none border-2 rounded-xl focus:border-sky-400 focus:text-sky-400 placeholder:text-gray-200 text-xl font-bold peer"
        name="method"
        id="method"
        {...props}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BTC">USD</option>
        <option value="XRP">XRP</option>
        <option value="LTC">LTC</option>
        <option value="ETH">ETH</option>
      </select>
      <span className={"peer-focus:text-blue-400 ml-3"}>{label}</span>
    </label>
  );
}
