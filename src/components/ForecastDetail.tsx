import DetailsWeather, { DetailsWeatherProps } from "./DetailsWeather";
import IconWeather from "./IconWeather";
import Wrapper from "./Wrapper";
import  convertToCelsius  from "../utils/convertToCelsius";

export interface ForecastProps extends DetailsWeatherProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description?: string;
}

export default function ForecastDetail(props: ForecastProps) {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;

  return (
    <>
      <div className="flex row gap-1 pl-4">
        <p className="text-lg">{day}</p>
        <p className="text-lg">{date}</p>
      </div>

      <Wrapper className="gap-4">
        <section className=" flex gap-2 sm:gap-4  items-center  pr-1  sm:px-4 ">
          <div className="flex flex-col gap-1  justify-center  pb-4">
            {description && (
              <p className="capitalize font-semibold text-white text-center">
                {description}
              </p>
            )}
            <IconWeather iconName={weatherIcon} />
          </div>

          <div className="flex flex-col gap-5 sm:gap-7 px-1 items-center justify-center  sm:px-4 pb-3">
            <span className="text-3xl sm:text-5xl">
              {convertToCelsius(temp)}°
            </span>

            <div className="text-2xs space-x-1 whitespace-nowrap">
              <span className=" text-blue-100">
                feels like &nbsp;
                {convertToCelsius(feels_like)}°
              </span>
            </div>

            <div className="text-sm space-x-1 whitespace-nowrap">
              <span>{convertToCelsius(temp_min)}↓°</span>&nbsp;
              <span>{convertToCelsius(temp_max)}↑°</span>
            </div>
          </div>
        </section>

        <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
          <DetailsWeather {...props} />
        </section>
      </Wrapper>
    </>
  );
}
