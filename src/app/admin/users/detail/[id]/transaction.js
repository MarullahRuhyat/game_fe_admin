"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Transaction() {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">ID Transaksi</th>
            <th className="px-4 py-2">Jenis Transaksi</th>
            <th className="px-4 py-2">Nama Produk</th>
            <th className="px-4 py-2">Jumlah</th>
            <th className="px-4 py-2">Total Harga</th>
            <th className="px-4 py-2">Tanggal Transaksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Data transaksi */}
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">TRX-{index + 1}</td>
              <td className="border px-4 py-2 text-center">Pembelian</td>
              <td className="border px-4 py-2 text-center">
                Produk {index + 1}
              </td>
              <td className="border px-4 py-2 text-center">1</td>
              <td className="border px-4 py-2 text-center">Rp 10.000</td>
              <td className="border px-4 py-2 text-center">
                2023-09-{index + 1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
