import api_url from "@/api_url";
import { setServiceGame } from "../slice/serviceGameSlice";
import Cookies from "js-cookie";

export const fetchServiceGame = (router) => async (dispatch) => {
  // Get token from cookie
  const token = Cookies.get("token");

  if (!token) {
    router.push("/auth/login");
    return;
  }

  const url = `${api_url.serviceGame}`;
  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log("Response data:", data);

  if (response.ok) {
    dispatch(setServiceGame(data));
  } else {
    if (response.status === 403 || response.status === 401) {
      // Remove cookie
      Cookies.remove("token");
      router.push("/auth/login");
    }
  }
};
