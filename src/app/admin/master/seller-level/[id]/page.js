"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api_url from "@/api_url";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { updateSellerLevel } from "@/redux/slice/sellerLevelSlice";
import { useParams } from "next/navigation";
import { ButtonSave, ButtonCancel } from "@/component/button";
import { Input } from "@/component/input";

export default function EditLevelPage() {
  const [levelData, setLevelData] = useState({
    id: "",
    name: "",
    color: "",
    profit_margin: "",
  });

  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchlevelData(id);
    }
  }, [id]);

  const fetchlevelData = async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    try {
      const response = await fetch(`${api_url.sellerLevel}${id}`, {
        method: "GET",
        headers: myHeaders,
      });
      const data = await response.json();

      if (response.ok) {
        setLevelData({
          id: data.id,
          name: data.name,
          color: data.color,
          profit_margin: data.profit_margin,
        });
      } else {
        Swal.fire("Error", "Gagal mengambil data level.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLevelData({
      ...levelData,
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
        name: levelData.name,
        color: levelData.color,
        profit_margin: levelData.profit_margin,
      }),
    };

    try {
      const response = await fetch(
        `${api_url.sellerLevel}${levelData.id}/`,
        requestOptions
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(updateSellerLevel(data.data));
        Swal.fire({
          title: "Berhasil!",
          text: data.message["ind"],
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#4F46E5",
        }).then(() => {
          router.push("/admin/master/seller-level");
        });
      } else {
        if (response.status === 403 || response.status === 401) {
          Swal.fire({
            title: "Error",
            text: "Sesi telah berakhir. Silakan masuk kembali.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#4F46E5",
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
        text: "Terjadi kesalahan.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#4F46E5",
      });
    }
  };

  const handleBack = () => {
    router.push("/admin/master/seller-level");
  };

  return (
    <div className="grid grid-cols-1 rounded-xl bg-white dark:bg-darkblack-600 xl:grid-cols-12">
      <div className="tab-content col-span-12 px-10 py-8">
        <div className="">
          <div className="">
            <h3 className="border-b border-bgray-200 pb-5 text-2xl font-bold text-bgray-900 dark:border-darkblack-400 dark:text-white">
              Ubah Level Penjual
            </h3>
            <div className="mt-8">
              <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 ">
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Nama
                    </label>
                    <Input
                      type={"text"}
                      handle={handleInputChange}
                      value={levelData.name}
                      placeholder={"name"}
                      name="name"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Color
                    </label>
                    <Input
                      type={"text"}
                      handle={handleInputChange}
                      value={levelData.color}
                      placeholder={"color"}
                      name="color"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Margin
                    </label>
                    <Input
                      type={"text"}
                      handle={handleInputChange}
                      value={levelData.profit_margin}
                      placeholder={"profit_margin"}
                      name="profit_margin"
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
