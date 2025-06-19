"use client";

import api_url from "@/api_url";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/component/input";
import { ButtonDetail } from "@/component/button";

import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Image from "next/image";

export default function TransactionPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [pageSize, setPageSize] = useState(10); // NEW
  const [orderId, setSearchOrderId] = useState(""); // NEW
  const [loading, setLoading] = useState(true);
  const [pageActive, setPageActive] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [transactionProblemDetail, settransactionProblemDetail] =
    useState(null);

  const fetchTransaction = async (url = null) => {
    const token = Cookies.get("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Error",
        text: "Sesi anda telah abis, silahkan login kembali",
      });
      router.push("/auth/login");
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    setLoading(true);
    let query_params = `?&page=${pageActive}&page_size=${pageSize}`;
    if (orderId) {
      query_params += `&order_id=${encodeURIComponent(orderId)}`;
    }
    if (url == null) {
      url = `${api_url.transaction}${query_params}`;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (res.status === 401 || res.status === 403) {
        Swal.fire({
          icon: "error",
          confirmButtonColor: "#dc3545",
          title: "Error",
          text: "Sesi anda telah abis, silahkan login kembali",
        });
        Cookies.remove("token");
        router.push("/auth/login");
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setNextPage(data.next);
      setPrevPage(data.previous);

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

      setTransactions(data.results);
    } catch (err) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Error",
        text: "Gagal memuat pengguna, server tidak merespon",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [pageSize, orderId]);

  const handleSearchChange = (e) => {
    setSearchOrderId(e.target.value);
    setPageActive(1);
  };

  const handlePageSizeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setPageSize(val);
      setPageActive(1);
    }
  };

  const handlePagination = (url) => {
    setLoading(true);
    fetchTransaction(url);
  };

  const listHeaderTable = [
    "Order Id",
    "Nama Produk",
    "Penjual",
    "Pembeli",
    "Status",
    "Aksi",
  ];

  const handleShowDetail = (transaction) => {
    settransactionProblemDetail(transaction);
    setShowDetail(true);
  };
  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
          <div className="flex flex-col space-y-10 md:space-y-0">
            <div className="filter-content w-full">
              <div className="w-full">
                <div className="relative space-y-5 md:space-y-0 h-[56px] w-full flex flex-col md:flex-row  md:items-center md:justify-between">
                  {/* button tambah */}
                  <div className="flex text-lg "></div>
                  <Input
                    type="text"
                    placeholder="Cari berdasarkan order id"
                    value={orderId}
                    handle={handleSearchChange}
                    name="search"
                  />
                </div>
              </div>
            </div>
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
                        Memuat service...
                      </td>
                    </tr>
                  ) : transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0 ">
                          <div className="flex justify-center w-full items-center space-x-2.5">
                            <span className="font-medium text-bgray-600 dark:text-bgray-50">
                              {transaction.order_id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 xl:px-0 w-[200px]">
                          <div className="flex justify-center w-full items-center space-x-2.5">
                            <span className="font-medium text-bgray-600 dark:text-bgray-50">
                              {transaction.product_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center w-full items-center space-x-2.5">
                            <span className="font-medium text-bgray-600 dark:text-bgray-50">
                              {transaction.product.store}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center w-full items-center space-x-2.5">
                            <span className="font-medium text-bgray-600 dark:text-bgray-50">
                              {transaction.user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center w-full items-center space-x-2.5">
                            {transaction.status.id === -1 && (
                              <button className="bg-red-600 px-4 py-1 text-sm text-white rounded">
                                {transaction.status.message.ind}
                              </button>
                            )}
                            {transaction.status.id === 1 && (
                              <button className="bg-yellow-600 px-4 py-1 text-sm text-white rounded">
                                {transaction.status.message.ind}
                              </button>
                            )}
                            {transaction.status.id === 10 && (
                              <button className="bg-blue-600 px-4 py-1 text-sm text-white rounded">
                                {transaction.status.message.ind}
                              </button>
                            )}
                            {transaction.status.id === 20 && (
                              <button className="bg-blue-600 px-4 py-1 text-sm text-white rounded">
                                {transaction.status.message.ind}
                              </button>
                            )}
                            {transaction.status.id === 25 && (
                              <button className="bg-red-600 px-4 py-1 text-sm text-white rounded">
                                {transaction.status.message.ind}
                              </button>
                            )}
                            {transaction.status.id === 30 && (
                              <button className="bg-green-600 px-4 py-1 text-sm text-white rounded">
                                {transaction.status.message.ind}
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center w-full items-center space-x-2.5">
                            <ButtonDetail
                              handle={() => handleShowDetail(transaction)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-gray-500 font-semibold py-4"
                      >
                        Service tidak ditemukan
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
      {/* modal show detail */}
      <div
        className={`${
          showDetail ? "flex" : "hidden"
        } fixed inset-0 z-50 items-center justify-center `}
      >
        <div className="bg-white dark:bg-darkblack-600 rounded-2xl shadow-2xl p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Detail Transaksi
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 text-gray-700 dark:text-white">
            <div>
              <strong>Order ID:</strong> {transactionProblemDetail?.order_id}
            </div>
            <div>
              <strong>Nama Produk:</strong>{" "}
              {transactionProblemDetail?.product_name}
            </div>
            <div>
              <strong>Penjual:</strong>{" "}
              {transactionProblemDetail?.product.store} /{" "}
              {transactionProblemDetail?.product.email}
            </div>
            <div>
              <strong>Pembeli:</strong> {transactionProblemDetail?.user.name} /{" "}
              {transactionProblemDetail?.user.email}
            </div>
            <div>
              <strong>Harga:</strong>{" "}
              {transactionProblemDetail?.product.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              {transactionProblemDetail?.status.id === -1 && (
                <>
                  <button className="bg-red-600 px-4 py-1  text-sm">
                    {transactionProblemDetail?.status.message.ind}
                  </button>
                </>
              )}
              {transactionProblemDetail?.status.id === 1 && (
                <>
                  <button className="bg-yellow-600 px-4 py-1  text-sm">
                    {transactionProblemDetail?.status.message.ind}
                  </button>
                </>
              )}
              {transactionProblemDetail?.status.id === 10 && (
                <>
                  <button className="bg-blue-600 px-4 py-1  text-sm">
                    {transactionProblemDetail?.status.message.ind}
                  </button>
                </>
              )}
              {transactionProblemDetail?.status.id === 20 && (
                <>
                  <button className="bg-blue-600 px-4 py-1  text-sm">
                    {transactionProblemDetail?.status.message.ind}
                  </button>
                </>
              )}
              {transactionProblemDetail?.status.id === 25 && (
                <>
                  <button className="bg-red-600 px-4 py-1  text-sm">
                    {transactionProblemDetail?.status.message.ind}
                  </button>
                </>
              )}
              {transactionProblemDetail?.status.id === 30 && (
                <>
                  <button className="bg-green-600 px-4 py-1  text-sm">
                    {transactionProblemDetail?.status.message.ind}
                  </button>
                </>
              )}
            </div>
            <div>
              <strong>Waktu Transaksi:</strong>{" "}
              {new Date(transactionProblemDetail?.created_at).toLocaleString(
                "id-ID",
                {
                  dateStyle: "full",
                  timeStyle: "short",
                }
              )}
            </div>
            <div className="flex justify-center">
              {transactionProblemDetail?.product.image ? (
                <Image
                  src={transactionProblemDetail.product.image}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ) : (
                <span className="text-gray-500 italic">Tidak ada gambar</span>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCloseDetail}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>

      {/* end modal show detail */}
    </div>
  );
}
