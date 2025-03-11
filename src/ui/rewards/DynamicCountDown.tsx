"use client";
import dynamic from "next/dynamic";

const DynamicCountDown = dynamic(() => import("./CountDown"), { ssr: false });
export default DynamicCountDown;
