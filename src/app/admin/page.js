"use client";
import React, { use, useEffect, useState, useRef } from "react";
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
import TotalUpChart from "@/component/totalUpChart";
import Image from "next/image";
import Swal from "sweetalert2";

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
      {
        name: "Mobile Legends",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Free Fire",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "PUBG",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Genshin Impact",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Valorant",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "CODM",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Roblox",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Fortnite",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Clash of Clans",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Apex Legends",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
    ],

    bulan: [
      /* ... */
      {
        name: "Free Fire",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Mobile Legends",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "PUBG",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Genshin Impact",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "CODM",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Roblox",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Valorant",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Fortnite",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Clash of Clans",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Apex Legends",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
    ],
    semua: [
      /* ... */
      {
        name: "Roblox",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Mobile Legends",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Free Fire",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "PUBG",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "CODM",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Genshin Impact",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Valorant",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Fortnite",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Clash of Clans",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
      {
        name: "Apex Legends",
        image: "/template/assets/images/avatar/profile-52x52.png",
      },
    ],
  };

  const topSellers = {
    minggu: [
      {
        name: "GameZone",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 128,
      },
      {
        name: "TopUpHero",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 120,
      },
      {
        name: "LevelUpStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 115,
      },
      {
        name: "DiamondKing",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 110,
      },
      {
        name: "EZTopUp",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 105,
      },
      {
        name: "FastTopUp",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 98,
      },
      {
        name: "ArenaStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 95,
      },
      {
        name: "PlayCentral",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 92,
      },
      {
        name: "GGStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 88,
      },
      {
        name: "XPBoost",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 84,
      },
    ],
    bulan: [
      {
        name: "DiamondKing",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 498,
      },
      {
        name: "TopUpHero",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 475,
      },
      {
        name: "EZTopUp",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 462,
      },
      {
        name: "LevelUpStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 450,
      },
      {
        name: "GameZone",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 440,
      },
      {
        name: "XPBoost",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 430,
      },
      {
        name: "PlayCentral",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 428,
      },
      {
        name: "FastTopUp",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 420,
      },
      {
        name: "ArenaStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 417,
      },
      {
        name: "GGStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 410,
      },
    ],
    semua: [
      {
        name: "GameZone",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1845,
      },
      {
        name: "TopUpHero",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1800,
      },
      {
        name: "LevelUpStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1725,
      },
      {
        name: "DiamondKing",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1690,
      },
      {
        name: "EZTopUp",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1612,
      },
      {
        name: "FastTopUp",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1578,
      },
      {
        name: "ArenaStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1505,
      },
      {
        name: "PlayCentral",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1470,
      },
      {
        name: "GGStore",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1432,
      },
      {
        name: "XPBoost",
        image: "/template/assets/images/avatar/profile-52x52.png",
        total: 1398,
      },
    ],
  };

  const renderGameList = (games) => (
    <ul className="mt-4 space-y-2">
      {games.map((game, idx) => (
        <li
          key={idx}
          className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2 dark:bg-darkblack-500"
        >
          <Image
            width={52}
            height={52}
            src={game.image}
            alt={game.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-800 font-medium dark:text-white">
            {game.name}
          </span>
        </li>
      ))}
    </ul>
  );

  const renderSellerList = (sellers) => (
    <ul className="mt-4 space-y-2">
      {sellers.map((seller, idx) => (
        <li
          key={idx}
          className="flex items-center justify-between bg-gray-50 rounded-lg p-2 dark:bg-darkblack-500 "
        >
          <div className="flex items-center space-x-3">
            <Image
              width={52}
              height={52}
              src={seller.image}
              alt={seller.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-800 font-medium dark:text-white">
              {seller.name}
            </span>
          </div>
          <span className="text-purple-700 font-semibold">{seller.total}</span>
        </li>
      ))}
    </ul>
  );

  const tabOptions = [
    { key: "minggu", label: "Minggu Ini" },
    { key: "bulan", label: "Bulan Ini" },
    { key: "semua", label: "Sepanjang Waktu" },
  ];

  const tabClass = (isActive) =>
    `px-4 py-2 rounded-t-md font-semibold transition-all duration-200 ${
      isActive
        ? "bg-white text-bgray-900 shadow-md dark:bg-darkblack-500 dark:text-white"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-darkblack-400 dark:text-gray-400 hover:dark:bg-darkblack-300"
    }`;

  return (
    <>
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <div className="mb-[24px] w-full">
            <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-pengguna.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Pengguna
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      $7,245.00
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-penjual.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Penjual
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      $7,245.00
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-transaksi.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Transaksi
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      $7,245.00
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-earn.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Saldo
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      $7,245.00
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-produk.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Produk
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      $7,245.00
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-game.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Game
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      $7,245.00
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <MonthlyTransactionChart />
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Game Terlaris */}
        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-bgray-900 dark:text-white">
              10 Game Terlaris
            </h2>
            <div className="flex space-x-2">
              {tabOptions.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveGameTab(tab.key)}
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    activeGameTab === tab.key
                      ? "bg-purple-500 "
                      : "bg-gray-200 "
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {renderGameList(topGames[activeGameTab])}
        </div>

        {/* Penjual Terlaris */}
        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-bgray-900 dark:text-white">
              10 Penjual Terlaris
            </h2>
            <div className="flex space-x-2">
              {tabOptions.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSellerTab(tab.key)}
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    activeSellerTab === tab.key
                      ? "bg-purple-500 "
                      : "bg-gray-200 "
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {renderSellerList(topSellers[activeSellerTab])}
        </div>
      </div>
    </>
  );
}
