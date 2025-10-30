import Image from "next/image";
import { mergeClasses } from "../utils/merge";
import React from "react";

export default function IconWeather({
  iconName,
  className,
  ...restProps
}: React.HTMLProps<HTMLDivElement> & { iconName: string }) {
  const baseClasses = "relative h-20 w-20";

  return (
    <div
      title={iconName}
      {...restProps}
      className={mergeClasses(baseClasses, className)}
    >
      <Image
        width={100}
        height={100}
        alt="icon weather"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        loading="eager"
      />
    </div>
  );
}
