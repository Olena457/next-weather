// src/components/NotFound.tsx

"use client";

import { Frown, Home } from "lucide-react";
import Wrapper from "./Wrapper";
import { useSetAtom } from "jotai";
import { placeAtom } from "../app/atom";

const DEFAULT_PLACE = "Kyiv";

export default function NotFound() {
  const setPlace = useSetAtom(placeAtom);

  const handleGoHome = () => {
    setPlace(DEFAULT_PLACE);
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center p-8 min-h-[300px] text-white">
      <Frown className="w-18 h-18 text-white mb-4" />

      <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
        City Not Found!
      </h2>
      <p className="text-lg text-gray-300 text-center">
        Unfortunately, we could not retrieve the weather forecast for this
        location.
      </p>
      <p className="text-sm text-gray-400 mt-2 mb-6">
        Please double-check the spelling or try searching for a different city.
      </p>

      <button
        onClick={handleGoHome}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-4xl shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition duration-150 ease-in-out"
      >
        <Home className="w-4 h-4 mr-2 text-white" />
        Go Home
      </button>
    </Wrapper>
  );
}
