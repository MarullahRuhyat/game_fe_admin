"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Transaction({ user }) {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [pageActive, setPageActive] = useState(1);
  const pageSize = 10;

  async function fetchTransaction(url = null) {
    setLoading(true);
    const token = Cookies.get("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Error",
        text: "Anda harus login terlebih dahulu.",
      });
      router.push("/auth/login");
      return;
    }
    let params = {
      user_id: user.id,
      page_size: pageSize,
    };
    const queryString = new URLSearchParams(params).toString();
    if (url == null) {
      url = `${api_url.transaction}?${queryString}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);

      if (data.next === null && data.previous === null) {
        setPageActive(1);
      }
      if (data.next === null && data.previous !== null) {
        const url = data.previous;
        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");
        console.log("page", page);
        if (page === null) {
          setPageActive(2);
        } else {
          setPageActive(parseInt(page) + 1);
        }
      }
      if (data.next !== null && data.previous === null) {
        const url = data.next;
        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");

        setPageActive(parseInt(page) - 1);
      }

      if (data.next !== null && data.previous !== null) {
        const url = data.next;
        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");
        setPageActive(parseInt(page) - 1);
      }
      setTransaction(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Error",
        text: "Terjadi kesalahan saat mengambil data transaksi.",
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTransaction();
  }, []);

  const handlePagination = (url) => {
    fetchTransaction(url);
  };

  console.log("transaction", transaction);
  console.log("user", user);

  return (
    <>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Jenis Transaksi</th>
              <th className="px-4 py-2">Nama Produk</th>
              <th className="px-4 py-2">Jumlah</th>
              <th className="px-4 py-2">Total Harga</th>
              <th className="px-4 py-2">Tanggal Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Data transaksi */}
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 font-semibold py-4"
                >
                  Memuat transaksi...
                </td>
              </tr>
            ) : transaction.length > 0 ? (
              transaction.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td className="border px-4 py-2 text-center">
                    {(pageActive - 1) * pageSize + index + 1}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.order_id}
                  </td>
                  <td className="border px-4 py-2 text-center ">
                    {transaction.user != user.id ? "Penjualan" : "Pembelian"}
                  </td>
                  <td className="border px-4 py-2 text-center w-1/4">
                    {transaction.product.name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {transaction.quantity}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {/* format rupiah */}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.total_price)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(transaction.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 font-semibold py-4"
                >
                  Tidak ada transaksi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {prevPage && (
          <button
            onClick={() => handlePagination(prevPage)}
            className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Prev
          </button>
        )}
        <button
          key={pageActive}
          className={`px-4 py-2 mx-1 rounded-md shadow bg-blue-600 "`}
        >
          <p className="text-white font-semibold">{pageActive}</p>
        </button>
        {nextPage && (
          <button
            onClick={() => handlePagination(nextPage)}
            className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
