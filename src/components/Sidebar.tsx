"use client";

import { useState } from "react";
import { MdHome, MdClose, MdTimeline } from "react-icons/md";
import { useSidebarStore } from "../store/store";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: <MdHome className="w-6 h-6" />,
    href: "/",
  },
  {
    id: "reports",
    label: "탄소 리포트",
    icon: <MdTimeline className="w-6 h-6" />,
    href: "/reports",
  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { isOpen, closeSidebar } = useSidebarStore();

  return (
    <>
      {/* 모바일 전체화면 사이드바 */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full h-full bg-white">
          {/* 헤더 영역 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">메뉴</h2>
            <button
              onClick={closeSidebar}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          {/* 메뉴 영역 */}
          <div className="p-6">
            <nav className="space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.id);
                    closeSidebar();
                  }}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-lg font-medium transition-colors ${
                    activeItem === item.id
                      ? "bg-sky-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* 데스크톱 사이드바 */}
      <aside className="hidden md:block w-52 bg-white h-screen border-r border-t border-gray-100">
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center space-x-3 px-3 py-2 font-medium transition-colors ${
                  activeItem === item.id
                    ? "text-sky-500 font-bold"
                    : "text-gray-700 hover:text-sky-500"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
