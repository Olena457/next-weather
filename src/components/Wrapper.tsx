import { mergeClasses } from "../utils/merge";

export default function Wrapper(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div  {...props} className={mergeClasses("w-full bg-white border rounded-[l flex py-4 shadow-sm", props.className)} />
    );
}