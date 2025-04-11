import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyTransactionChart = () => {
  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Total Transaksi",
        data: [120, 98, 150, 170, 130, 190, 250, 300, 210, 180, 160, 200], // ganti ini dengan data asli
        backgroundColor: "rgba(59, 130, 246, 0.7)", // biru
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Transaksi per Bulan (2025)",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="bg-white p-5 dark:bg-darkblack-600">
      <div className="bg-mb-2 flex items-center justify-between border-b border-bgray-300 pb-2 dark:border-darkblack-400">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyTransactionChart;
