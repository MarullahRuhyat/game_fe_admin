import api_url from "@/api_url";
import { setGenreGame } from "../slice/genreGameSlice";
import Cookies from "js-cookie";

export const fetchGenreGame = (router) => async (dispatch) => {
  //   get token from cookie
  const token = Cookies.get("token");

  if (!token) {
    router.push("/auth/login");
    return;
  }

  const url = `${api_url.genreGame}`;
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
    dispatch(setGenreGame(data));
  } else {
    if (response.status == 403 || response.status == 401) {
      // remove cokie
      Cookies.remove("token");
      router.push("/auth/login");
    }
  }
};
