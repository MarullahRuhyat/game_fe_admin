"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Image from "next/image";
import { Input } from "@/component/input";
import { ButtonApprove, ButtonReject } from "@/component/button";

export default function SellerPage() {
  const router = useRouter();

  const [sellerApplications, setSellerApplications] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageActive, setPageActive] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const fetchSellerApplications = async (url = null) => {
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
    let query = `?type=seller&page=${pageActive}&page_size=${pageSize}`;
    if (searchName) {
      query += `&search=${encodeURIComponent(searchName)}`;
    }

    if (!url) {
      url = `${api_url.sellerApplication}${query}`;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        Swal.fire({
          icon: "error",
          confirmButtonColor: "#dc3545",
          title: "Gagal",
          text: "Sesi anda sudah habis, silahkan login",
        });
        Cookies.remove("token");
        router.push("/auth/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("res", data);
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

      setSellerApplications(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Gagal",
        text: "Tidak bisa mengambil data sellerApplication",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerApplications();
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
    fetchSellerApplications(url);
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
        showCancelButton: true,
        confirmButtonText: "Kirim",
        cancelButtonText: "Batal",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
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
      const res = await fetch(`${api_url.sellerApplication}${id}/`, {
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

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: `Berhasil ${
          action === "approve" ? "menyetujui" : "menolak"
        } aplikasi`,
        confirmButtonColor: "#3085d6",
        timer: 2000,
      });
      fetchSellerApplications(); // Refresh data
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal ${
          action === "approve" ? "menyetujui" : "menolak"
        } aplikasi`,
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const listHeaderTable = [
    "No",
    "Nama",
    "KTP",
    "Tanggal Lahir",
    "No Handphone",
    "Alamat",
    "Status",
    "Aksi",
  ];

  console.log("sellerApplications", sellerApplications);

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
                  ) : sellerApplications.length > 0 ? (
                    sellerApplications.map((seller, index) => (
                      <tr
                        key={seller.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {(pageActive - 1) * pageSize + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {seller.user.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center items-center">
                            <a
                              href={seller.id_card}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                width={100}
                                height={100}
                                src={`${seller.id_card}`}
                                alt="KTP"
                                className="w-16 h-16 object-cover rounded-md"
                                loading="lazy"
                              />
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {seller.date_of_birth}
                          </span>
                        </td>

                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {seller.phone_number}
                          </span>
                        </td>

                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {seller.address}
                          </span>
                        </td>

                        <td className="px-6 py-5 xl:px-0">
                          <span
                            className={`text-base font-medium  ${
                              seller.status === "approved"
                                ? "text-green-500"
                                : seller.status === "pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {seller.status === "approved"
                              ? "Diterima"
                              : seller.status === "pending"
                              ? "Ditinjau"
                              : "Ditolak"}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          {seller.status === "pending" ? (
                            <div className="flex gap-2 justify-center">
                              <ButtonApprove
                                handle={() =>
                                  handleAction(seller.id, "approve")
                                }
                              />
                              <ButtonReject
                                handle={() => handleAction(seller.id, "reject")}
                              />
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
