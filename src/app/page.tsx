"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { placeAtom, loadingCityAtom } from "../app/atom";
import axios, { AxiosError } from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import convertSpeedWind from "../utils/convertSpeedWind";
import convertToCelsius from "../utils/convertToCelsius";
import metersConvert from "../utils/metersConvert";
import dayOrNightIcon from "../utils/dayOrNightIcon";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";
import Wrapper from "../components/Wrapper";
import IconWeather from "../components/IconWeather";
import DetailsWeather from "../components/DetailsWeather";
import ForecastDetail from "../components/ForecastDetail";
import Skeleton from "../components/Skeleton";

interface DetailsWeather {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: DetailsWeather[];
  city?: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const [place] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  type QueryError = Error;

  const { isLoading, error, data, refetch } = useQuery<WeatherData, QueryError>(
    {
      queryKey: ["repoData", place],
      queryFn: async () => {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
        );
        return data;
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const uniqueDates = [
    ...new Set(
      data?.list?.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      ) ?? []
    ),
  ];

  const firstDataForEachDate = uniqueDates
    .map((date) => {
      const dayEntries =
        data?.list?.filter(
          (entry) =>
            new Date(entry.dt * 1000).toISOString().split("T")[0] === date
        ) ?? [];

      if (dayEntries.length === 0) return null;

      const representativeEntry =
        dayEntries.find((entry) => new Date(entry.dt * 1000).getHours() >= 6) ||
        dayEntries[0];

      const dailyTemps = dayEntries.map((entry) => entry.main.temp);
      const minTemp = Math.min(...dailyTemps);
      const maxTemp = Math.max(...dailyTemps);

      return {
        ...representativeEntry,
        main: {
          ...representativeEntry.main,
          temp_min: minTemp,
          temp_max: maxTemp,
        },
      } as DetailsWeather;
    })
    .filter((d): d is DetailsWeather => !!d);

  const firstData = firstDataForEachDate[0];

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce text-white text-3xl font-bold tracking-tight">
          Weather Loading...
        </p>
      </div>
    );

  if (error) {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status;

    if (statusCode === 404) {
      return (
        <div className="flex items-center min-h-screen justify-center">
      <NotFound />
        </div>
      );
    }

    return (
      <div className="flex items-center min-h-screen justify-center">
      <p className="text-red-400">Error: {error.message}</p>
      </div>
    );
  }

  if (data?.list?.length === 0) {
    return (
      <div className="flex items-center min-h-screen justify-center">
    <NotFound />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-4 min-h-screen bg-[url('/images/background.svg')] bg-repeat 
 bg-contain 
bg-center "
    >
      <Navbar location={data?.city?.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-2 w-full pb-10 pt-4">
        {loadingCity ? (
          <Skeleton />
        ) : (
          <>
            <section>
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                  <p className="text-lg">
                    ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")} )
                  </p>
                </h2>

                <Wrapper className="gap-10 px-6 items-center  border-none">
                  <div className="flex flex-col gap-5 sm:gap-7 px-1 items-center justify-center  sm:px-4 pb-3">
                    <span className="text-3xl sm:text-5xl">
                      {convertToCelsius(firstData?.main.temp ?? 296.36)}°
                    </span>
                    <p className="text-2xs space-x-1 whitespace-nowrap">
                      <span>Feels like &nbsp;</span>
                      {convertToCelsius(firstData?.main.feels_like ?? 0)}°
                    </p>
                    <div className="text-sm space-x-1 whitespace-nowrap">
                      <span>
                        {convertToCelsius(firstData?.main.temp_min ?? 0)}°↓
                      </span>
                      <span>
                        {convertToCelsius(firstData?.main.temp_max ?? 0)}°↑
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list?.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {format(parseISO(d.dt_txt), "h:mm a")}
                        </p>
                        <IconWeather
                          iconName={dayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                        />
                        <p>{convertToCelsius(d?.main.temp ?? 0)}°</p>
                      </div>
                    ))}
                  </div>
                </Wrapper>
              </div>
            </section>
            {/* __________________ */}

            <div className="flex w-full min-w-0">
              <Wrapper className="flex w-fit px-4 sm:px-8 py-4 mr-2 justify-center flex-col  items-center ">
                <p className="capitalize text-center">
                  {firstData?.weather[0].description}
                </p>
                <IconWeather
                  iconName={dayOrNightIcon(
                    firstData?.weather[0].icon ?? "",
                    firstData?.dt_txt ?? ""
                  )}
                />
              </Wrapper>
              <Wrapper className="flex w-full overflow-x-auto  py-4  ">
                <div className="min-w-max flex px-4  sm:px-8 gap-x-9">
                  <DetailsWeather
                    visibility={metersConvert(firstData?.visibility ?? 10000)}
                    airPressure={`${firstData?.main.pressure} hPa`}
                    humidity={`${firstData?.main.humidity}%`}
                    sunrise={format(
                      fromUnixTime(data?.city?.sunrise ?? 1702949452),
                      "H:mm"
                    )}
                    sunset={format(
                      fromUnixTime(data?.city?.sunset ?? 1702517657),
                      "H:mm"
                    )}
                    windSpeed={convertSpeedWind(firstData?.wind.speed ?? 1.64)}
                  />
                </div>
              </Wrapper>
            </div>

            {/* ___________ */}

            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Forecast: 7 days</p>
              {firstDataForEachDate.map((d, i) => (
                <ForecastDetail
                  key={i}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={dayOrNightIcon(
                    d?.weather[0].icon ?? "01d",
                    d?.dt_txt ?? ""
                  )}
                  date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
                  day={d ? format(parseISO(d.dt_txt), "EEEE") : "EEEE"}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  airPressure={`${d?.main.pressure} hPa`}
                  humidity={`${d?.main.humidity}%`}
                  sunrise={format(
                    fromUnixTime(data?.city?.sunrise ?? 1702517657),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city?.sunset ?? 1702517657),
                    "H:mm"
                  )}
                  visibility={`${metersConvert(d?.visibility ?? 10000)}`}
                  windSpeed={`${convertSpeedWind(d?.wind.speed ?? 1.64)}`}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
