"use client";

import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useBaseYearsStore } from "@/store/store";

export default function DashboardHeader() {
  const { baseYears, setBaseYears } = useBaseYearsStore();

  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [isBaseYearSelectBoxOpen, setIsBaseYearSelectBoxOpen] =
    useState<boolean>(false);

  const [companyType, setCompanyType] = useState<string>("기업전체");

  return (
    <div className="flex items-center justify-between py-2 ">
      {/* 기준연도 Select Box */}
      <div
        className="flex relative text-sm"
        onClick={() => setIsBaseYearSelectBoxOpen(!isBaseYearSelectBoxOpen)}
      >
        <span className="cursor-pointer flex items-center">
          기준연도:{" "}
          <span className="flex items-center font-semibold ml-1 border border-gray-300 rounded-md p-1 hover:bg-gray-100">
            {selectedYear}년
            {isBaseYearSelectBoxOpen ? (
              <MdKeyboardArrowUp className="w-4 h-4" />
            ) : (
              <MdKeyboardArrowDown className="w-4 h-4" />
            )}
          </span>
        </span>
        {isBaseYearSelectBoxOpen && (
          <div className="absolute top-[34px] left-[54px] w-[80px] h-fit p-2 bg-white border border-gray-100 rounded-md shadow-sm flex flex-col gap-2">
            {baseYears.map((year) => (
              <div
                className="cursor-pointer hover:bg-gray-100 p-1 rounded-sm"
                key={year}
                onClick={() => setSelectedYear(year)}
              >
                {year}년
              </div>
            ))}
          </div>
        )}
      </div>
      {/* 기업전체 or 사업장별 선택 button */}
      <div className="flex gap-1 shadow-inner border border-gray-100 bg-gray-100 rounded-md p-1 text-sm font-semibold">
        <button
          className={`${
            companyType === "기업전체" ? "bg-white shadow-sm" : "bg-gray-100"
          } rounded-md py-1 px-2 cursor-pointer`}
          onClick={() => setCompanyType("기업전체")}
        >
          기업전체
        </button>
        <button
          className={`${
            companyType === "사업장별" ? "bg-white shadow-sm" : "bg-gray-100"
          } rounded-md py-1 px-2 cursor-pointer`}
          onClick={() => setCompanyType("사업장별")}
        >
          사업장별
        </button>
      </div>
    </div>
  );
}
