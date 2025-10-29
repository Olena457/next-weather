import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <h2 className="text-2xl font-bold text-red-500 dark:text-zinc-50">
        Welcome to the Next.js Weather App
      </h2>
    </div>
  );
}
