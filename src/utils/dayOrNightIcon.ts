export  default function dayOrNightIcon(iconName: string, dateTimeString: string): string {
  if (!dateTimeString) return iconName + "d";

  const baseIcon = iconName.replace(/d|n$/, "");
  const hours = new Date(dateTimeString).getHours();
  const isDayTime = hours >= 6 && hours < 18;

  return isDayTime ? `${baseIcon}d` : `${baseIcon}n`;
}
