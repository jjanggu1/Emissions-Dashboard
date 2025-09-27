"use client";

import { fetchCompanies, fetchPosts } from "@/lib/api";
import TotalEmissions from "../components/TotalEmissions";

import { useEffect } from "react";
import {
  useBaseYearsStore,
  useCompanyStore,
  usePostsStore,
} from "@/store/store";

import { CompanyType } from "@/types";
import DashboardHeader from "@/components/DashboardHeader";
import MonthlyEmissions from "@/components/MonthlyEmissions";
import CountryEmissions from "@/components/CountryEmissions";
import YearlyEmission from "@/components/YearlyEmission";
import CarbonReport from "@/components/CarbonReport";

export default function Home() {
  const { setPosts } = usePostsStore();
  const { setCompanies } = useCompanyStore();
  const { setBaseYearsList } = useBaseYearsStore();

  // 데이터에서 기준연도 추출
  const extractYears = (companiesData: CompanyType[]) => {
    const years: string[] = [
      ...new Set(
        companiesData.flatMap((company: CompanyType) =>
          company.emissions.map((emission) => emission.yearMonth.split("-")[0])
        )
      ),
    ];
    setBaseYearsList(years);
    console.log(years);
  };

  useEffect(() => {
    Promise.all([fetchCompanies(), fetchPosts()]).then(([companies, posts]) => {
      setCompanies(companies);
      console.log(companies);
      setPosts(posts);
      extractYears(companies);
    });
  }, []);

  return (
    <div className="w-full h-full border-t border-gray-100 bg-gray-100">
      <div>
        <header className="bg-white px-4 pt-4">
          <h1 className="text-2xl font-bold">대시보드</h1>
          <DashboardHeader />
        </header>
        <main className="w-full md:flex gap-4 px-4 py-4">
          {/* 데이터 차트 */}
          <div className="w-full flex flex-col gap-4 flex-3">
            <div>
              <div className="block md:flex gap-4">
                <TotalEmissions />
                <CountryEmissions />
              </div>
            </div>
            <div className="mt-4 ">
              <div className="block md:flex gap-4">
                <MonthlyEmissions />
                <YearlyEmission />
              </div>
            </div>
          </div>
          <CarbonReport />
        </main>
      </div>
    </div>
  );
}
