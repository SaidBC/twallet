"use client";
import dynamic from "next/dynamic";
import AuthBoxSkeleton from "../AuthBoxSkeleton";

const DynamicSignupBox = dynamic(() => import("@/ui/(auth)/signup/SignupBox"), {
  ssr: false,
  loading: () => <AuthBoxSkeleton />,
});
export default DynamicSignupBox;
