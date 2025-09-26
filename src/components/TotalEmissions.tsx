"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useBaseYearsStore, useCompanyStore } from "@/store/store";

export default function TotalEmissions() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { baseYears } = useBaseYearsStore();
  const { companies } = useCompanyStore();

  const [totalEmissions, setTotalEmissions] = useState<number>(0);

  // 기준연도별 총 배출량 추출
  const extractEmissions = () => {
    const total = companies
      .map((company) =>
        company.emissions
          .filter((emission) => emission.yearMonth.split("-")[0] === baseYears)
          .reduce((acc, emission) => acc + emission.emissions, 0)
      )
      .reduce((acc, companySum) => acc + companySum, 0);

    setTotalEmissions(total);
  };

  // 기준연도 source별 총 배출량 추출
  const extractEmissionsBySource = (source: string) => {
    const total = companies
      .map((company) =>
        company.emissions
          .filter(
            (emission) =>
              emission.source === source &&
              emission.yearMonth.split("-")[0] === baseYears
          )
          .reduce((acc, emission) => acc + emission.emissions, 0)
      )
      .reduce((acc, companySum) => acc + companySum, 0);

    return total;
  };

  useEffect(() => {
    extractEmissions();
  }, [companies, baseYears]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: [""],
        datasets: [
          {
            label: "항목 A",
            data: [
              (extractEmissionsBySource("gasoline") / totalEmissions) * 100,
            ], // %
            backgroundColor: "#49BF52",
            borderSkipped: false,
            borderRadius: [
              { topLeft: 6, topRight: 0, bottomLeft: 6, bottomRight: 0 },
            ],
          },
          {
            label: "항목 B",
            data: [(extractEmissionsBySource("lpg") / totalEmissions) * 100], // %
            backgroundColor: "#4BC9E5",
          },
          {
            label: "항목 C",
            data: [(extractEmissionsBySource("diesel") / totalEmissions) * 100], // %
            backgroundColor: "#898EE7",
          },
          {
            label: "항목 D",
            data: [(extractEmissionsBySource("etc") / totalEmissions) * 100], // %
            backgroundColor: "#D4D4D4",
            borderSkipped: false,
            borderRadius: [
              { topLeft: 0, topRight: 6, bottomLeft: 0, bottomRight: 6 },
            ],
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false, // aspect ratio(가로:세로 비율)값 false
        resizeDelay: 0,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
            stacked: true,
            min: 0,
            max: 100,
          },
          y: {
            display: false,
            stacked: true,
          },
        },
        elements: {
          bar: {
            borderWidth: 0,
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
  }, [totalEmissions]);

  return (
    <div className="w-full h-fit bg-white p-6 border border-gray-100 rounded-md shadow-sm">
      <h1 className="text-lg font-bold">전체 배출량 현황</h1>
      <p className="font-bold text-3xl py-4">
        {totalEmissions}
        <span className="text-sm text-gray-300 font-normal"> tCO2e</span>
      </p>
      <div className="w-[380px] md:w-full h-[40px] mb-4">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="w-full h-full border border-gray-100 rounded-md px-8 py-2 font-semibold text-sm">
        <div className="flex items-center justify-between py-2 text-[#49BF52]">
          <span className="text-lg flex-2 text-black">gasoline</span>{" "}
          <span className="flex-1">{extractEmissionsBySource("gasoline")}</span>
          <span className="flex-0 p-2 bg-[#E7F9E8] rounded-lg">
            {(
              (extractEmissionsBySource("gasoline") / totalEmissions) *
              100
            ).toFixed(1)}
            %
          </span>
        </div>
        <div className="flex items-center justify-between py-2 text-[#4BC9E5]">
          <span className="text-lg flex-2 text-black">lpg</span>{" "}
          <span className="flex-1">{extractEmissionsBySource("lpg")}</span>{" "}
          <span className="flex-0 p-2 bg-[#E0F6FB] rounded-lg">
            {((extractEmissionsBySource("lpg") / totalEmissions) * 100).toFixed(
              1
            )}
            %
          </span>
        </div>
        <div className="flex items-center justify-between py-2 text-[#898EE7]">
          <span className="text-lg flex-2 text-black">diesel</span>{" "}
          <span className="flex-1">{extractEmissionsBySource("diesel")}</span>{" "}
          <span className="flex-0 p-2 bg-[#EBECFB] rounded-lg">
            {(
              (extractEmissionsBySource("diesel") / totalEmissions) *
              100
            ).toFixed(1)}
            %
          </span>
        </div>
        <div className="flex items-center justify-between py-2 text-[#ECECEC]">
          <span className="text-lg flex-2 text-black">etc</span>{" "}
          <span className="flex-1 text-[#BFBFBF]">
            {extractEmissionsBySource("etc")}
          </span>{" "}
          <span className="flex-0 p-2 bg-[#D4D4D4] text-white rounded-lg">
            {((extractEmissionsBySource("etc") / totalEmissions) * 100).toFixed(
              1
            )}
            %
          </span>
        </div>
      </div>
    </div>
  );
}
