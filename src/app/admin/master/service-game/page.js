"use client";

import api_url from "@/api_url";
import { fetchServiceGame } from "@/redux/action/serviceGameAction";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { removeServiceGame } from "@/redux/slice/serviceGameSlice";
import "font-awesome/css/font-awesome.min.css";

export default function ServicePage() {
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const router = useRouter();
  const dispatch = useDispatch();

  const serviceGame = useSelector((state) => state.serviceGame.serviceGame);
  const isFetchServiceGame = useSelector(
    (state) => state.serviceGame.isFetchServiceGame
  );

  useEffect(() => {
    if (!isFetchServiceGame) {
      dispatch(fetchServiceGame(router)).finally(() => setLoading(false));
    } else {
      setLoading(false);
      setFilteredServices(serviceGame);
    }
  }, [serviceGame]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = serviceGame.filter((service) =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    });
    if (!result.isConfirmed) {
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `${api_url.serviceGame}${id}`;
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      Swal.fire({
        title: "Berhasil!",
        text: "Service berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        dispatch(removeServiceGame(id));
      });
    } else {
      if (response.status === 403 || response.status === 401) {
        Swal.fire("Error", "Sesi telah habis. Silakan login kembali.", "error");
        Cookies.remove("token");
        router.push("/auth/login");
        return;
      }
      Swal.fire("Error", "Gagal menghapus service.", "error");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk mendapatkan range halaman
  const getPageRange = () => {
    const range = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Daftar Service Game</h2>
      <div className="mb-2 flex flex-col md:flex-row justify-between">
        <button
          onClick={() => router.push("/admin/master/service-game/create")}
          className="mb-2 md:mb-0 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          <i className="fa fa-plus mr-2"></i>
          Tambah Service
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari berdasarkan nama"
          className="px-4 py-2 rounded-md shadow border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama Service</th>
              <th className="px-4 py-2">Aksi</th>
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
            ) : currentServices.length > 0 ? (
              currentServices.map((service, index) => (
                <tr key={service.id}>
                  <td className="border px-4 py-2 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {service.name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        router.push(`/admin/master/service-game/${service.id}`)
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                    >
                      <i className="fa fa-edit mr-2"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 ml-2"
                    >
                      <i className="fa fa-trash mr-2"></i>
                      Hapus
                    </button>
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
      {/* Pagination */}
      <div className="flex justify-end mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        {getPageRange().map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-4 py-2 mx-1 rounded-md shadow ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
