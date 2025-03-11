import clsx from "clsx";
import { Fragment } from "react";

interface StepsProps {
  currentStep: number;
  steps: number;
}
export default function Steps({ currentStep, steps }: StepsProps) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: steps }, (_, i) => (
        <Fragment key={i}>
          <div
            className={clsx(
              `relative w-4 h-4 rounded-full border-2 border-gray-100`,
              currentStep >= i + 1 ? "bg-green-500" : "bg-gray-300"
            )}
          >
            <span
              className={clsx(
                currentStep >= i + 1 ? "text-green-500" : "text-gray-300",
                "absolute text-sm font-medium bg w-15 -bottom-7 -left-4"
              )}
            >
              STEP {i + 1}
            </span>
          </div>
          {steps >= i + 2 && (
            <div
              className={clsx(
                "h-1 w-24 rounded-full",
                currentStep === i + 1
                  ? "bg-gradient-to-r from-green-400 to-gray-400"
                  : currentStep >= i + 1
                  ? "bg-green-400"
                  : "bg-gray-400"
              )}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
