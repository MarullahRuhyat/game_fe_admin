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
import { ButtonSave, ButtonCancel } from "@/component/button";
import { Input, InputSelect } from "@/component/input";
import { store } from "@/redux/store";

export default function EditGamePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");

  const { genreGame, isFetchGenreGame } = useSelector(
    (state) => state.genreGame
  );
  const { serviceGame, isFetchServiceGame } = useSelector(
    (state) => state.serviceGame
  );
  const [parent, setParent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    game_services: [],
    sensitif_game: 0,
    popular: 0,
    image: null,
    store_game: 0,
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
            store_game: data.isStoreGame ? 1 : 0,
          });
          setPreviewImage(data.image);
          if (data.parent_game) {
            setParent(data.parent_game);
          }
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
    formDataFile.append("isStoreGame", formData.store_game);
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
        Swal.fire({
          title: "Berhasil",
          text: "Game berhasil diubah.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            if (parent) {
              router.push(`/admin/master/game/${parent}/game`);
              return;
            }
            router.push("/admin/master/game");
          }
        });
      } else {
        Swal.fire("Gagal", "Gagal mengupdate game.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    setPreviewImage(URL.createObjectURL(file));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSensitifChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sensitif_game: checked ? "1" : "0",
    }));
  };
  const handlePopularChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      popular: checked ? "1" : "0",
    }));
  };

  const handleStoreChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      store_game: checked ? "1" : "0",
    }));
  };

  const handleBack = () => {
    if (parent) {
      router.push(`/admin/master/game/${parent}/game`);
      return;
    }
    router.push("/admin/master/game");
  };

  return (
    <div className="grid grid-cols-1 rounded-xl bg-white dark:bg-darkblack-600 xl:grid-cols-12">
      <div className="tab-content col-span-12 px-10 py-8">
        <div className="">
          <div className="">
            <h3 className="border-b border-bgray-200 pb-5 text-2xl font-bold text-bgray-900 dark:border-darkblack-400 dark:text-white">
              Ubah Game
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
                      required
                      placeholder="Pilih genre"
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
                        className="h-16 w-16 rounded border object-contain"
                      />
                    )}
                    <Input
                      type="file"
                      name="image"
                      handle={handleInputFile}
                      accept="image/*"
                      placeholder="Pilih gambar"
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
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Sensitif Game
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center text-black dark:text-white">
                        <input
                          type="checkbox"
                          value="1"
                          checked={formData.sensitif_game === 1}
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
                          checked={formData.popular === 1}
                          onChange={handlePopularChange}
                          className="mr-2"
                        />
                        Populer
                      </label>
                    </div>
                  </div>
                  <div
                    className={`flex flex-col gap-2 ${parent ? "hidden" : ""}`}
                  >
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Store Game
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center text-black dark:text-white">
                        <input
                          type="checkbox"
                          value="1"
                          checked={formData.store_game === 1}
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
