import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
} from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string | React.ReactNode;
  success?: boolean;
  setInput: Dispatch<SetStateAction<any>>;
};

export default function Input({
  label,
  success,
  setInput,
  className,
  ...props
}: InputProps) {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setInput(e.target.value);
    },
    []
  );
  return (
    <label className="flex flex-col-reverse gap-1 relative">
      <input
        onChange={handleChange}
        className={clsx(
          className,
          "w-full p-3 outline-none border-2 rounded-xl focus:border-sky-400 focus:text-sky-400 placeholder:text-gray-200 text-xl font-bold peer",
          success ? "border-green-400" : "border-gray-200"
        )}
        {...props}
      />
      {success && (
        <div className="absolute text-green-400 text-lg right-4  bottom-3.5">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
      <span
        className={clsx(
          success ? "text-green-400" : "text-gray-500",
          "peer-focus:text-blue-400 ml-3"
        )}
      >
        {label}
      </span>
    </label>
  );
}
