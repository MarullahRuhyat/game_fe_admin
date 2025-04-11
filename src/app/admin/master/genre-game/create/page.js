"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api_url from "@/api_url";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { addGenreGame } from "@/redux/slice/genreGameSlice";
import { ButtonSave, ButtonCancel } from "@/component/button";
import { Input } from "@/component/input";

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
        dispatch(addGenreGame(data.data));
        Swal.fire({
          title: "Berhasil!",
          text: data.message["ind"],
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#4F46E5",
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
        Swal.fire({
          title: "Gagal!",
          text: data.message["ind"],
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#4F46E5",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghubungi server.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#4F46E5",
      });
    }
  };

  const handleBack = () => {
    router.push("/admin/master/genre-game");
  };

  return (
    <div className="grid grid-cols-1 rounded-xl bg-white dark:bg-darkblack-600 xl:grid-cols-12">
      <div className="tab-content col-span-12 px-10 py-8">
        <div className="">
          <div className="">
            <h3 className="border-b border-bgray-200 pb-5 text-2xl font-bold text-bgray-900 dark:border-darkblack-400 dark:text-white">
              Tambah Genre Game
            </h3>
            <div className="mt-8">
              <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 ">
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Nama Genre
                    </label>
                    <Input
                      type={"text"}
                      handle={handleInputChange}
                      value={genreData.name}
                      placeholder={"name"}
                      name="name"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Deskripsi
                    </label>
                    <Input
                      type={"text"}
                      handle={handleInputChange}
                      value={genreData.description}
                      placeholder={"description"}
                      name="description"
                      required={true}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <ButtonSave title={"Simpan"} className="mt-6" />
                  <ButtonCancel
                    title={"Kembali"}
                    handle={handleBack}
                    className="mt-6"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
