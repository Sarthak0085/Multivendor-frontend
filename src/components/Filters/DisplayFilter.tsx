import { AiOutlineClose } from "react-icons/ai";

interface IDisplayFilter {
  data: string[];
  setSelected: any;
}

const DisplayFilter = ({ data, setSelected }: IDisplayFilter) => {
  return (
    <>
      {data.map((item: string, index: number) => (
        <li
          aria-label={`Clear ${item}`}
          className="gap-2 pl-2 border text-[16px] cursor-pointer font-[500] rounded-md p-1 border-black hover:bg-slate-800 hover:text-white items-center inline-flex"
          key={index}
          onClick={() =>
            setSelected((prev: string[]) =>
              prev.filter((c: string) => c !== item)
            )
          }
        >
          {item}{" "}
          <AiOutlineClose
            aria-label={`Clear ${item}`}
            title={`Clear ${item}`}
          />
        </li>
      ))}
    </>
  );
};

export default DisplayFilter;
