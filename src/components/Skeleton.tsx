export default function Skeleton() {
  return (
    <div className="flex flex-col gap-9 w-full pb-10 pt-4 animate-pulse">
      <section className="space-y-4">
        <div className="h-8 w-48 bg-gray-300 rounded-md"></div>
        <div className="w-full bg-gray-300 border border-gray-300 rounded-[40px] shadow-md h-[350px] sm:h-[450px]">
          <div className="h-full w-full bg-gray-300/50 rounded-[40px]"></div>
        </div>
      </section>
      <section className="flex w-full flex-col gap-4">
        <div className="h-8 w-40 bg-gray-300 rounded-md"></div>
        {[1, 2].map((index) => (
          <div
            key={index}
            className="w-full h-16 bg-gray-300 border border-gray-400 rounded-[40px] shadow-sm"
          ></div>
        ))}
      </section>
    </div>
  );
}
