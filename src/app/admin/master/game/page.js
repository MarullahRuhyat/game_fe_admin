"use client";

import api_url from "@/api_url";
import { fetchGame } from "@/redux/action/gameAction";
import { fetchGenreGame } from "@/redux/action/genreGameAction";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { removeGame } from "@/redux/slice/gameSlice";
import "font-awesome/css/font-awesome.min.css";

export default function GamePage() {
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const itemsPerPage = 5;

  const router = useRouter();
  const dispatch = useDispatch();

  const { games, isFetchGame } = useSelector((state) => state.game);
  const { genreGame, isFetchGenreGame } = useSelector(
    (state) => state.genreGame
  );

  useEffect(() => {
    if (!isFetchGame) {
      dispatch(fetchGame());
    }
    if (!isFetchGenreGame) {
      dispatch(fetchGenreGame());
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    let filtered = games;

    if (searchQuery) {
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(
        (game) => game.genre.id === parseInt(selectedGenre)
      );
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, games]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterGenre = (e) => {
    setSelectedGenre(e.target.value);
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

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${api_url.game}${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        Swal.fire("Berhasil!", "Game berhasil dihapus.", "success");
        dispatch(removeGame(id));
      } else {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus game.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Game</h2>

      <div className="mb-2 flex flex-col md:flex-row justify-between gap-2">
        <button
          onClick={() => router.push("/admin/master/game/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          <i className="fa fa-plus mr-2"></i> Tambah Game
        </button>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari berdasarkan nama"
            className="px-4 py-2 rounded-md shadow border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />

          <select
            value={selectedGenre}
            onChange={handleFilterGenre}
            className="px-4 py-2 rounded-md shadow border bg-white border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Semua Genre</option>
            {genreGame.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama Game</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">Tanggal Rilis</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 font-semibold py-4"
                >
                  Memuat game...
                </td>
              </tr>
            ) : currentGames.length > 0 ? (
              currentGames.map((game, index) => (
                <tr key={game.id}>
                  <td className="border px-4 py-2 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border px-4 py-2 text-center">{game.name}</td>
                  <td className="border px-4 py-2 text-center">
                    {game.genre.name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {game.release_date || "-"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        router.push(`/admin/master/game/${game.id}`)
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                    >
                      <i className="fa fa-edit mr-2"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 ml-2"
                    >
                      <i className="fa fa-trash mr-2"></i> Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 font-semibold py-4"
                >
                  Game tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
