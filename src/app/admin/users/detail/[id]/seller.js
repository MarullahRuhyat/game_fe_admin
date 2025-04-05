"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Product from "./product";
import Transaction from "./transaction";

export default function Seller() {
  const { id } = useParams();
  const router = useRouter();
  const [tabs, setTabs] = useState([
    { id: "Produk", title: "Produk", count: 0 },
    { id: "Transaksi", title: "Transaksi", count: 0 },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleActiveTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className=" p-2">
      {/* tombol kembali */}
      <div className="flex items-center mb-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          onClick={() => router.push("/admin/users")}
        >
          <i className="fa fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Total produk */}
        <div className="bg-white border  shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">Total Produk</h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">10</p>
        </div>

        {/* Total ulasan */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">Total Ulasan</h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">10</p>
        </div>

        {/* Total Transaksi */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Total Transaksi
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">10</p>
        </div>

        {/* saldo */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">Saldo</h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">Rp 10.000.000</p>
        </div>

        {/* Rating bintang */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Rating Bintang
          </h3>
          <div className="flex mt-4 ">
            <p className="text-3xl font-bold  ">4.5</p>
            <div className="flex items-center  text-[#ffb600]">
              <span className=" text-2xl ml-2">
                <i className="fa fa-star"></i>
              </span>
            </div>
          </div>
        </div>

        {/* level silver */}
        <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">Level</h3>
          {/* icon piala */}
          <div className="flex mt-4 ">
            <span className="text-3xl font-bold  ">Silver</span>
            <div className="flex items-center  text-gray-400">
              <span className=" text-2xl ml-2">
                <i className="fa fa-trophy"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* card informasi seller */}
      <div className="bg-white border shadow-lg rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800">
          Informasi Seller
        </h3>
        <div className="flex items-center mt-4">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Logo Toko - Jual Item Mobile Legends"
            className="w-16 h-16 rounded-full object-cover mr-4"
            loading="lazy"
          />
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Nama Toko</h4>
            <p className="text-gray-600">email@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex  mt-4 space-x-4 text-lg">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`pb-2 cursor-pointer transition-all border-b-2 ${
              activeTab === tab.id
                ? "text-black border-black font-semibold"
                : "text-gray-500 border-transparent hover:text-black"
            }`}
            onClick={() => handleActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {activeTab === "Produk" && <Product />}

      {/* table transaksi */}
      {activeTab === "Transaksi" && <Transaction />}
    </div>
  );
}
