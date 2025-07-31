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
import { ButtonSave, ButtonCancel } from "@/component/button";
import { Input, InputSelect } from "@/component/input";

export default function CreateGamePage() {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    game_services: [],
    sensitif_game: 0,
    popular: 0,
    image: "",
    store_game: 0,
  });
  const [previewImage, setPreviewImage] = useState("");

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
    console.log("name", name);

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

  const handleStoreChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      store_game: checked ? value : 0,
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
    formDataFile.append("isStoreGame", formData.store_game);

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
        Swal.fire({
          title: "Berhasil!",
          text: data.message["ind"],
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/admin/master/game");
          }
        });
      } else if (res.status === 403 || res.status === 401) {
        Swal.fire({
          title: "Gagal",
          text: data.message["ind"],
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });

        Cookies.remove("token");
        router.push("/auth/login");
        return;
      } else {
        Swal.fire({
          title: "Gagal",
          text: data.message["ind"],
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Terjadi kesalahan saat mengirim data.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    }
  };

  const handleBack = () => {
    router.push("/admin/master/game");
  };

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  return (
    <div className="grid grid-cols-1 rounded-xl bg-white dark:bg-darkblack-600 xl:grid-cols-12">
      <div className="tab-content col-span-12 px-10 py-8">
        <div className="">
          <div className="">
            <h3 className="border-b border-bgray-200 pb-5 text-2xl font-bold text-bgray-900 dark:border-darkblack-400 dark:text-white">
              Tambah Game
            </h3>
            <div className="mt-8">
              <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 ">
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Nama Game
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      handle={handleChange}
                      required
                      placeholder="Masukkan nama game"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Genre
                    </label>
                    <InputSelect
                      name="genre"
                      value={formData.genre}
                      handle={handleChange}
                      placeholder="Pilih genre"
                      required={true}
                      options={genreGame.map((genre) => ({
                        value: genre.id,
                        label: genre.name,
                      }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Image
                    </label>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview Icon"
                        className="h-24 w-24 rounded border object-contain"
                      />
                    )}
                    <Input
                      type={"file"}
                      required={true}
                      accept={"image/*"}
                      handle={handleInputFile}
                      placeholder={"image"}
                      name="image"
                      value={formData.image}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Service Game
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {serviceGame.map((service) => (
                        <label
                          key={service.id}
                          className="inline-flex items-center text-black dark:text-white"
                        >
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
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Sensitif Game
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center text-black dark:text-white">
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
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Populer Game
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center text-black dark:text-white">
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
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Store Game
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center text-black dark:text-white">
                        <input
                          type="checkbox"
                          value="1"
                          checked={formData.store_game === "1"}
                          onChange={handleStoreChange}
                          className="mr-2"
                        />
                        Store
                      </label>
                    </div>
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
