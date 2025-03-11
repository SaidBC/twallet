import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function ErrorText({
  children,
  className,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <div>
      <p className={clsx(className, "text-red-500 font-bold")} {...props}>
        {children}
      </p>
    </div>
  );
}
