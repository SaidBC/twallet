import { logout } from "@/lib/actions";
import { getSessionUser } from "@/lib/sessions";
import AssetsButton from "@/ui/AssetsButton";
import IconicButton from "@/ui/IconicButton";
import {
  faClipboard,
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Header() {
  const currentUser = await getSessionUser();
  return (
    <header className=" flex items-center justify-between px-8">
      <AssetsButton />
      <div className="flex items-center gap-8 text-gray-500">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faUser} className="text-2xl" />
          <div className="flex flex-col text-xs">
            <span>Account No.</span>
            <span className="text-sm font-bold text-gray-700">
              {currentUser?.accountName}
            </span>
          </div>
          <button className="text-gray-400 cursor-pointer hover:text-blue-400">
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
        <IconicButton icon={faGear} />
        <form action={logout}>
          <IconicButton icon={faRightFromBracket} />
        </form>
      </div>
    </header>
  );
}
