"use server";
import getRewardsTime from "@/lib/getRewardsTime";
import RewardsForm from "./RewardsForm";
import RightSide from "./RightSide";
import DynamicCountDown from "./DynamicCountDown";

export default async function RewardsBox() {
  const rewardTime = await getRewardsTime();
  if (!(rewardTime instanceof Date) && rewardTime !== null)
    return <>Error Occured</>;

  return (
    <div className="bg-white w-full py-8 items-center rounded-2xl shadow-xl mt-8 px-8 grid grid-cols-2">
      <div className="flex flex-col gap-4">
        <DynamicCountDown rewardTime={rewardTime} />
        <RewardsForm
          isClaimAble={
            rewardTime === null
              ? true
              : rewardTime.getTime() < Date.now()
              ? true
              : false
          }
        />
      </div>
      <RightSide />
    </div>
  );
}
