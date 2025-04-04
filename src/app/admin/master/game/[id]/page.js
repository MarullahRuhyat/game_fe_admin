"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import api_url from "@/api_url";
import { fetchGenreGame } from "@/redux/action/genreGameAction";
import { fetchServiceGame } from "@/redux/action/serviceGameAction";
import { updateGame } from "@/redux/slice/gameSlice";

export default function EditGamePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { genreGame, isFetchGenreGame } = useSelector(
    (state) => state.genreGame
  );
  const { serviceGame, isFetchServiceGame } = useSelector(
    (state) => state.serviceGame
  );

  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    game_services: [],
    sensitif_game: 0,
    popular: 0,
    image: null,
  });

  useEffect(() => {
    // Ambil data game berdasarkan ID
    const fetchGame = async () => {
      try {
        const res = await fetch(`${api_url.game}${id}`);
        const data = await res.json();
        console.log("data", data);

        if (res.ok) {
          setFormData({
            name: data.name,
            genre: data.genre.id,
            game_services: data.game_services || [],
            sensitif_game: data.sensitif_game ? 1 : 0,
            popular: data.popular ? 1 : 0,
            image: null, // Tidak menampilkan gambar lama
          });
        } else {
          Swal.fire("Error", "Gagal mengambil data game.", "error");
          router.push("/admin/master/game");
        }
      } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan.", "error");
      }
    };

    fetchGame();
    if (!isFetchGenreGame) {
      dispatch(fetchGenreGame());
    }
    if (!isFetchServiceGame) {
      dispatch(fetchServiceGame());
    }
  }, [id, dispatch, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const service = serviceGame.find((item) => item.id == value);
    setFormData((prev) => {
      const updatedServices = checked
        ? [...prev.game_services, service]
        : prev.game_services.filter((item) => item.id !== service.id);
      return { ...prev, game_services: updatedServices };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (formData.game_services.length === 0) {
      Swal.fire("Gagal", "Pilih minimal satu service game.", "error");
      return;
    }

    const formDataFile = new FormData();
    formDataFile.append("name", formData.name);
    formDataFile.append("genre", formData.genre);
    formDataFile.append(
      "game_services",
      JSON.stringify(formData.game_services)
    );
    formDataFile.append("sensitif_game", formData.sensitif_game);
    formDataFile.append("popular", formData.popular);
    if (formData.image) formDataFile.append("image", formData.image);

    try {
      const res = await fetch(`${api_url.game}${id}/`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataFile,
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(updateGame(data.data));
        Swal.fire("Berhasil!", data.message["ind"], "success").then(() => {
          router.push("/admin/master/game");
        });
      } else {
        Swal.fire("Gagal", "Gagal mengupdate game.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
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
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className="w-full p-3 border border-gray-300 rounded"
          />
          {formData.image && (
            <p className="text-gray-500 text-sm mt-1">
              Gambar akan diperbarui.
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Service Game </label>
          <div className="flex flex-wrap gap-3">
            {serviceGame.map((service) => (
              <label key={service.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={service.id}
                  checked={formData.game_services.some(
                    (s) => s.id === service.id
                  )}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {service.name_eng}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Sensitif Game</label>
          <input
            type="checkbox"
            value="1"
            checked={formData.sensitif_game === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                sensitif_game: e.target.checked ? 1 : 0,
              }))
            }
            className="mr-2"
          />
          Sensitif
        </div>

        <div>
          <label className="block mb-1 font-medium"> Populer Game</label>
          <input
            type="checkbox"
            value="1"
            checked={formData.popular === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                popular: e.target.checked ? 1 : 0,
              }))
            }
            className="mr-2"
          />
          Populer
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
            onClick={() => router.push("/admin/master/game")}
            className="py-2 px-6 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
