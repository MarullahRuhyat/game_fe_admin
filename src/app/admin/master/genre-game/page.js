"use client";

import api_url from "@/api_url";
import { fetchGenreGame } from "@/redux/action/genreGameAction";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { removeGenreGame } from "@/redux/slice/genreGameSlice";
import { ButtonAdd, ButtonDelete, ButtonEdit } from "@/component/button";
import { Input } from "@/component/input";

export default function GenrePage() {
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const router = useRouter();
  const dispatch = useDispatch();

  const genreGame = useSelector((state) => state.genreGame.genreGame);
  const isFetchGenreGame = useSelector(
    (state) => state.genreGame.isFetchGenreGame
  );
  useEffect(() => {
    if (!isFetchGenreGame) {
      dispatch(fetchGenreGame(router)).finally(() => setLoading(false));
    } else {
      if (genreGame.length > 0) {
        const lastPage = Math.ceil(genreGame.length / itemsPerPage);
        if (currentPage > lastPage) {
          setCurrentPage(lastPage);
        }
      }
      setLoading(false);
      setFilteredGenres(genreGame);
    }
  }, [genreGame]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = genreGame.filter((genre) =>
      genre.name.toLowerCase().includes(query)
    );
    setFilteredGenres(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    // swal konfirmasi
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
    const url = `${api_url.genreGame}${id}`;
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        title: "Berhasil!",
        text: data.message["ind"],
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4F46E5",
      }).then(() => {
        dispatch(removeGenreGame(id));
      });
    } else {
      if (response.status === 403 || response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Sesi telah habis. Silakan login kembali.",
          confirmButtonColor: "#dc3545",
        });

        Cookies.remove("token");
        router.push("/auth/login");
        return;
      }
      Swal.fire({
        title: "Gagal!",
        text: "Genre gagal dihapus",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#4F46E5",
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentGenres = filteredGenres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGenres.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleAddGenre = () => {
    router.push("/admin/master/genre-game/create");
  };

  const handleEditGenre = (id) => {
    router.push(`/admin/master/genre-game/${id}`);
  };

  const listHeaderTable = ["No", "Nama Genre", "Deskripsi", "Aksi"];

  return (
    <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
          <div className="flex flex-col space-y-10 md:space-y-5">
            <div className="filter-content w-full">
              <div className="w-full">
                <div className="relative space-y-5 md:space-y-0 h-[56px] w-full flex flex-col md:flex-row  md:items-center md:justify-between">
                  {/* button tambah */}
                  <ButtonAdd title="Tambah Genre" handle={handleAddGenre} />
                  <Input
                    type="text"
                    placeholder="Cari berdasarkan nama"
                    value={searchQuery}
                    handle={handleSearch}
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
                        Memuat genre...
                      </td>
                    </tr>
                  ) : currentGenres.length > 0 ? (
                    currentGenres.map((genre, index) => (
                      <tr
                        key={genre.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {indexOfFirstItem + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {genre.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {genre.description}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center items-center space-x-2">
                            <ButtonEdit
                              id={genre.id}
                              handle={handleEditGenre}
                            />

                            <ButtonDelete id={genre.id} handle={handleDelete} />
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
                        Genre tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pagination-content w-full">
              <div className="flex w-full items-center justify-end">
                <div className="flex items-center ">
                  {currentPage > 1 && (
                    <button
                      style={{ margin: "3px" }}
                      type="button"
                      onClick={() => paginate(currentPage - 1)}
                      className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-50  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
                    >
                      <span>Sebelumnya</span>
                    </button>
                  )}
                  <div className="flex items-center">
                    {getPageRange().map((page) => (
                      <button
                        style={{
                          margin: "1px",
                        }}
                        key={page}
                        onClick={() => paginate(page)}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out ${
                          currentPage === page
                            ? "bg-purple-300 text-white  lg:px-6 lg:py-2.5 lg:text-sm"
                            : "text-purple-300 bg-gray-50  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  {currentPage < totalPages && (
                    <button
                      style={{ margin: "3px" }}
                      onClick={() => paginate(currentPage + 1)}
                      className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-50  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
                    >
                      Selanjutnya
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
