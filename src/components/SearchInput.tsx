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
      className={`flex items-center  bg-white rounded-md  px-3 py-2  max-w-md w-full  ${props.className}`}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location.."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none  focus:border-gray-500 h-full"
      />
          <button className="px-4 py-[9px] bg-gray-500 text-white rounded-r-md focus:outline-none hover:bg-gray-400  h-full">
              <Search/>
      </button>
    </form>
  );
}
