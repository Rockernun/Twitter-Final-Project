"use client";

import { validateSearchKeyword } from "@/app/(tabs)/actions";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function SearchBar() {
  const [state, action] = useFormState(validateSearchKeyword, null);
  return (
    <header className="bg-blue-200 text-black py-4 px-5 flex items-center justify-between">
      <h1 className="font-bold">
        <Link href="/" className="hover:text-black">
          Twitter
        </Link>
      </h1>
      <div>
        <form action={action} className="flex gap-1 relative">
          <button className="absolute top-1 left-1">
            <MagnifyingGlassIcon className="size-5" />
          </button>
          <input
            name="keyword"
            type="text"
            placeholder="찾고 계시는 게시물이 있나요?"
            className="pl-8 text-sm py-1 bg-transparent border-b-[1px] border-b-neutral-100
          outline-none placeholder:text-neutral-700 focus:outline-offset-4 focus:outline-2
          focus:outline-blue-800 focus:placeholder:text-black"
          />
          {state?.fieldErrors.keyword && (
            <p className="text-red-500 text-xs">{state?.fieldErrors.keyword}</p>
          )}
        </form>
      </div>
    </header>
  );
}
