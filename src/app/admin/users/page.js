"use client";

import api_url from "@/api_url";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/component/input";
import { ButtonDetail } from "@/component/button";

import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function UserPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [pageSize, setPageSize] = useState(10); // NEW
  const [searchName, setSearchName] = useState(""); // NEW
  const [loading, setLoading] = useState(true);
  const [pageActive, setPageActive] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [tabs, setTabs] = useState([
    { id: "all", title: "Semua", count: 0 },
    { id: "seller", title: "Penjual", count: 0 },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const fetchUsers = async (url = null) => {
    setLoading(true);
    let query_params = `?page=${pageActive}&page_size=${pageSize}`;
    if (activeTab === "seller") {
      query_params += "&seller=true";
    }
    if (searchName) {
      query_params += `&name=${encodeURIComponent(searchName)}`;
    }
    if (url == null) {
      url = `${api_url.user}${query_params}`;
    }

    try {
      const res = await fetch(url);
      if (res.status === 401 || res.status === 403) {
        Swal.fire({
          icon: "error",
          confirmButtonColor: "#dc3545",
          title: "Error",
          text: "Sesi anda telah habis, silahkan login kembali",
        });
        Cookies.remove("token");
        router.push("/auth/login");
        return;
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

      setUsers(data.results);
      setUserCount(data.count);
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === "all") {
            return { ...tab, count: data.user };
          } else if (tab.id === "seller") {
            return { ...tab, count: data.seller };
          }
          return tab;
        })
      );
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
    fetchUsers();
  }, [pageSize, activeTab, searchName]);

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

  const handleActiveTab = (tabId) => {
    setActiveTab(tabId);
    setPageActive(1);
  };

  const handlePagination = (url) => {
    setLoading(true);
    fetchUsers(url);
  };

  const listHeaderTable = ["No", "Nama", "email", "role", "Status", "Aksi"];

  return (
    <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
          <div className="flex flex-col space-y-10 md:space-y-0">
            <div className="filter-content w-full">
              <div className="w-full">
                <div className="relative space-y-5 md:space-y-0 h-[56px] w-full flex flex-col md:flex-row  md:items-center md:justify-between">
                  {/* button tambah */}
                  <div className="flex text-lg ">
                    {tabs.map((tab) => (
                      <div
                        style={{ margin: "10px" }}
                        key={tab.id}
                        className={`pb-2 cursor-pointer transition-all border-b-2 text-bgray-900 dark:text-bgray-50 ${
                          activeTab === tab.id
                            ? " border-purple-300 font-semibold"
                            : "border-transparent "
                        }`}
                        onClick={() => handleActiveTab(tab.id)}
                      >
                        {tab.title}
                      </div>
                    ))}
                  </div>
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
                  ) : users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={user.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {(pageActive - 1) * pageSize + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {user.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {user.email}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {user.role === "admin"
                              ? "Admin"
                              : user.role === "seller"
                              ? "Penjual"
                              : "Pembeli"}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {user.is_active ? (
                              <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                                Terverifikasi
                              </span>
                            ) : (
                              <span className="bg-gray-400 text-white px-2 py-1 rounded-md">
                                Belum Verif
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <ButtonDetail
                            handle={() =>
                              router.push(`/admin/users/detail/${user.id}`)
                            }
                          />
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
    // <div>
    //   <h2 className="text-2xl font-bold mb-4">Daftar Pengguna</h2>
    //   <div className="flex items-center justify-between my-4">
    //     {/* Select untuk jumlah per halaman */}
    //     <select
    //       value={pageSize}
    //       onChange={handlePageSizeChange}
    //       className="px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
    //     >
    //       <option value={10}>10</option>
    //       <option value={25}>25</option>
    //       <option value={50}>50</option>
    //       <option value={100}>100</option>
    //     </select>

    //     {/* Input cari nama */}
    //     <input
    //       type="text"
    //       placeholder="Cari nama..."
    //       value={searchName}
    //       onChange={handleSearchChange}
    //       className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
    //     />
    //   </div>

    //   <div className="flex  mt-4 space-x-4 text-lg">
    //     {tabs.map((tab) => (
    //       <div
    //         key={tab.id}
    //         className={`pb-2 cursor-pointer transition-all border-b-2 ${
    //           activeTab === tab.id
    //             ? "text-black border-black font-semibold"
    //             : "text-gray-500 border-transparent hover:text-black"
    //         }`}
    //         onClick={() => handleActiveTab(tab.id)}
    //       >
    //         {tab.title}
    //       </div>
    //     ))}
    //   </div>
    //   <div className="overflow-x-auto mt-2">
    //     <table className="table-auto w-full border-collapse border border-gray-300">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="px-4 py-2">No</th>
    //           <th className="px-4 py-2">Nama</th>
    //           <th className="px-4 py-2">Email</th>
    //           <th className="px-4 py-2">Role</th>
    //           <th className="px-4 py-2">Status</th>
    //           <th className="px-4 py-2">Aksi</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {loading ? (
    //           <tr>
    //             <td
    //               colSpan="6"
    //               className="text-center text-gray-500 font-semibold py-4"
    //             >
    //               Memuat pengguna...
    //             </td>
    //           </tr>
    //         ) : users.length > 0 ? (
    //           users.map((user, index) => (
    //             <tr key={user.id}>
    //               <td className="border px-4 py-2 text-center">
    //                 {(pageActive - 1) * pageSize + index + 1}
    //               </td>
    //               <td className="border px-4 py-2 text-center">{user.name}</td>
    //               <td className="border px-4 py-2 text-center">{user.email}</td>
    //               <td className="border px-4 py-2 text-center">
    //                 {user.role === "admin"
    //                   ? "Admin"
    //                   : user.role === "seller"
    //                   ? "Penjual"
    //                   : "Pembeli"}
    //               </td>
    //               <td className="border px-4 py-2 text-center">
    //                 {user.is_active ? (
    //                   <span className="bg-green-500 text-white px-2 py-1 rounded-md">
    //                     Terverifikasi
    //                   </span>
    //                 ) : (
    //                   <span className="bg-gray-400 text-white px-2 py-1 rounded-md">
    //                     Belum Verif
    //                   </span>
    //                 )}
    //               </td>
    //               <td className="border px-4 py-2 text-center">
    //                 <button
    //                   onClick={() =>
    //                     router.push(`/admin/users/detail/${user.id}`)
    //                   }
    //                   className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
    //                 >
    //                   Detail
    //                 </button>
    //               </td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td
    //               colSpan="6"
    //               className="text-center text-gray-500 font-semibold py-4"
    //             >
    //               Tidak ada pengguna ditemukan
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    //   {/* Pagination */}
    //   <div className="flex justify-end mt-4">
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
    //       className={`px-4 py-2 mx-1 rounded-md shadow bg-blue-600 text-white"`}
    //     >
    //       {pageActive}
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
    // </div>
  );
}
