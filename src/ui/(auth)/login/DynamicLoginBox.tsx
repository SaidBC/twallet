"use client";
import dynamic from "next/dynamic";
import AuthBoxSkeleton from "../AuthBoxSkeleton";

const DynamicLoginBox = dynamic(() => import("@/ui/(auth)/login/LoginBox"), {
  ssr: false,
  loading: () => <AuthBoxSkeleton />,
});

export default DynamicLoginBox;
