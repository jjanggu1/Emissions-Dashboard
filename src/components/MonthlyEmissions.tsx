"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useBaseYearsStore, useCompanyStore } from "@/store/store";

export default function MonthlyEmissions() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { baseYears } = useBaseYearsStore();
  const { companies } = useCompanyStore();

  // 월별 데이터 추출 함수
  const getMonthlyData = () => {
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    const datasets: any[] = [];

    // 유효한 회사들만 필터링
    const validCompanies = companies.filter((company) => company.name !== "");

    // 각 회사별로 데이터셋 생성
    validCompanies.forEach((company, index) => {
      const monthlyEmissions = months.map((_, monthIndex) => {
        const month = String(monthIndex + 1).padStart(2, "0");
        const yearMonth = `${baseYears}-${month}`;

        return company.emissions
          .filter((emission) => emission.yearMonth === yearMonth)
          .reduce((sum, emission) => sum + emission.emissions, 0);
      });

      const colors = [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#06B6D4",
        "#84CC16",
        "#F97316",
      ];

      const color = colors[index % colors.length];

      datasets.push({
        label: company.name,
        data: monthlyEmissions,
        borderColor: color,
        backgroundColor: color + "20",
        borderWidth: 3,
        fill: true,
        tension: 0.5,
        pointBackgroundColor: color,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
      });
    });

    return { labels: months, datasets };
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const chartData = getMonthlyData();

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 0,
        plugins: {
          title: {
            display: true,
            text: "배출량 (tCO2e)",
            color: "#374151",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "top" as const,
            align: "start" as const,
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 15,
              font: {
                size: 12,
                weight: "normal" as const,
              },
              color: "#374151",
              boxWidth: 8,
              boxHeight: 8,
            },
          },
          tooltip: {
            mode: "index" as const,
            intersect: false,
            backgroundColor: "rgba(17, 24, 39, 0.95)",
            titleColor: "#F9FAFB",
            bodyColor: "#F9FAFB",
            borderColor: "rgba(75, 85, 99, 0.2)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            titleFont: {
              size: 13,
              weight: "bold" as const,
            },
            bodyFont: {
              size: 12,
            },
            displayColors: true,
            callbacks: {
              label: function (context) {
                return `${
                  context.dataset.label
                }: ${context.parsed.y.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "월",
              font: {
                size: 13,
                weight: "bold" as const,
              },
              color: "#6B7280",
            },
            grid: {
              display: false,
            },
            ticks: {
              color: "#6B7280",
              font: {
                size: 11,
                weight: "normal" as const,
              },
            },
          },
          y: {
            display: true,
            beginAtZero: true,
            grid: {
              color: "rgba(107, 114, 128, 0.1)",
            },
            ticks: {
              color: "#6B7280",
              font: {
                size: 11,
                weight: "normal" as const,
              },
              callback: function (value) {
                return value.toLocaleString();
              },
            },
          },
        },
        interaction: {
          mode: "nearest" as const,
          axis: "x" as const,
          intersect: false,
        },
        elements: {
          line: {
            borderJoinStyle: "round" as const,
            borderCapStyle: "round" as const,
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
  }, [companies, baseYears]);

  return (
    <div className="w-full h-fit bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          월 별 총 배출량
        </h1>
        <p className="text-sm text-gray-600">
          기준연도: <span className="font-semibold">{baseYears}년</span>
        </p>
      </div>
      <div className="max-w-[400px] md:max-w-full  h-[450px] relative ">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
