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
  const [showResult, setShowResult] = useState(false);
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

  const listHeaderTable = [
    "No",
    "Order ID",
    "Jenis Transaksi",
    "Nama Produk",
    "Jumlah",
    "Total Harga",
    "Tanggal Transaksi",
  ];

  return (
    <div className="2xl:flex 2xl:space-x-[48px] mt-8">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
          <div className="flex flex-col space-y-10 md:space-y-0">
            <div className="table-content w-full overflow-x-auto ">
              <table className="w-full ">
                <thead className="bg-bgray-50 dark:bg-darkblack-500">
                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                    {listHeaderTable.map((header, index) => (
                      <td className="px-6 py-5 xl:px-0 text-center" key={index}>
                        <div className="flex justify-center w-full items-center space-x-2.5">
                          <span className="font-medium text-bgray-600 dark:text-bgray-50">
                            {header}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-gray-500 font-semibold py-4"
                      >
                        Memuat transaksi...
                      </td>
                    </tr>
                  ) : transaction.length > 0 ? (
                    transaction.map((row, index) => (
                      <tr
                        key={row.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {(pageActive - 1) * pageSize + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {row.order_id}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {row.user != user.id ? "Penjualan" : "Pembelian"}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0 w-1/6">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {row.product.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {row.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(row.total_price)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-gray-500 font-semibold py-4"
                      >
                        Tidak ada transaksi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full flex lg:justify-between justify-center items-center">
              <div className="lg:flex hidden space-x-4 items-center">
                <div className="relative">
                  <button
                    type="button"
                    className="px-2.5 py-[14px] border rounded-lg border-bgray-300 dark:border-darkblack-400 flex space-x-6 items-center"
                    onClick={() => {
                      setShowResult(!showResult);
                    }}
                  >
                    <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">
                      {pageSize}
                    </span>
                    <span>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                          stroke="#A0AEC0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                  <div
                    className="rounded-lg w-full shadow-lg bg-white absolute right-0 z-10 top-14 overflow-hidden hidden"
                    style={{
                      display: showResult ? "block" : "none",
                    }}
                  >
                    <ul>
                      <li
                        className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                        onClick={() => {
                          setPageSize(10);
                          setPageActive(1);
                          setShowResult(false);
                        }}
                      >
                        10
                      </li>
                      <li
                        className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                        onClick={() => {
                          setPageSize(25);
                          setPageActive(1);
                          setShowResult(false);
                        }}
                      >
                        25
                      </li>

                      <li
                        className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                        onClick={() => {
                          setPageSize(50);
                          setPageActive(1);
                          setShowResult(false);
                        }}
                      >
                        50
                      </li>
                      <li
                        className="text-sm font-medium text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 "
                        onClick={() => {
                          setPageSize(100);
                          setPageActive(1);
                          setShowResult(false);
                        }}
                      >
                        100
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pagination-content w-full">
                <div className="flex w-full items-center justify-end">
                  <div className="flex items-center ">
                    {prevPage && (
                      <button
                        style={{ margin: "3px" }}
                        type="button"
                        onClick={() => handlePagination(prevPage)}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-200  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
                      >
                        <span>Sebelumnya</span>
                      </button>
                    )}
                    <button
                      style={{ margin: "3px" }}
                      type="button"
                      className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out bg-purple-500 text-white  lg:px-6 lg:py-2.5 lg:text-sm`}
                    >
                      <span>{pageActive}</span>
                    </button>
                    {nextPage && (
                      <button
                        style={{ margin: "3px" }}
                        type="button"
                        onClick={() => handlePagination(nextPage)}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-200  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
                      >
                        <span>Selanjutnya</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    // <>
    //   <div className="overflow-x-auto mt-4">
    //     <table className="table-auto w-full border-collapse border border-gray-300">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="px-4 py-2">No</th>
    //           <th className="px-4 py-2">Order ID</th>
    //           <th className="px-4 py-2">Jenis Transaksi</th>
    //           <th className="px-4 py-2">Nama Produk</th>
    //           <th className="px-4 py-2">Jumlah</th>
    //           <th className="px-4 py-2">Total Harga</th>
    //           <th className="px-4 py-2">Tanggal Transaksi</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {/* Data transaksi */}
    //         {loading ? (
    //           <tr>
    //             <td
    //               colSpan="7"
    //               className="text-center text-gray-500 font-semibold py-4"
    //             >
    //               Memuat transaksi...
    //             </td>
    //           </tr>
    //         ) : transaction.length > 0 ? (
    //           transaction.map((transaction, index) => (
    //             <tr key={transaction.id}>
    //               <td className="border px-4 py-2 text-center">
    //                 {(pageActive - 1) * pageSize + index + 1}
    //               </td>
    //               <td className="border px-4 py-2 text-center">
    //                 {transaction.order_id}
    //               </td>
    //               <td className="border px-4 py-2 text-center ">
    //                 {transaction.user != user.id ? "Penjualan" : "Pembelian"}
    //               </td>
    //               <td className="border px-4 py-2 text-center w-1/4">
    //                 {transaction.product.name}
    //               </td>
    //               <td className="border px-4 py-2 text-center">
    //                 {transaction.quantity}
    //               </td>
    //               <td className="border px-4 py-2 text-center">
    //                 {/* format rupiah */}
    //                 {new Intl.NumberFormat("id-ID", {
    //                   style: "currency",
    //                   currency: "IDR",
    //                 }).format(transaction.total_price)}
    //               </td>
    //               <td className="border px-4 py-2 text-center">
    //                 {new Date(transaction.created_at).toLocaleDateString(
    //                   "id-ID",
    //                   {
    //                     year: "numeric",
    //                     month: "long",
    //                     day: "numeric",
    //                   }
    //                 )}
    //               </td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td
    //               colSpan="7"
    //               className="text-center text-gray-500 font-semibold py-4"
    //             >
    //               Tidak ada transaksi
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    //   <div className="flex justify-center mt-4">
    //     {prevPage && (
    //       <button
    //         onClick={() => handlePagination(prevPage)}
    //         className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
    //       >
    //         Prev
    //       </button>
    //     )}
    //     <button
    //       key={pageActive}
    //       className={`px-4 py-2 mx-1 rounded-md shadow bg-blue-600 "`}
    //     >
    //       <p className="text-white font-semibold">{pageActive}</p>
    //     </button>
    //     {nextPage && (
    //       <button
    //         onClick={() => handlePagination(nextPage)}
    //         className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
    //       >
    //         Next
    //       </button>
    //     )}
    //   </div>
    // </>
  );
}
