
import SingleDetail from "./SingleDetail";
import { Eye, Sunrise, Sunset, Wind, CircleGauge, Droplet } from "lucide-react";

export interface DetailsWeatherProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function DetailsWeather(props: DetailsWeatherProps) {
  const {
    visibility = "20km",
    humidity = "60%",
    windSpeed = "10 km/h",
    airPressure = "1013 hPa",
    sunrise = "6:00 AM",
    sunset = "6:00 PM",
  } = props;

  return (
    <>
      <SingleDetail
        icon={<Eye />}
        information="Visibility"
        value={visibility}
      />
      <SingleDetail
        icon={<Droplet />}
        information="Humidity"
        value={humidity}
      />
      <SingleDetail
        icon={<Wind />}
        information="Wind"
        value={windSpeed}
      />
      <SingleDetail
        icon={<CircleGauge />}
        information="Pressure"
        value={airPressure}
      />
      <SingleDetail icon={<Sunrise />} information="Sunrise" value={sunrise} />
      <SingleDetail icon={<Sunset />} information="Sunset" value={sunset} />
    </>
  );
}
