import { Search } from "lucide-react";

type SearchBoxProps = {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function SearchInput(props: SearchBoxProps) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={`flex items-center glass-input-card  rounded-md  px-3 py-2  max-w-md w-full  ${props.className}`}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location.."
        className="px-4 py-2 w-[230px] border border-blue-100-300 rounded-l-md focus:outline-none  focus:border-blue-300 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-300 text-blue-100 rounded-r-md focus:outline-none hover:bg-blue-200  h-full">
        <Search className="text-gray-500"/>
      </button>
    </form>
  );
}
