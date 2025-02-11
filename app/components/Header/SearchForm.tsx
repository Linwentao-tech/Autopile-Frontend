"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const searchSchema = z.object({
  search: z.string().min(1, "Please enter a search term"),
});

type SearchFormData = z.infer<typeof searchSchema>;

function SearchForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (data: SearchFormData) => {
    try {
      // Navigate to search results page with query
      router.push(`/search?productName=${encodeURIComponent(data.search)}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <>
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px transparent !important;
        }
      `}</style>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center border border-white/50 rounded-md p-2 transition-colors duration-200 ease-in-out hover:border-white/80 focus-within:border-white group"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center"
          aria-label="Search"
        >
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
        </button>
        <input
          type="search"
          placeholder="Search..."
          {...register("search")}
          className="bg-transparent w-full focus:outline-none text-white placeholder-white/50 disabled:opacity-50"
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}

export default SearchForm;
