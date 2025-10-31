import { Search,Delete } from "lucide-react";

type SearchBoxProps = {
  className?: string;
  onClear: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function SearchInput(props: SearchBoxProps) {
  const isValuePresent = props.value.length > 0;
  return (
    <form
      onSubmit={props.onSubmit}
      className={`flex items-center glass-input-card  rounded-4xl  px-3 py-2  max-w-md w-full  ${props.className}`}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location.."
        className={`px-4 py-2 w-[230px] border border-blue-100-300 rounded-l-4xl text-white focus:outline-none focus:border-blue-300 h-full ${
          isValuePresent ? "pr-8" : ""
        }`}
      />
      {isValuePresent && (
        <button
          type="button"
          onClick={props.onClear}
          className="absolute right-12 top-1/2 -translate-y-1/2 z-10 p-1 cursor-pointer text-white hover:text-gray-600 transition-colors"
          title="Clear search"
        >
          <Delete className="w-6 h-6 text-white" />
        </button>
      )}
      <button className="px-4 py-[9px] bg-blue-300 text-blue-100 rounded-r-4xl cursor-pointer focus:outline-none hover:bg-blue-200 transition-all duration-150 active:scale-95 h-full">
        <Search className="text-gray-500" />
      </button>
    </form>
  );
}
