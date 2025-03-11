import IconicButton from "@/ui/(auth)/IconicButton";
import Steps from "@/components/Steps";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";

interface BoxHeaderProps {
  currentStep: number;
  canBackward: boolean;
  handleBackMiniStep: () => void;
}

export default function BoxHeader({
  currentStep,
  canBackward,
  handleBackMiniStep,
}: BoxHeaderProps) {
  const handleBackward: MouseEventHandler<HTMLButtonElement> = function (e) {
    window.localStorage.removeItem("signupState");
    handleBackMiniStep();
  };
  return (
    <div className="flex justify-between">
      {canBackward ? (
        <IconicButton onClick={handleBackward} icon={faArrowLeftLong} />
      ) : (
        <div></div>
      )}
      <Steps currentStep={currentStep} steps={3} />
      <IconicButton icon={faXmark} />
    </div>
  );
}
