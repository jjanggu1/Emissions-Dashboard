"use client";

import { MdMenu } from "react-icons/md";
import { useSidebarStore } from "../store/sidebarStore";

export default function Header() {
  const { openSidebar } = useSidebarStore();
  return (
    <header className="bg-white text-[#32373f] py-4 px-6 shadow-sm">
      <div className="mx-auto flex items-center justify-between">
        <div className="pl-4">
          <h1 className="text-xl font-bold">탄소관리 대시보드</h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={openSidebar}
            className="text-[#32373f] hover:text-gray-600 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <MdMenu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
