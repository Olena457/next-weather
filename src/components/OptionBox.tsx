
type Props = {
  showOptions: boolean;
  options: string[];
  handleOptionClick: (item: string) => void;
  error: string;
};

export default function OptionBox({
  showOptions,
  options,
  handleOptionClick,
  error,
}: Props) {
  return (
    <>
      {((showOptions && options.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute z-60 border top-11 left-0 text-gray-500 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && options.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {options.map((item, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
