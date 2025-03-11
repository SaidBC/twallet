export default function AuthBoxSkeleton() {
  return (
    <div className="bg-white w-lg rounded-4xl py-6 px-8 shadow-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="w-50 h-2 bg-gray-200"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      </div>
      <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
      <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
      <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
      <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
      <div className="w-1/2  h-10 bg-gray-200 rounded-lg self-center"></div>
    </div>
  );
}
