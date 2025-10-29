import Image from "next/image";
import { mergeClasses } from "../utils/merge";

export default function IconWeather(props: React.HTMLProps<HTMLDivElement> & { iconName: string }) {
    return (
        <div title={props.iconName} {...props} className={mergeClasses("relative h-20 w-20")}>
            <Image
                width={100}
                height={100}
                alt="icon weather"
                className="absolute h-full w-full"
                src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
            />
        </div>

    );
    
}