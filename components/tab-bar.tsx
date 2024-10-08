"use client";

import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as SolidHomeIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar({ username }: { username: string }) {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 bg-neutral-100 text-neutral-900  border-neutal-600 w-full max-w-screen-sm">
      <ul className=" flex justify-between font-semibold *:pt-4 *:pb-3 *:px-6 *:transition">
        <li className="hover:bg-blue-500 hover:text-white">
          <Link href="/" className="flex flex-col items-center justify-center">
            {pathname === "/" ? (
              <SolidHomeIcon className="size-7" />
            ) : (
              <HomeIcon className="size-7" />
            )}
            <span className="text-sm">홈</span>
          </Link>
        </li>
        <li className="hover:bg-blue-500 hover:text-white">
          <Link
            href={`/users/${username}`}
            className="flex flex-col items-center"
          >
            {pathname === `/users/${username}` ? (
              <SolidUserIcon className="size-7" />
            ) : (
              <UserIcon className="size-7" />
            )}
            <span className="text-sm">프로필</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
