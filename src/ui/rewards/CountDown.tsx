"use client";
import formateTime from "@/utils/formateTime";
import { useEffect, useState } from "react";

export default function CountDown({ rewardTime }: { rewardTime: Date | null }) {
  const [timeLeft, setTimeLeft] = useState(
    () => (rewardTime?.getTime() || 0) - Date.now()
  );

  useEffect(() => {
    if (!rewardTime) return;

    const interval = setInterval(() => {
      const remaining = rewardTime.getTime() - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [rewardTime]);

  const formattedTime = formateTime(timeLeft);
  return (
    <span className="text-5xl font-extrabold text-gray-600 text-center">
      {formattedTime}
    </span>
  );
}
