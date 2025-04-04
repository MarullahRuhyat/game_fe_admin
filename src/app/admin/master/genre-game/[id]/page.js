"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api_url from "@/api_url";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { updateGenreGame } from "@/redux/slice/genreGameSlice";
import { useParams } from "next/navigation";

export default function EditGenrePage() {
  const [genreData, setGenreData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchGenreData(id);
    }
  }, [id]);

  const fetchGenreData = async (id) => {
    try {
      const response = await fetch(`${api_url.genreGame}${id}`);
      const data = await response.json();

      if (response.ok) {
        setGenreData({
          id: data.id,
          name: data.name,
          description: data.description,
        });
      } else {
        Swal.fire("Error", "Gagal mengambil data genre.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

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

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: genreData.name,
        description: genreData.description,
      }),
    };

    try {
      const response = await fetch(
        `${api_url.genreGame}${genreData.id}/`,
        requestOptions
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(updateGenreGame(data.data));
        Swal.fire({
          title: "Berhasil!",
          text: data.message["ind"],
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
        Swal.fire("Error", "Gagal memperbarui genre.", "error");
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
      <h1 className="text-2xl font-bold mb-4">Edit Genre</h1>
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
