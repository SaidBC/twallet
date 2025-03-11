import Link from "next/link";

export default function TermsAndServices() {
  return (
    <p className=" text-xs text-center max-w-2xs self-center">
      By confirming the registration, I accept the{" "}
      <Link className="text-blue-400" href="/">
        user agreement
      </Link>{" "}
      of the payment system
    </p>
  );
}
