export interface SingleDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

export default function SingleDetail(props: SingleDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs sm:text-sm font-bold text-white">
      <p className="text-xs text-blue-100 sm:text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
        {props.information}
      </p>
      <div className="text-3xl text-white">{props.icon}</div>
      <p className="text-xs text-blue-100 sm:text-sm font-semibold whitespace-nowrap">
        {props.value}
      </p>
    </div>
  );
}
