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
import MonthlyTransactionChart from "./monthlytransaction";

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
  const [activeGameTab, setActiveGameTab] = useState("minggu");
  const [activeSellerTab, setActiveSellerTab] = useState("minggu");

  const topGames = {
    minggu: [
      { name: "Mobile Legends", image: "/game/mlbb.png" },
      { name: "Free Fire", image: "/game/freefire.png" },
      { name: "PUBG", image: "/game/pubg.png" },
      { name: "Genshin Impact", image: "/game/genshin.png" },
      { name: "Valorant", image: "/game/valorant.png" },
      { name: "CODM", image: "/game/codm.png" },
      { name: "Roblox", image: "/game/roblox.png" },
      { name: "Fortnite", image: "/game/fortnite.png" },
      { name: "Clash of Clans", image: "/game/coc.png" },
      { name: "Apex Legends", image: "/game/apex.png" },
    ],

    bulan: [
      /* ... */
      { name: "Free Fire", image: "/game/freefire.png" },
      { name: "Mobile Legends", image: "/game/mlbb.png" },
      { name: "PUBG", image: "/game/pubg.png" },
      { name: "Genshin Impact", image: "/game/genshin.png" },
      { name: "CODM", image: "/game/codm.png" },
      { name: "Roblox", image: "/game/roblox.png" },
      { name: "Valorant", image: "/game/valorant.png" },
      { name: "Fortnite", image: "/game/fortnite.png" },
      { name: "Clash of Clans", image: "/game/coc.png" },
      { name: "Apex Legends", image: "/game/apex.png" },
    ],
    semua: [
      /* ... */
      { name: "Roblox", image: "/game/roblox.png" },
      { name: "Mobile Legends", image: "/game/mlbb.png" },
      { name: "Free Fire", image: "/game/freefire.png" },
      { name: "PUBG", image: "/game/pubg.png" },
      { name: "CODM", image: "/game/codm.png" },
      { name: "Genshin Impact", image: "/game/genshin.png" },
      { name: "Valorant", image: "/game/valorant.png" },
      { name: "Fortnite", image: "/game/fortnite.png" },
      { name: "Clash of Clans", image: "/game/coc.png" },
      { name: "Apex Legends", image: "/game/apex.png" },
    ],
  };

  const topSellers = {
    minggu: [
      { name: "GameZone", image: "/sellers/a.jpg", total: 128 },
      { name: "TopUpHero", image: "/sellers/b.jpg", total: 120 },
      { name: "LevelUpStore", image: "/sellers/c.jpg", total: 115 },
      { name: "DiamondKing", image: "/sellers/d.jpg", total: 110 },
      { name: "EZTopUp", image: "/sellers/e.jpg", total: 105 },
      { name: "FastTopUp", image: "/sellers/f.jpg", total: 98 },
      { name: "ArenaStore", image: "/sellers/g.jpg", total: 95 },
      { name: "PlayCentral", image: "/sellers/h.jpg", total: 92 },
      { name: "GGStore", image: "/sellers/i.jpg", total: 88 },
      { name: "XPBoost", image: "/sellers/j.jpg", total: 84 },
    ],
    bulan: [
      { name: "DiamondKing", image: "/sellers/d.jpg", total: 498 },
      { name: "TopUpHero", image: "/sellers/b.jpg", total: 475 },
      { name: "EZTopUp", image: "/sellers/e.jpg", total: 462 },
      { name: "LevelUpStore", image: "/sellers/c.jpg", total: 450 },
      { name: "GameZone", image: "/sellers/a.jpg", total: 440 },
      { name: "XPBoost", image: "/sellers/j.jpg", total: 430 },
      { name: "PlayCentral", image: "/sellers/h.jpg", total: 428 },
      { name: "FastTopUp", image: "/sellers/f.jpg", total: 420 },
      { name: "ArenaStore", image: "/sellers/g.jpg", total: 417 },
      { name: "GGStore", image: "/sellers/i.jpg", total: 410 },
    ],
    semua: [
      { name: "GameZone", image: "/sellers/a.jpg", total: 1845 },
      { name: "TopUpHero", image: "/sellers/b.jpg", total: 1800 },
      { name: "LevelUpStore", image: "/sellers/c.jpg", total: 1725 },
      { name: "DiamondKing", image: "/sellers/d.jpg", total: 1690 },
      { name: "EZTopUp", image: "/sellers/e.jpg", total: 1612 },
      { name: "FastTopUp", image: "/sellers/f.jpg", total: 1578 },
      { name: "ArenaStore", image: "/sellers/g.jpg", total: 1505 },
      { name: "PlayCentral", image: "/sellers/h.jpg", total: 1470 },
      { name: "GGStore", image: "/sellers/i.jpg", total: 1432 },
      { name: "XPBoost", image: "/sellers/j.jpg", total: 1398 },
    ],
  };

  const renderGameList = (games) => (
    <ul className="mt-4 space-y-2">
      {games.map((game, idx) => (
        <li
          key={idx}
          className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2"
        >
          <img
            src={game.image}
            alt={game.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-800 font-medium">{game.name}</span>
        </li>
      ))}
    </ul>
  );

  const renderSellerList = (sellers) => (
    <ul className="mt-4 space-y-2">
      {sellers.map((seller, idx) => (
        <li
          key={idx}
          className="flex items-center justify-between bg-gray-50 rounded-lg p-2"
        >
          <div className="flex items-center space-x-3">
            <img
              src={seller.image}
              alt={seller.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-800 font-medium">{seller.name}</span>
          </div>
          <span className="text-green-600 font-semibold">{seller.total}</span>
        </li>
      ))}
    </ul>
  );

  const tabOptions = [
    { key: "minggu", label: "Minggu Ini" },
    { key: "bulan", label: "Bulan Ini" },
    { key: "semua", label: "Sepanjang Waktu" },
  ];
  return (
    <div className=" p-2">
      {/* info dashboard */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Total pengguna */}
        <div className="bg-white border  shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Total Pengguna
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">100</p>
        </div>

        {/* Total penjual */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">Total Penjual</h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">50</p>
        </div>

        {/* Total Transaksi */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Total Transaksi
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">1000</p>
        </div>

        {/* Total saldo users */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Total Saldo Penjual
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">
            Rp 1000.000.000
          </p>
        </div>

        {/* total game */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">Total Game</h3>
          <div className="flex mt-4 ">
            <p className="text-3xl font-bold  ">50</p>
          </div>
        </div>

        {/* level silver */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">Total Produk</h3>
          <div className="flex mt-4 ">
            <p className="text-3xl font-bold  ">50</p>
          </div>
        </div>
      </div>

      <MonthlyTransactionChart />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game Terlaris */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            10 Game Terlaris
          </h2>
          <div className="flex justify-center space-x-2 mb-4">
            {tabOptions.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeGameTab === tab.key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActiveGameTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {renderGameList(topGames[activeGameTab])}
        </div>

        {/* Seller Terlaris */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            10 Penjual Terlaris
          </h2>
          <div className="flex justify-center space-x-2 mb-4">
            {tabOptions.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeSellerTab === tab.key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActiveSellerTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {renderSellerList(topSellers[activeSellerTab])}
        </div>
      </div>
    </div>
  );
}
