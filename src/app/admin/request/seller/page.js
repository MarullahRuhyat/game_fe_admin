"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function SellerPage() {
  const router = useRouter();

  const [sellerApplications, setSellerApplications] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageActive, setPageActive] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchSellerApplications = async (url = null) => {
    setLoading(true);
    const token = Cookies.get("token");
    if (!token) {
      Swal.fire({
        icon: "error",
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
      url = `${api_url.sellerApplication}${query}`;
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
      Swal.fire({
        icon: "error",
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

      Swal.fire("Berhasil", `Penarikan berhasil di-${action}`, "success");
      fetchSellerApplications(); // Refresh data
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan saat memproses", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Penarikan Saldo</h2>
      <div className="flex items-center justify-between my-4">
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

        <input
          type="text"
          placeholder="Cari nama pengguna..."
          value={searchName}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama Pengguna</th>
              <th className="px-4 py-2">KTP</th>
              <th className="px-4 py-2">Selfie dengan KTP</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : sellerApplications.length > 0 ? (
              sellerApplications.map((sellerApplication, index) => (
                <tr key={sellerApplication.id}>
                  <td className="border px-4 py-2 text-center">
                    {(pageActive - 1) * pageSize + index + 1}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {sellerApplication.user.name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <img
                      src={`${sellerApplication.id_card}`}
                      alt="KTP"
                      className="w-16 h-16 object-cover rounded-md"
                      loading="lazy"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <img
                      src={`${sellerApplication.selfie_with_id}`}
                      alt="KTP"
                      className="w-16 h-16 object-cover rounded-md"
                      loading="lazy"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {sellerApplication.status === "approved" ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                        Berhasil
                      </span>
                    ) : sellerApplication.status === "pending" ? (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-md">
                        Gagal
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(
                      sellerApplication.submitted_at
                    ).toLocaleDateString("id-ID")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {sellerApplication.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handleAction(sellerApplication.id, "approve")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleAction(sellerApplication.id, "reject")
                          }
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
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada data penarikan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
          className="px-4 py-2 mx-1 rounded-md shadow bg-blue-600 text-white"
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
