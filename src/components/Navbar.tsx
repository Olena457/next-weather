


"use client";

import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { placeAtom, loadingCityAtom } from "../app/atom";
import SearchInput from "./SearchInput";
import OptionBox from "./OptionBox";
import { MapPin, Sun, LocateFixed } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

type Props = {
  location?: string;
};

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const [, setPlace] = useAtom(placeAtom);
  const [, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
        const newOptions = response.data.list.map(
          (item: { name: string }) => item.name
        );
        setOptions(newOptions);
        setError("");
        setShowOptions(true);
      } catch {
        setOptions([]);
        setShowOptions(false);
        setError("Error fetching suggestions.");
      }
    } else {
      setOptions([]);
      setShowOptions(false);
      setError("");
    }
  }

  function handleOptionClick(value: string) {
    setCity(value);
    setShowOptions(false);
    handleSubmitSearch(null, value);
  }

  function handleSubmitSearch(
    e: React.FormEvent<HTMLFormElement> | null,
    searchCity?: string
  ) {
    e?.preventDefault();
    const cityToSearch = searchCity || city;

    if (cityToSearch.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    setLoadingCity(true);
    setError("");

    setTimeout(() => {
      setLoadingCity(false);
      setPlace(cityToSearch);
      setShowOptions(false);
      setCity(cityToSearch);
    }, 500);
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      setLoadingCity(true);
      setError("");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );
            setTimeout(() => {
              setLoadingCity(false);
              setPlace(response.data.name);
              setCity(response.data.name);
            }, 500);
          } catch (error) {
            setLoadingCity(false);
            setError("Failed to fetch weather for current location.");
            console.error("Geolocation error: ", error);
          }
        },
        (error: GeolocationPositionError) => {
          setLoadingCity(false);
          const errorMessage =
            error.message || "Geolocation permission required or failed.";
          setError(errorMessage);
          console.error("Geolocation denied or failed: ", error);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }

  function handleClearInput() {
    setCity("");
    setOptions([]);
    setShowOptions(false);
    setError("");
  }

  return (
    <>
      <nav className="sticky top-0 left-0 z-40 mx-2 mt-2 rounded-3xl glass-nav-card">
        <div className="h-20 w-full flex justify-between items-center max-w-7xl px-4 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-white my-title text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              WEATHER
            </h2>
            <Sun className="w-7 h-7 text-[#fda326]" />
          </div>

          <section className="flex gap-4 items-center">
            <button
              title="Your current location"
              onClick={handleCurrentLocation}
              className="p-2 cursor-pointer rounded-full bg-blue-200 text-gray-500 
             hover:bg-[#1cb5e0] 
             shadow-md 
             active:scale-95 
             transition-all duration-150 ease-in-out
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            >
              <LocateFixed className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5 cursor-pointer text-blue-200 hover:text-[#1cb5e0] transition-colors" />
              <p className="text-white text-lg hover:text-[#1cb5e0] transition-colors font-medium hidden sm:block truncate whitespace-nowrap max-w-20">
                {location}
              </p>
              <p className="text-blue-100 cursor-pointer hover:text-[#1cb5e0] text-sm font-medium transition-colors sm:hidden">
                {location?.split(",")[0]}
              </p>
            </div>

            <div className="relative hidden glass-input-card-second rounded-4xl md:flex">
              <SearchInput
                value={city}
                onSubmit={handleSubmitSearch}
                onClear={handleClearInput}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <OptionBox
                showOptions={showOptions}
                options={options}
                handleOptionClick={handleOptionClick}
                error={error}
              />
            </div>
          </section>
        </div>
      </nav>
      <div className="mx-2">
        <section className="relative z-30 flex justify-center w-full px-4 py-3 md:hidden glass-input-card-second rounded-3xl">
          <div className="relative z-250 md:z-20 lg:z-10">
            <SearchInput
              value={city}
              onClear={handleClearInput}
              onSubmit={handleSubmitSearch}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <OptionBox
              showOptions={showOptions}
              options={options}
              handleOptionClick={handleOptionClick}
              error={error}
            />
          </div>
        </section>
      </div>
    </>
  );
}
