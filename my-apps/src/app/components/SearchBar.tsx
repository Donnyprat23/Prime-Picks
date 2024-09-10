"use client";

interface SearchBarProps {
  handleSearch: (keyword: string) => void;
  search: string;
}
export default function SearchBar({ handleSearch, search }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };
  return (
    <div className="bg-white flex px-1 py-1 rounded-full border border-[#903167] overflow-hidden max-w-md mx-auto font-[sans-serif] mb-12">
      <input
        type="text"
        placeholder="Search Something..."
        className="w-full outline-none bg-white pl-4 text-sm"
        onChange={handleChange}
        value={search}
      />
      <button
        type="button"
        className="bg-white hover:bg-[#984072] transition-all text- text-sm rounded-full px-5 py-2.5 font-extrabold"
      >
        Search
      </button>
    </div>
  );
}
