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
import { ButtonAdd, ButtonEdit, ButtonDelete } from "@/component/button";
import { Input } from "@/component/input";
import Image from "next/image";

export default function GamePage() {
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const itemsPerPage = 10;

  const router = useRouter();
  const dispatch = useDispatch();

  const { games, isFetchGame } = useSelector((state) => state.game);
  const { genreGame, isFetchGenreGame } = useSelector(
    (state) => state.genreGame
  );

  const tabs = [
    { id: 1, title: "Semua" },
    { id: 2, title: "Sensitif" },
    { id: 3, title: "Populer" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    if (!isFetchGame) {
      dispatch(fetchGame(router));
    }
    if (!isFetchGenreGame) {
      dispatch(fetchGenreGame());
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    let filtered = games;
    if (games.length > 0) {
      const lastPage = Math.ceil(games.length / itemsPerPage);
      if (currentPage > lastPage) {
        setCurrentPage(lastPage);
      }
    }

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

    if (activeTab === 2) {
      filtered = filtered.filter((game) => game.sensitif_game);
    } else if (activeTab === 3) {
      filtered = filtered.filter((game) => game.popular);
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, games, activeTab]);

  const handleSearch = async (e) => {
    // filter juga dengan active tab
    const query = e.target.value.toLowerCase();
    await setSearchQuery(query);
  };

  const handleFilterGenre = (e) => {
    // filter juga dengan active tab
    const genreId = e.target.value;
    setSelectedGenre(genreId);
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

  const handleActiveTab = (tabId) => {
    setActiveTab(tabId);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleAddGame = () => {
    router.push("/admin/master/game/create");
  };
  const handleEditGame = (id) => {
    router.push(`/admin/master/game/${id}`);
  };

  const listHeaderTable = [
    "No",
    "Nama Game",
    "Genre",
    "Sensitif Game",
    "Populer Game",
    "Image",
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
                  <ButtonAdd handle={handleAddGame} title="Tambah Game" />
                  <Input
                    type="text"
                    placeholder="Cari berdasarkan nama"
                    value={searchQuery}
                    handle={handleSearch}
                    name="search"
                  />
                </div>
              </div>
            </div>
            <div className="table-content w-full overflow-x-auto ">
              <div className="flex text-lg mb-4">
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
                        Memuat game...
                      </td>
                    </tr>
                  ) : currentGames.length > 0 ? (
                    currentGames.map((game, index) => (
                      <tr
                        key={game.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {indexOfFirstItem + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {game.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {game.genre.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          {game.sensitif_game ? (
                            <span className="text-white text-[15px] font-semibold bg-red-700 p-1 rounded-lg">
                              Sensitif
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          {game.popular ? (
                            <span className="text-white text-[15px] font-semibold bg-green-700 p-1 rounded-lg">
                              Populer
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-5 xl:px-0 flex items-center justify-center">
                          {game.image ? (
                            <Image
                              width={100}
                              height={100}
                              src={game.image}
                              alt={game.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center items-center space-x-2">
                            <ButtonEdit
                              handle={() => handleEditGame(game.id)}
                            />
                            <ButtonDelete
                              handle={() => handleDelete(game.id)}
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
                        Game tidak ditemukan
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
                      className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-200  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
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
                            ? "bg-purple-500 text-white  lg:px-6 lg:py-2.5 lg:text-sm"
                            : "text-purple-300 bg-gray-200  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm"
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
                      className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-200   hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
                    >
                      Selanjutnyas
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
