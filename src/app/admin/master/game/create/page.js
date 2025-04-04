"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import api_url from "@/api_url";
import { fetchGenreGame } from "@/redux/action/genreGameAction";
import { fetchServiceGame } from "@/redux/action/serviceGameAction";
import { addGame } from "@/redux/slice/gameSlice";

export default function CreateGamePage() {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    release_date: "",
    game_services: [],
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { genreGame, isFetchGenre } = useSelector((state) => state.genreGame);
  const { serviceGame, isFecthService } = useSelector(
    (state) => state.serviceGame
  );

  useEffect(() => {
    if (!isFetchGenre) {
      dispatch(fetchGenreGame());
    }
    if (!isFecthService) {
      dispatch(fetchServiceGame());
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    // sevice by value
    const service = serviceGame.find((item) => item.name === value);
    setFormData((prev) => {
      const updatedServices = checked
        ? [...prev.game_services, service]
        : prev.game_services.filter((item) => item !== service);
      return {
        ...prev,
        game_services: updatedServices,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const res = await fetch(api_url.game, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(addGame(data));
        Swal.fire("Berhasil!", "Game berhasil ditambahkan.", "success").then(
          () => {
            router.push("/admin/master/game");
          }
        );
      } else {
        Swal.fire("Gagal", "Gagal menambahkan game.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleBack = () => {
    router.push("/admin/master/game");
  };

  console.log("formData", formData);

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Tambah Game Baru</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nama Game</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded bg-white"
          >
            <option value="">Pilih Genre</option>
            {genreGame.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tanggal Rilis</label>
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Game Services</label>
          <div className="flex flex-wrap gap-3">
            {serviceGame.map((service) => (
              <label key={service.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={service.name}
                  checked={formData.game_services.includes(service)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {service.name}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="py-2 px-6 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
