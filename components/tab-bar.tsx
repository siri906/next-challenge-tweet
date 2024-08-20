"use client";

import { HomeIcon as SolidHomeIcon, UserIcon as SolidUserIcon, MagnifyingGlassIcon as SolidMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { HomeIcon as OutlineHomeIcon, MagnifyingGlassIcon as OutlineMagnifyingGlassIcon, UserIcon as OutlineUserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto grid grid-cols-3 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? <SolidHomeIcon className="w-7 h-7" /> : <OutlineHomeIcon className="w-7 h-7" />}
        <span>홈</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        {pathname === "/search" ? <SolidMagnifyingGlassIcon className="w-7 h-7" /> : <OutlineMagnifyingGlassIcon className="w-7 h-7" />}
        <span>검색</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? <SolidUserIcon className="w-7 h-7" /> : <OutlineUserIcon className="w-7 h-7" />}
        <span>나의 트윗</span>
      </Link>
    </div>
  );
}
