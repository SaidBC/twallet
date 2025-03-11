import IconicButton from "@/ui/(auth)/IconicButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "./LoginForm";

export default function LoginBox() {
  return (
    <div className="bg-white w-lg rounded-4xl py-6 px-8 shadow-2xl">
      <div className="flex items-center justify-between">
        <div></div>
        <p className="text-xs">
          Please check that you are visiting correct URL:
        </p>
        <IconicButton icon={faXmark} />
      </div>
      <LoginForm />
    </div>
  );
}
