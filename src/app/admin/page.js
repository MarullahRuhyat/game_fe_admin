"use client";
import React, { use, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import api_url from "@/api_url";
import { useDispatch, useSelector } from "react-redux";

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function UserPage() {
  return (
    <div className="container">
      <h1>Coming Soon</h1>
      <p>Halaman ini akan segera hadir. Terima kasih atas kesabaran Anda.</p>
    </div>
  );
}
