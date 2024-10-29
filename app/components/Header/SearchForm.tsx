function SearchForm() {
  return (
    <form className="flex items-center border border-white/50 rounded-md p-2 transition-colors  duration-200 ease-in-out hover:border-white/80 focus-within:border-white group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 mr-2 text-white/50 transition-colors duration-200 ease-in-out group-hover:text-white/80 group-focus-within:text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="search"
        placeholder="Search..."
        id="search"
        name="search"
        className="bg-transparent w-full focus:outline-none text-white placeholder-white/50"
      />
    </form>
  );
}

export default SearchForm;
