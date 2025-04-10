import DynamicLoginBox from "@/ui/(auth)/login/DynamicLoginBox";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-6 mb-12">
      <div className="text-white flex flex-col items-center gap-3">
        <h2 className="text-lg">AUTHORIZATION</h2>
        <div className="border-t-2 border-t-green-500 w-16"></div>
        <h1 className="text-5xl">Login</h1>
      </div>
      <DynamicLoginBox />
      <div className="flex gap-4 items-center text-white text-xl">
        <p>Don’t have an account?</p>
        <Link
          className="flex gap-3 items-center rounded-full px-4 py-3 border-2 border-blue-300 hover:text-white active:text-white hover:border-blue-400 active:border-blue-600 hover:bg-blue-400 cursor-pointer active:bg-blue-600"
          href="/signup"
        >
          <FontAwesomeIcon icon={faWallet} />
          <span>Create</span>
        </Link>
      </div>
    </div>
  );
}
