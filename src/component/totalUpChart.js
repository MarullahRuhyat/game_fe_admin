import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TotalUpChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, "rgba(34, 197, 94,0.41)");
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0)");

    const bitsMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const bitsData = [0, 10, 0, 65, 0, 25, 0, 35, 20, 100, 40, 75];

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: bitsMonth,
        datasets: [
          {
            label: "Visitor",
            data: bitsData,
            backgroundColor: gradient,
            borderColor: "#6A0DAD",
            pointRadius: 0,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#6A0DAD",
            borderWidth: 1,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            bottom: -20,
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },

        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy(); // penting buat cleanup!
    };
  }, []);

  return (
    <div className="w-[150px] h-[68px]">
      <canvas ref={canvasRef} width={150} height={68}></canvas>
    </div>
  );
}
