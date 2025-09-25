"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TotalEmissions() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: [""],
        datasets: [
          {
            label: "항목 A",
            data: [40], // %
            backgroundColor: "#49BF52",
            borderSkipped: false,
            borderRadius: [
              { topLeft: 6, topRight: 0, bottomLeft: 6, bottomRight: 0 },
            ],
          },
          {
            label: "항목 B",
            data: [35], // %
            backgroundColor: "#4BC9E5",
          },
          {
            label: "항목 C",
            data: [25], // %
            backgroundColor: "#898EE7",
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
  }, []);

  return (
    <div className="w-full h-full md:w-1/2 lg:w-1/3 bg-white p-6 border border-gray-100 rounded-md shadow-sm">
      <h1 className="text-lg font-bold">전체 배출량 현황</h1>
      <p className="font-bold text-3xl py-4">
        31,234.49
        <span className="text-sm text-gray-300 font-normal"> tCO2e</span>
      </p>
      <div className="w-[380px] md:w-full h-[40px] mb-4">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="w-full h-full border border-gray-100 rounded-md px-8 py-2 font-semibold text-sm">
        <div className="flex items-center justify-between py-2 text-[#49BF52]">
          <span className="text-lg flex-2 text-black">gasoline</span>{" "}
          <span className="flex-1">34,024.84</span>
          <span className="flex-0 p-2 bg-[#E7F9E8] rounded-lg">50.0%</span>
        </div>
        <div className="flex items-center justify-between py-2 text-[#4BC9E5]">
          <span className="text-lg flex-2 text-black">lpg</span>{" "}
          <span className="flex-1">34,024.84</span>{" "}
          <span className="flex-0 p-2 bg-[#E0F6FB] rounded-lg">50.0%</span>
        </div>
        <div className="flex items-center justify-between py-2 text-[#898EE7]">
          <span className="text-lg flex-2 text-black">diesel</span>{" "}
          <span className="flex-1">34,024.84</span>{" "}
          <span className="flex-0 p-2 bg-[#EBECFB] rounded-lg">50.0%</span>
        </div>
      </div>
    </div>
  );
}
