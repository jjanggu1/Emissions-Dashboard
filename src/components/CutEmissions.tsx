"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CutEmissions({
  thisYear,
  goalEmission,
}: {
  thisYear: number;
  goalEmission: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const CutEmissionPercentage = ((goalEmission / thisYear) * 100).toFixed(1);

  useEffect(() => {
    if (!canvasRef.current) return;
    console.log(thisYear, goalEmission);

    const chart = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["현재", "목표"],
        datasets: [
          {
            data: [thisYear, goalEmission],
            backgroundColor: ["#4CAF50", "#E0E0E0"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [thisYear, goalEmission]);
  console.log(thisYear, goalEmission);

  return (
    <div className="flex justify-between gap-4 border-2 border-[#CFEDD0] rounded-md p-4 w-full">
      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-sm pb-2">감축 목표</h2>
        <p className="text-lg font-bold">
          2027년 까지 <span className="text-[#16B32F]">86%</span> 감축
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <h2 className="text-sm pb-2">감축률</h2>
          <p className="text-lg font-bold">
            <span className="text-[#16B32F]">{CutEmissionPercentage}%</span>
          </p>
        </div>
        <div className="w-30 h-30">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
