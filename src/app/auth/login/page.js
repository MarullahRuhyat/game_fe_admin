"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import LoadingScreen from "@/component/loadingComponent";
import { Input } from "@/component/input";
import Image from "next/image";
import { ButtonSave, ButtonCancel } from "@/component/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("checking"); // 🔥 Status: "checking" | "unauthenticated"

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setAuthStatus("authenticated");
      router.push("/admin");
    } else {
      setAuthStatus("unauthenticated");
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(api_url.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Login response", data);

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.message["indonesian"],
          confirmButtonColor: "#6f42c1",
        });
        return;
      }
      if (data.user.role !== "admin") {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Anda tidak memiliki akses ke halaman ini",
          confirmButtonColor: "#6f42c1",
        });
        return;
      }

      Cookies.set("token", data.access, { expires: 1, path: "/" });
      Swal.fire({
        icon: "success",
        confirmButtonColor: "#6f42c1",
        title: "Login Berhasil",
        text: "Selamat datang di admin panel",
      }).then(() => {
        router.push("/admin");
      });
    } catch (error) {
      console.log("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {authStatus === "checking" && <LoadingScreen />}
      {authStatus === "unauthenticated" && (
        <section className="bg-white dark:bg-darkblack-500">
          <div className="flex flex-col lg:flex-row justify-between min-h-screen">
            <div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
              <header>
                <Image
                  width={180}
                  height={100}
                  src="/template/assets/images/logo/logo-color.svg"
                  className="block dark:hidden"
                  alt="logo"
                />
                <Image
                  width={180}
                  height={100}
                  src="/template/assets/images/logo/logo-white.svg"
                  className="hidden dark:block"
                  alt="logo"
                />
              </header>
              <div className="max-w-[450px] m-auto pt-24 pb-16">
                <div className="relative mt-6 mb-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-darkblack-400"></div>
                  </div>
                </div>
                <form action="">
                  <div className="mb-6 relative">
                    <input
                      type="text"
                      className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-purple-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      autoFocus
                      name="email"
                    />
                  </div>
                  <div className="mb-6 relative">
                    <input
                      type="password"
                      className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-purple-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      name="password"
                      autoFocus
                    />
                  </div>
                  {loading ? (
                    <button
                      className="py-3.5 flex items-center justify-center text-white font-bold bg-purple-600 hover:bg-purple-600 transition-all rounded-lg w-full"
                      type="submit"
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      className="py-3.5 flex items-center justify-center text-white font-bold bg-purple-600 hover:bg-purple-600 transition-all rounded-lg w-full"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                  )}
                </form>
              </div>
            </div>
            <div className="lg:w-1/2 lg:block hidden bg-[#F6FAFF] dark:bg-darkblack-600 p-20 relative">
              <ul>
                <li className="absolute top-10 left-8">
                  <Image
                    src="/template/assets/images/shapes/square.svg"
                    alt=""
                    width={100}
                    height={100}
                  />
                </li>
                <li className="absolute right-12 top-14">
                  <Image
                    src="/template/assets/images/shapes/vline.svg"
                    alt=""
                    width={100}
                    height={100}
                  />
                </li>
                <li className="absolute bottom-7 left-8">
                  <Image
                    src="/template/assets/images/shapes/dotted.svg"
                    alt=""
                    width={100}
                    height={100}
                  />
                </li>
              </ul>
              <div>
                <Image
                  width={600}
                  height={600}
                  src="/template/assets/images/illustration/signin.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
