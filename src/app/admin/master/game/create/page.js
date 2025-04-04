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
    game_services: [],
    sensitif_game: 0,
    popular: 0,
    image: "",
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
    console.log("value", value);
    console.log("serviceGame", serviceGame);

    // sevice by value
    const service = serviceGame.find((item) => item.id == value);
    console.log("service", service);
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

  const handleSensitifChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sensitif_game: checked ? value : 0,
    }));
  };

  const handlePopularChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      popular: checked ? value : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    // cek service game jika [] kosong
    if (formData.game_services.length === 0) {
      Swal.fire("Gagal", "Pilih minimal satu service game.", "error");
      return;
    }
    // handle file

    // confert to string game_services

    const formDataFile = new FormData();
    formDataFile.append("name", formData.name);
    formDataFile.append("genre", formData.genre);
    formDataFile.append(
      "game_services",
      JSON.stringify(formData.game_services)
    );
    formDataFile.append("sensitif_game", formData.sensitif_game);
    formDataFile.append("popular", formData.popular);
    formDataFile.append("image", formData.image);
    console.log("formDataFile", formDataFile);

    try {
      const res = await fetch(api_url.game, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataFile,
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(addGame(data.data));
        Swal.fire("Berhasil!", data.message["ind"], "success").then(() => {
          router.push("/admin/master/game");
        });
      } else if (res.status === 403 || res.status === 401) {
        Swal.fire(
          "Error",
          "Sesi telah berakhir. Silakan masuk kembali.",
          "error"
        );
        Cookies.remove("token");
        router.push("/auth/login");
        return;
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
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: e.target.files[0],
              }))
            }
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Service Game </label>
          <div className="flex flex-wrap gap-3">
            {serviceGame.map((service) => (
              <label key={service.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={service.id}
                  checked={formData.game_services.includes(service)}
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
          <div className="flex flex-wrap gap-3">
            <label key="sensitif_game" className="inline-flex items-center">
              <input
                type="checkbox"
                value="1"
                checked={formData.sensitif_game === "1"}
                onChange={handleSensitifChange}
                className="mr-2"
              />
              Sensitif
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium"> Populer Game</label>
          <div className="flex flex-wrap gap-3">
            <label key="popular" className="inline-flex items-center">
              <input
                type="checkbox"
                value="1"
                checked={formData.popular === "1"}
                onChange={handlePopularChange}
                className="mr-2"
              />
              Populer
            </label>
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
