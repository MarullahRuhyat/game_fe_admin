"use client";

import api_url from "@/api_url";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Pengguna</h2>
      <div className="flex items-center justify-between my-4">
        {/* Select untuk jumlah per halaman */}
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        {/* Input cari nama */}
        <input
          type="text"
          placeholder="Cari nama..."
          value={searchName}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        />
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
      <div className="overflow-x-auto mt-2">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 font-semibold py-4"
                >
                  Memuat pengguna...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2 text-center">
                    {(pageActive - 1) * pageSize + index + 1}
                  </td>
                  <td className="border px-4 py-2 text-center">{user.name}</td>
                  <td className="border px-4 py-2 text-center">{user.email}</td>
                  <td className="border px-4 py-2 text-center">
                    {user.role === "admin"
                      ? "Admin"
                      : user.role === "seller"
                      ? "Penjual"
                      : "Pembeli"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {user.is_active ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="bg-gray-400 text-white px-2 py-1 rounded-md">
                        Belum Verif
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        router.push(`/admin/users/detail/${user.id}`)
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 font-semibold py-4"
                >
                  Tidak ada pengguna ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-4">
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
          className={`px-4 py-2 mx-1 rounded-md shadow bg-blue-600 text-white"`}
        >
          {pageActive}
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
    </div>
  );
}
