export interface SingleDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

export default function SingleDetail(props: SingleDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs sm:text-sm font-bold text-black/80">
      <p className="text-[10px] sm:text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">
        {props.information}
      </p>
      <div className="text-3xl">{props.icon}</div>
      <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">
        {props.value}
      </p>
    </div>
  );
}
