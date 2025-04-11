import api_url from "@/api_url";
import { setGame } from "../slice/gameSlice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const fetchGame = (router) => async (dispatch) => {
  const token = Cookies.get("token");

  if (!token) {
    router.push("/auth/login");
    return;
  }

  try {
    const response = await fetch(api_url.game, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setGame(data));
    } else {
      if (response.status === 403 || response.status === 401) {
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
      Swal.fire("Error", "Gagal mengambil data game.", "error");
    }
  } catch (error) {
    Swal.fire("Error", "Terjadi kesalahan saat mengambil data game.", "error");
  }
};
