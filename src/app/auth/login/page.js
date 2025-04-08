"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import LoadingScreen from "@/component/loadingComponent";

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
        });
        return;
      }
      if (data.user.role !== "admin") {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Anda tidak memiliki akses ke halaman ini",
        });
        return;
      }

      Cookies.set("token", data.access, { expires: 1, path: "/" });
      Swal.fire({
        icon: "success",
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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
