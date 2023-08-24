import { filter } from "@/atoms/atoms";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const Search = () => {
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState(true);
  const setFilter = useSetRecoilState(filter);

  const search = () => {
    setFilter(query);
  };

  useEffect(() => {
    if (query) setDisabled(false);
    else setDisabled(true);
  }, [query]);

  return (
    <section className="w-full flex items-center justify-center flex-col md:flex-row gap-4 max-w-5xl">
      <input
        type="text"
        placeholder="Search by video ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && !disabled && search()}
        className="w-full md:w-5/6 h-12 py-2 px-5 bg-[#1a1a1a] border-2 border-regular outline-none rounded-lg text-white max-w-3xl"
      />

      <button
        onClick={search}
        className="text-black bg-white rounded-lg h-12 w-[70%] md:w-1/6 font-gt disabled:cursor-not-allowed disabled:bg-[#b3b3b3] font-semibold"
        disabled={disabled}
      >
        Search
      </button>
    </section>
  );
};

export default Search;
