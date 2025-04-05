"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Product from "./product";
import Transaction from "./transaction";

export default function User() {
  const { id } = useParams();
  const router = useRouter();

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

      {/* card informasi user */}
      <div className="bg-white border shadow-lg rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800">Informasi User</h3>
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

      <Transaction />
    </div>
  );
}
