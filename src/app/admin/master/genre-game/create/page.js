"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api_url from "@/api_url";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { addGenreGame } from "@/redux/slice/genreGameSlice";

export default function CreateGenrePage() {
  const [genreData, setGenreData] = useState({
    name: "",
    description: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGenreData({
      ...genreData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!token) {
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(genreData),
      redirect: "follow",
    };

    try {
      const response = await fetch(api_url.genreGame, requestOptions);
      const data = await response.json();

      if (response.ok) {
        dispatch(addGenreGame(data));
        Swal.fire({
          title: "Berhasil!",
          text: "Genre berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/admin/master/genre-game");
        });
      } else {
        if (response.status === 403 || response.status === 401) {
          Swal.fire(
            "Error",
            "Sesi telah berakhir. Silakan masuk kembali.",
            "error"
          );
          Cookies.remove("token");
          router.push("/auth/login");
          return;
        }
        Swal.fire("Error", "Genre gagal ditambahkan.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleBack = () => {
    router.push("/admin/master/genre-game");
  };

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Buat Genre Baru</h1>
      <form onSubmit={handleSubmit} className="bg-white">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Genre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={genreData.name}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            value={genreData.description}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="mb-4 flex justify-start gap-2">
          <button
            type="submit"
            className="ml-2 py-2 px-6 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="py-2 px-6 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
