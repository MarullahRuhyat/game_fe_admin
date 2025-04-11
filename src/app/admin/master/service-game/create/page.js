"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api_url from "@/api_url";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { addServiceGame } from "@/redux/slice/serviceGameSlice";
import { ButtonSave, ButtonCancel } from "@/component/button";
import { Input } from "@/component/input";

export default function CreateServicePage() {
  const [serviceData, setServiceData] = useState({
    name_eng: "",
    name_ind: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChangeEng = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    serviceData[name] = value;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleInputChangeInd = (e) => {
    const { name, value } = e.target;
    serviceData[name] = value;
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

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(serviceData),
      redirect: "follow",
    };

    try {
      const response = await fetch(api_url.serviceGame, requestOptions);
      const data = await response.json();

      if (response.ok) {
        dispatch(addServiceGame(data.data));
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
        text: "Terjadi kesalahan saat menghubungi server.",
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
        <div className="">
          <div className="">
            <h3 className="border-b border-bgray-200 pb-5 text-2xl font-bold text-bgray-900 dark:border-darkblack-400 dark:text-white">
              Tambah Service Game
            </h3>
            <div className="mt-8">
              <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 ">
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Nama Inggris
                    </label>
                    <Input
                      type={"text"}
                      handle={handleInputChangeEng}
                      value={serviceData.name_eng}
                      placeholder={"name_eng"}
                      name="name_eng"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                      Nama Indonesia
                    </label>
                    <Input
                      type={"text"}
                      handle={handleInputChangeInd}
                      value={serviceData.name_ind}
                      placeholder={"name_ind"}
                      name="name_ind"
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
