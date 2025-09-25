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

export default function Home() {
  const { setPosts } = usePostsStore();
  const { setCompanies } = useCompanyStore();
  const { setBaseYears } = useBaseYearsStore();

  // 데이터에서 기준연도 추출
  const extractYears = (companiesData: CompanyType[]) => {
    const years: string[] = [
      ...new Set(
        companiesData.flatMap((company: CompanyType) =>
          company.emissions.map((emission) => emission.yearMonth.split("-")[0])
        )
      ),
    ];
    setBaseYears(years);
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
    <div className="w-full min-h-screen border-t border-gray-100 bg-gray-100">
      <div>
        <header className="bg-white px-4 pt-4">
          <h1 className="text-2xl font-bold">대시보드</h1>
          <DashboardHeader />
        </header>
        <main className="px-4 py-4">
          {/* 데이터 차트 */}
          {/* 총 emissions 세로 bar (source별 색상으로 구분) */}
          <div className="">
            <TotalEmissions />
          </div>
        </main>
      </div>
      {/* 월 별 총 emissions 배출량 => Line Chart */}
      {/* 국가 별 총 emissions 배출량 => Doughnut Chart */}
      {/* 오른쪽 영역에 report timeline(최신순 post) */}
    </div>
  );
}
