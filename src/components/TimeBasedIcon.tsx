import { Sun, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TimeBasedIconProps {
  dateTimeString: string;
  className?: string; 
}

export default function TimeBasedIcon({
  dateTimeString,
  className,
}: TimeBasedIconProps) {
  const hours = new Date(dateTimeString).getHours();
  const isDayTime = hours >= 6 && hours < 18;
  const Icon: LucideIcon = isDayTime ? Sun : Moon;

  return <Icon className={className ?? "w-6 h-6 text-yellow-500"} />;
}
