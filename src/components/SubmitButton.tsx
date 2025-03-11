import { SubmitButtonProps } from "@/types";
import clsx from "clsx";

export default function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={clsx(
        className,
        "py-3.5  cursor-pointer text-lg font-medium rounded-full bg-green-600 hover:bg-green-500 text-white disabled:bg-gray-300 disabled:cursor-default shadow-lg "
      )}
      {...props}
    >
      {children}
    </button>
  );
}
