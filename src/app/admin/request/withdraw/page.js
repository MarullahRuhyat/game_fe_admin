"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Input } from "@/component/input";
import { ButtonReject, ButtonApprove } from "@/component/button";

export default function WithdrawPage() {
  const router = useRouter();

  const [withdraws, setWithdraws] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageActive, setPageActive] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const fetchWithdraws = async (url = null) => {
    setLoading(true);
    const token = Cookies.get("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Gagal",
        text: "Anda tidak memiliki akses, silahkan login",
      });
      router.push("/login");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let query = `?page=${pageActive}&page_size=${pageSize}`;
    if (searchName) {
      query += `&search=${encodeURIComponent(searchName)}`;
    }

    if (!url) {
      url = `${api_url.withdraw}${query}`;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
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

      setWithdraws(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Gagal",
        text: "Tidak bisa mengambil data withdraw",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdraws();
  }, [pageSize, pageActive, searchName]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
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
    fetchWithdraws(url);
  };

  const handleAction = async (id, action) => {
    const token = Cookies.get("token");
    if (!token) {
      Swal.fire("Gagal", "Anda tidak memiliki akses", "error");
      return;
    }

    let reason = "";

    if (action === "reject") {
      const { value: text } = await Swal.fire({
        title: "Alasan Penolakan",
        input: "textarea",
        inputLabel: "Tulis alasan mengapa penarikan ditolak",
        inputPlaceholder: "Contoh: Data tidak valid, akun mencurigakan, dll.",
        inputAttributes: {
          "aria-label": "Alasan penolakan",
        },
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Kirim",
        cancelButtonText: "Batal",
        showCancelButton: true,
      });

      if (!text) return;
      reason = text;
    } else {
      const confirm = await Swal.fire({
        title: `Konfirmasi`,
        text: `Yakin ingin menyetujui penarikan ini?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Ya, approve`,
      });
      console.log("confirm", confirm);

      if (!confirm.isConfirmed) return;
    }

    const payload = {
      reason: reason,
      status: action === "approve" ? "approved" : "failed",
    };

    try {
      console.log("payload", payload);

      const res = await fetch(`${api_url.withdraw}${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Gagal memproses aksi");
      }

      Swal.fire("Berhasil", `Penarikan berhasil di-${action}`, "success");
      fetchWithdraws(); // Refresh data
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan saat memproses", "error");
    }
  };

  const listHeaderTable = [
    "No",
    "Nama Pengguna",
    "Jumlah",
    "Status",
    "Tanggal",
    "Aksi",
  ];

  return (
    <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
          <div className="flex flex-col space-y-10 md:space-y-0">
            <div className="filter-content w-full">
              <div className="w-full">
                <div className="relative space-y-5 md:space-y-0 h-[56px] w-full flex flex-col md:flex-row  md:items-center md:justify-between">
                  {/* button tambah */}
                  <Input
                    type="text"
                    placeholder="Cari berdasarkan nama"
                    value={searchName}
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
                  ) : withdraws.length > 0 ? (
                    withdraws.map((withdraw, index) => (
                      <tr
                        key={withdraw.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {(pageActive - 1) * pageSize + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {withdraw.user.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            Rp{" "}
                            {parseFloat(withdraw.amount).toLocaleString(
                              "id-ID"
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span
                            className={`text-base font-medium ${
                              withdraw.status === "approved"
                                ? "text-green-500"
                                : withdraw.status === "pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {withdraw.status === "approved"
                              ? "Berhasil"
                              : withdraw.status === "pending"
                              ? "Pending"
                              : "Gagal"}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {new Date(withdraw.created_at).toLocaleDateString(
                              "id-ID"
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          {withdraw.status === "pending" ? (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction(withdraw.id, "approve");
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md"
                              >
                                Approve
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction(withdraw.id, "reject");
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            "-"
                          )}
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
    </div>
  );
}
