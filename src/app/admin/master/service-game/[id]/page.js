"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api_url from "@/api_url";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { updateServiceGame } from "@/redux/slice/serviceGameSlice";
import { ButtonSave, ButtonCancel } from "@/component/button";
import { Input } from "@/component/input";

export default function EditServiceGamePage() {
  const [serviceData, setServiceData] = useState({
    id: "",
    name_eng: "",
    name_ind: "",
  });

  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");

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
        setPreviewImage(data.image || "");
        setPreviewIcon(data.icon || "");
      } else {
        Swal.fire("Error", "Gagal mengambil data service.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIcon(file);
    if (file) {
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name_eng", serviceData.name_eng);
    formData.append("name_ind", serviceData.name_ind);
    if (image) formData.append("image", image);
    if (icon) formData.append("icon", icon);

    try {
      const response = await fetch(`${api_url.serviceGame}${serviceData.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Jangan set Content-Type untuk FormData
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateServiceGame(data.data));
        Swal.fire({
          title: "Berhasil!",
          text: data.message["ind"],
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#4F46E5",
        }).then(() => {
          router.push("/admin/master/service-game");
        });
      } else {
        if (response.status === 401 || response.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Sesi telah habis. Silakan login kembali.",
            confirmButtonColor: "#dc3545",
          });
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
        title: "Error",
        text: "Terjadi kesalahan saat mengupdate data.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#4F46E5",
      });
    }
  };

  const handleBack = () => {
    router.push("/admin/master/service-game");
  };

  return (
    <div className="grid grid-cols-1 rounded-xl bg-white dark:bg-darkblack-600 xl:grid-cols-12">
      <div className="tab-content col-span-12 px-10 py-8">
        <h3 className="border-b border-bgray-200 pb-5 text-2xl font-bold text-bgray-900 dark:border-darkblack-400 dark:text-white">
          Ubah Service Game
        </h3>
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6">
          {/* Nama Inggris */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
              Nama Inggris
            </label>
            <Input
              type="text"
              handle={handleInputChange}
              value={serviceData.name_eng}
              placeholder="Nama Inggris"
              name="name_eng"
              required={true}
            />
          </div>

          {/* Nama Indonesia */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
              Nama Indonesia
            </label>
            <Input
              type="text"
              handle={handleInputChange}
              value={serviceData.name_ind}
              placeholder="Nama Indonesia"
              name="name_ind"
              required={true}
            />
          </div>

          {/* Image */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
              Gambar
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview Gambar"
                className="h-24 w-24 rounded border object-contain"
              />
            )}
            <Input
              type="file"
              handle={handleImageChange}
              value={serviceData.image}
              placeholder="Gambar"
              name="image"
              required={false}
              accept="image/*"
            />
          </div>

          {/* Icon */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
              Icon
            </label>
            {previewIcon && (
              <img
                src={previewIcon}
                alt="Preview Icon"
                className="h-16 w-16 rounded border object-contain"
              />
            )}
            <Input
              type="file"
              handle={handleIconChange}
              value={serviceData.icon}
              placeholder="Icon"
              name="icon"
              required={false}
              accept="image/*"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-6">
            <ButtonSave title="Simpan" className="mt-6" />
            <ButtonCancel
              title="Kembali"
              handle={handleBack}
              className="mt-6"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
