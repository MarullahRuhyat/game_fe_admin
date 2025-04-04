"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api_url from "@/api_url";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { updateServiceGame } from "@/redux/slice/serviceGameSlice";
import { useParams } from "next/navigation";

export default function EditServiceGamePage() {
  const [serviceData, setServiceData] = useState({
    id: "",
    name_eng: "",
    name_ind: "",
  });

  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchServiceData(id);
    }
  }, [id]);

  const fetchServiceData = async (id) => {
    try {
      const response = await fetch(`${api_url.serviceGame}${id}`);
      const data = await response.json();

      if (response.ok) {
        setServiceData({
          id: data.id,
          name_eng: data.name_eng,
          name_ind: data.name_ind,
        });
      } else {
        Swal.fire("Error", "Gagal mengambil data service.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleInputChangeEng = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleInputChangeInd = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
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
        name_eng: serviceData.name_eng,
        name_ind: serviceData.name_ind,
      }),
    };

    try {
      const response = await fetch(
        `${api_url.serviceGame}${serviceData.id}/`,
        requestOptions
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(updateServiceGame(data.data));
        Swal.fire({
          title: "Berhasil!",
          text: data.message["ind"],
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/admin/master/service-game");
        });
      } else {
        if (response.status === 403 || response.status === 401) {
          Swal.fire(
            "Error",
            "Sesi telah habis. Silakan login kembali.",
            "error"
          );
          Cookies.remove("token");
          router.push("/auth/login");
          return;
        }
        Swal.fire("Error", "Gagal memperbarui service.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleBack = () => {
    router.push("/admin/master/service-game");
  };

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Edit Service</h1>
      <form onSubmit={handleSubmit} className="bg-white">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Inggris
          </label>
          <input
            type="text"
            id="name_eng"
            name="name_eng"
            value={serviceData.name_eng}
            onChange={handleInputChangeEng}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Inggris
          </label>
          <input
            type="text"
            id="name_ind"
            name="name_ind"
            value={serviceData.name_ind}
            onChange={handleInputChangeInd}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            required
          />
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
