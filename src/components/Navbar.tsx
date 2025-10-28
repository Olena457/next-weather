


"use client";

import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { placeAtom, loadingCityAtom } from "../app/atom";
import SearchInput from "./SearchInput";
import OptionBox from "./OptionBox";
import { MapPin, ThermometerSun, LocateFixed } from "lucide-react";



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
      } catch  {
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

    if (options.length === 0 && !searchCity) {
      setError("Location not found.");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(cityToSearch);
        setShowOptions(false);
        setCity(cityToSearch);
      }, 500);
    }
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

  return (
    <>
      <nav className="shadow-lg sticky top-0 left-0 z-40 bg-white border-b border-gray-100">
        <div className="h-20 w-full flex justify-between items-center max-w-7xl px-4 mx-auto">
          <p className="flex items-center justify-center gap-2">
            <h2 className="text-gray-700 text-3xl font-bold tracking-tight">
              WEATHER
            </h2>
            <ThermometerSun className="w-7 h-7 text-yellow-500" />
          </p>

          <section className="flex gap-4 items-center">
            <button
              title="Your current location"
              onClick={handleCurrentLocation}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors shadow-md active:scale-95"
            >
              <LocateFixed className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5 text-gray-500" />
              <p className="text-slate-900/80 text-lg font-medium hidden sm:block">
                {location}
              </p>
              <p className="text-slate-900/80 text-sm font-medium sm:hidden">
                {location?.split(",")[0]}
              </p>
            </div>

            <div className="relative hidden md:flex">
              <SearchInput
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              ></SearchInput>

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

      <section className="flex justify-center w-full px-4 py-3 md:hidden bg-white shadow-md">
        <div className="relative w-full max-w-sm">
          <SearchInput
            value={city}
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
    </>
  );
}
