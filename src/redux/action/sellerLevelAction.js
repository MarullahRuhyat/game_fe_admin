import api_url from "@/api_url";
import { setSellerLevel } from "@/redux/slice/sellerLevelSlice";
import { m } from "framer-motion";
import Cookies from "js-cookie";

export const fetchSellerLevel = (router) => async (dispatch) => {
  //   get token from cookie
  const token = Cookies.get("token");

  if (!token) {
    router.push("/auth/login");
    return;
  }

  const url = `${api_url.sellerLevel}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  console.log("Response data:", data);
  if (response.ok) {
    dispatch(setSellerLevel(data));
  } else {
    if (response.status == 403 || response.status == 401) {
      // remove cokie
      Cookies.remove("token");
      //   router.push("/auth/login");
    }
  }
};
