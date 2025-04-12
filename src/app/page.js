"use client"; // Ensure this is treated as a client-side component

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
    }
    const checkToken = async () => {
      try {
        const response = await fetch(api_url.checkToken, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Token expired");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Sesi telah habis. Silakan login kembali.",
          confirmButtonColor: "#dc3545",
        });

        Cookies.remove("token");
        router.push("/auth/login");
      }
    };
    checkToken();
  }, [router]);
}
