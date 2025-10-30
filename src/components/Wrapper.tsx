import { mergeClasses } from "../utils/merge";

export default function Wrapper(props: React.HTMLProps<HTMLDivElement>) {
    return (
      <div
        {...props}
        className={mergeClasses(
          "w-full bg-blue-200 border rounded-4xl flex py-4 px-2 sm:px-4  sm:py-8 shadow-sm",
          props.className
        )}
      />
    );
}