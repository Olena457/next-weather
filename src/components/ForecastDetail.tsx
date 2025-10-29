import DetailsWeather, { DetailsWeatherProps } from "./DetailsWeather";
import IconWeather from "./IconWeather";
import Wrapper from "./Wrapper";
import { convertToCelsius } from "../utils/convertToCelsius";

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
    <Wrapper className="gap-4">
      <section>
        <div className="flex flex-col gap-1 items-center">
          <IconWeather iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        <div className="flex flex-col px-4">
          <span className="text-5xl">{convertToCelsius(temp)}°</span>

          <div className="text-xs space-x-1 whitespace-nowrap">
            <span>{convertToCelsius(feels_like)}°</span>
          </div>

          <div className="text-sm space-x-1 whitespace-nowrap">
            <span>Min: {convertToCelsius(temp_min)}°</span>
            <span>Max: {convertToCelsius(temp_max)}°</span>
          </div>

          {description && (
            <p className="capitalize font-semibold text-gray-700">
              {description}
            </p>
          )}
        </div>
      </section>

      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <DetailsWeather {...props} />
      </section>
    </Wrapper>
  );
}
