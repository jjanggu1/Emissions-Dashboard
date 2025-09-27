"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useBaseYearsStore, useCompanyStore } from "@/store/store";
import CutEmissions from "./CutEmissions";

export default function YearlyEmission() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { baseYearsList } = useBaseYearsStore();
  const { companies } = useCompanyStore();

  const [yearlyEmissions, setYearlyEmissions] = useState<number[]>([]);

  const extractYearlyEmissions = () => {
    const totals = baseYearsList.map((year: string) => {
      const sum = companies
        .flatMap((c) => c.emissions) // 회사별 emissions 합치기
        .filter((e) => Number(e.yearMonth.split("-")[0]) === Number(year))
        .reduce((acc, cur) => acc + cur.emissions, 0);

      return { year, totalEmissions: sum };
    });
    setYearlyEmissions(totals.map((total) => total.totalEmissions));
  };

  const makeGoalEmission = () => {
    const goalEmission = yearlyEmissions.map((emission) => emission * 0.52);
    const extraValues = [26000, 17000].map((v) => v * 0.52);
    return [...goalEmission, ...extraValues];
  };
  console.log(makeGoalEmission());

  useEffect(() => {
    extractYearlyEmissions();
  }, [baseYearsList, companies]);
  console.log(yearlyEmissions);

  useEffect(() => {
    if (!canvasRef.current || !baseYearsList || !companies) return;

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: [...baseYearsList, "2026", "2027"],
        datasets: [
          {
            label: "현재 값",
            data: yearlyEmissions,
            borderColor: "#16B32F",
            borderWidth: 2,
            fill: false,
            pointRadius: 3,
            pointBackgroundColor: "#16B32F",
          },
          {
            label: "목표 값",
            data: makeGoalEmission(),
            borderColor: "#EF4444",
            borderWidth: 2,
            fill: false,
            borderDash: [4, 4],
            pointRadius: 3,
            pointBackgroundColor: "#EF4444",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            display: false,
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
  }, [canvasRef.current, baseYearsList, companies, yearlyEmissions]);
  return (
    <div className="w-full h-fit max-h-[430px] bg-white p-6 mt-4 md:mt-0 border border-gray-100 rounded-md shadow-sm">
      <h1 className="text-lg font-bold">감축 목표</h1>
      <div className="w-[380px] md:w-full h-[180px] mb-4">
        <canvas ref={canvasRef}></canvas>
      </div>
      <CutEmissions
        thisYear={yearlyEmissions[yearlyEmissions.length - 1]}
        goalEmission={Math.floor(
          makeGoalEmission()[makeGoalEmission().length - 3]
        )}
      />
    </div>
  );
}
