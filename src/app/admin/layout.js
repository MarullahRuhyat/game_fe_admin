"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "font-awesome/css/font-awesome.min.css";
import { useRouter } from "next/navigation"; // Use `next/navigation` instead for `router.push`.
import { useDispatch, useSelector } from "react-redux";
import api_url from "@/api_url";
import Cookies from "js-cookie";
import LoadingScreen from "@/component/loadingComponent";

export default function UserLayout({ children }) {
  const router = useRouter();

  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [isDropdownOpenTopbar, setIsDropdownOpenTopbar] = useState("");
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
      return;
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
        Cookies.remove("token");
        router.push("/auth/login");
      }
    };
    checkToken();
    setAuthStatus("authenticated");
  }, [router]);

  useEffect(() => {
    let pathurl = window.location.pathname;
    pathurl = pathurl.split("/");

    if (pathurl[2] == "master") {
      setPath(`/${pathurl[1]}/${pathurl[2]}/${pathurl[3]}`);
    } else {
      setPath(`/${pathurl[1]}/${pathurl[2]}`);
    }
    setIsDropdownOpen(pathurl[2]);
  }, []);

  const handleSetPath = (path) => {
    setPath(path);
    setShowSidebar(false);
  };

  const handleDropdown = (menu) => {
    if (isDropdownOpen == menu) {
      setIsDropdownOpen("");
      return;
    }
    setIsDropdownOpen(menu);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };

  return (
    <>
      {authStatus == "checking" ? (
        <LoadingScreen />
      ) : (
        <div className="overflow-x-hidden">
          <div
            className="flex h-screen bg-gradient-to-t from-purple-950 to-gray-900
 w-screen"
          >
            <section
              className={`w-[300px] h-screen text-white flex flex-col justify-between bg-gradient-to-t from-purple-950 to-gray-900
 transition-transform transform -translate-x-full lg:translate-x-0 lg:static fixed z-50 ${
   showSidebar ? "translate-x-0" : ""
 }`}
            >
              <div className="flex flex-col mx-2">
                <div className="py-6 px-4 text-center relative">
                  <div className="absolute right-1">
                    <button
                      className=" menu-btn ml-8 text-[30px] text-white focus:outline-none lg:hidden"
                      onClick={() => setShowSidebar(!showSidebar)}
                    >
                      <i className="fa fa-times "></i>
                    </button>
                  </div>
                  <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                </div>
                <ul className="flex z-50 flex-col space-y-3 font-semibold overflow-y-auto h-[calc(100vh-200px)] scrollbar-hide ">
                  <li>
                    <Link
                      href="/admin"
                      className={`flex items-center px-4 py-3 hover:bg-white hover:text-purple-700 rounded-lg transition-colors ${
                        path == "/admin" ? "bg-white text-purple-700" : ""
                      }`}
                      onClick={() => handleSetPath("/admin")}
                    >
                      <div>
                        <svg
                          fill="currentColor"
                          width="25"
                          height="25"
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z"
                            fillRule="nonzero"
                          />
                        </svg>
                      </div>
                      <div className="ml-2 flex-1 text-lg">Dashboard</div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/admin/users"
                      className={`flex items-center px-4 py-3 hover:bg-white hover:text-purple-700 rounded-lg transition-colors ${
                        path == "/admin/users" ? "bg-white text-purple-700" : ""
                      }`}
                      onClick={() => handleSetPath("/admin/users")}
                    >
                      <div>
                        <svg
                          fill="currentColor"
                          width="25"
                          height="25"
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z"
                            fillRule="nonzero"
                          />
                        </svg>
                      </div>
                      <div className="ml-2 flex-1 text-lg">Pengguna</div>
                    </Link>
                  </li>

                  <li>
                    <div
                      onClick={() => handleDropdown("master")}
                      className={`flex items-center px-4 py-3 hover:bg-white hover:text-purple-700 rounded-lg transition-colors cursor-pointer ${
                        path.includes("/admin/master")
                          ? "bg-white text-purple-700"
                          : ""
                      }`}
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M13 3a9 9 0 1 0 6.36 15.36l1.42 1.42A11 11 0 1 1 13 1v2zm0 4v5.27l4.15 2.48-.77 1.29L11 13V7h2z" />
                        </svg>
                      </div>
                      <div
                        className={`flex ml-2 flex-1  flex-row justify-between`}
                      >
                        <div className="">Master</div>
                        <i
                          className={`fa fa-chevron-down transition-transform ${
                            isDropdownOpen == "master" ? "rotate-180" : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                    {isDropdownOpen == "master" && (
                      <ul className="flex flex-col space-y-2 pl-6 mt-1">
                        <li>
                          <Link
                            href="/admin/master/game"
                            className={`flex items-center px-4 py-3 hover:bg-white hover:text-purple-700 rounded-lg transition-colors ${
                              path === "/admin/master/game"
                                ? "bg-white text-purple-700"
                                : ""
                            }`}
                            onClick={() => handleSetPath("/admin/master/game")}
                          >
                            <div className="ml-2 flex-1">Game</div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/master/genre-game"
                            className={`flex items-center px-4 py-3 hover:bg-white hover:text-purple-700 rounded-lg transition-colors ${
                              path === "/admin/master/genre-game"
                                ? "bg-white text-purple-700"
                                : ""
                            }`}
                            onClick={() =>
                              handleSetPath("/admin/master/genre-game")
                            }
                          >
                            <div className="ml-2 flex-1">Genre Game</div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/master/service-game"
                            className={`flex items-center px-4 py-3 hover:bg-white hover:text-purple-700 rounded-lg transition-colors ${
                              path === "/admin/master/service-game"
                                ? "bg-white text-purple-700"
                                : ""
                            }`}
                            onClick={() =>
                              handleSetPath("/admin/master/service-game")
                            }
                          >
                            <div className="ml-2 flex-1">Service Game</div>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
              {/* contact suppot */}
              {/* <div className=" border-t-2 h-[100px] m-2 rounded-lg bg-white text-blue-600 flex flex-col">
                <h3 className="font-bold text-xl text-center">
                  Contact Support
                </h3>
                <p className="text-center font-lg font-semibold">
                  whatsbroad.com@gmail.com
                </p>
              </div> */}
            </section>

            <section className="flex-1 bg-white lg:mt-2 lg:rounded-tl-[50px]  flex flex-col overflow-x-auto">
              <div className="border-b-2 lg:h-[90px] h-[70px] flex justify-between items-center flex-shrink-0">
                <div className="">
                  <button className="menu-btn ml-8 text-[30px] text-gray-900 focus:outline-none lg:hidden">
                    <i
                      className="fa fa-bars "
                      onClick={() => setShowSidebar(!showSidebar)}
                    ></i>
                  </button>
                </div>
                <div className="flex items-end relative ">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setIsDropdownOpenTopbar("profile")}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <i className="fa fa-user text-white"></i>
                    </div>
                  </div>
                  <div
                    className={`absolute lg:top-16 right-5 z-50 top-14  ${
                      isDropdownOpenTopbar == "profile" ? "flex" : "hidden"
                    }   rounded-lg   flex-col`}
                  >
                    <Link
                      onClick={() => {
                        handleSetPath("/user/profile");
                        setIsDropdownOpenTopbar("");
                      }}
                      href={"/user/profile"}
                      className="bg-blue-700 hover:bg-white hover:text-purple-700  text-white font-semibold w-full p-3 rounded-t-lg flex items-center cursor-pointer"
                    >
                      <i className="fa fa-user mr-3"></i>
                      Profile
                    </Link>

                    <div
                      className="bg-blue-700  text-white hover:bg-white hover:text-purple-700 font-semibold w-full p-3 rounded-b-lg flex items-center cursor-pointer"
                      onClick={handleLogout}
                    >
                      <i className="fa fa-sign-out mr-3"></i>
                      Logout
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:p-6 p-2 overflow-x-auto flex-1">
                {children}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
