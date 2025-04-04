"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import api_url from "@/api_url";
import { fetchGenreGame } from "@/redux/action/genreGameAction";
import { fetchServiceGame } from "@/redux/action/serviceGameAction";
import { updateGame } from "@/redux/slice/gameSlice";

export default function EditGamePage() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    genre: "",
    release_date: "",
    game_services: [],
  });

  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { genreGameList } = useSelector((state) => state.genreGame);
  const { serviceList } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchGenreGame());
    dispatch(fetchServiceGame());
    if (id) fetchGame(id);
  }, [dispatch, id]);

  const fetchGame = async (id) => {
    try {
      const res = await fetch(`${api_url.game}${id}/`);
      const data = await res.json();

      if (res.ok) {
        setFormData({
          id: data.id,
          name: data.name,
          genre: data.genre,
          release_date: data.release_date || "",
          game_services: data.game_services || [],
        });
      } else {
        Swal.fire("Error", "Gagal mengambil data game", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedServices = checked
        ? [...prev.game_services, value]
        : prev.game_services.filter((item) => item !== value);
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
      const res = await fetch(`${api_url.game}${formData.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(updateGame(data));
        Swal.fire("Berhasil", "Game berhasil diperbarui.", "success").then(
          () => {
            router.push("/admin/master/game");
          }
        );
      } else {
        Swal.fire("Gagal", "Gagal memperbarui game.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleBack = () => {
    router.push("/admin/master/game");
  };

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Edit Game</h1>
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
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Pilih Genre</option>
            {genreGameList.map((genre) => (
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
            {serviceList.map((service) => (
              <label key={service.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={service.name}
                  checked={formData.game_services.includes(service.name)}
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
