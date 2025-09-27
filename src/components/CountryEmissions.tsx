"use client";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { useCompanyStore, useBaseYearsStore } from "@/store/store";

export default function CountryEmissions() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { companies } = useCompanyStore();
  const { baseYears } = useBaseYearsStore();

  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [countryEmissions, setCountryEmissions] = useState<number[]>([]);

  // 나라 이름 추출함수
  const getCountryNames = () => {
    return companies.map((company) => company.country);
  };

  // 나라별 총 배출량 추출함수
  const getCountryEmissions = () => {
    return companies
      .map((company) =>
        company.emissions.filter(
          (emission) => emission.yearMonth.split("-")[0] === baseYears
        )
      )
      .map((company) =>
        company.reduce((acc, emission) => acc + emission.emissions, 0)
      );
  };

  const getCountryNamesWithKorean = (country: string | string[]) => {
    const map: Record<string, string> = {
      US: "미국",
      DE: "독일",
      FR: "프랑스",
      KR: "한국",
      JP: "일본",
    };

    if (Array.isArray(country)) {
      // 배열이면 각 원소를 변환
      return country.map((c) => map[c] ?? c);
    }

    return map[country] ?? country;
  };

  useEffect(() => {
    setCountryNames(getCountryNames());
    setCountryEmissions(getCountryEmissions());
  }, [companies, baseYears]);

  useEffect(() => {
    if (
      !canvasRef.current ||
      countryNames.length === 0 ||
      countryEmissions.length === 0
    )
      return;

    const chart = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: getCountryNamesWithKorean(countryNames) as string[],
        datasets: [
          {
            data: countryEmissions,
            backgroundColor: [
              "#34D399",
              "#60A5FA",
              "#FBBF24",
              "#D1D5DB",
              "#6B7280",
            ],
            hoverOffset: 6,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "left" as const,
            align: "end" as const,
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              font: {
                size: 18,
                weight: "normal" as const,
              },
              color: "#374151",
              boxWidth: 8,
              boxHeight: 8,
              padding: 8,
            },
          },
        },
      },
    });
    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.destroy();
    };
  }, [countryNames, countryEmissions]);

  return (
    <div className="w-full h-fit bg-white p-6 border border-gray-100 rounded-md shadow-sm mt-4 md:mt-0">
      <h1 className="text-lg font-bold">국가 별 배출량</h1>
      <div className="w-[380px] md:w-full h-[180px] mb-4">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
