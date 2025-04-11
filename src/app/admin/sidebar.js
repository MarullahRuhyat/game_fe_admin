import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DashboardIcon } from "@/component/icon";

export default function Sidebar({ handleActiveWrapper }) {
  const [path, setPath] = useState("");
  const [isDropdownOpenTopbar, setIsDropdownOpenTopbar] = useState("");
  const [activeWrapper, setActiveWrapper] = useState(true);

  useEffect(() => {
    let pathurl = window.location.pathname;
    pathurl = pathurl.split("/");
    console.log("pathurl", pathurl);
    // delete the first element of the array
    pathurl.shift();
    let pathActive = "";
    pathurl.forEach((e) => {
      pathActive += `/${e}`;
    });
    setPath(pathActive);
  }, []);

  const handleSetPath = (path) => {
    setPath(path);
  };

  console.log("sidebar path", path);

  return (
    <aside className="sidebar-wrapper fixed top-0 z-30 block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block">
      <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
        <a href="index.html">
          <img
            src="/template/assets/images/logo/logo-color.svg"
            className="block dark:hidden"
            alt="logo"
          />
          <img
            src="/template/assets/images/logo/logo-white.svg"
            className="hidden dark:block"
            alt="logo"
          />
        </a>
        <button
          type="button"
          className="drawer-btn absolute right-0 top-auto"
          title="Ctrl+b"
          onClick={() => {
            setActiveWrapper(!activeWrapper);
          }}
        >
          <span>
            <svg
              width="16"
              height="40"
              viewBox="0 0 16 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z"
                fill="#6A0DAD"
              />
              <path
                d="M10 15L6 20.0049L10 25.0098"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full overflow-y-scroll pb-[200px] pl-[48px] pt-[14px]">
        <div className="nav-wrapper mb-[36px] pr-[50px]">
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Menu
            </h4>
            <ul className="mt-2.5">
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin")}
              >
                <Link href="/admin">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <DashboardIcon />
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Dashboard
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin/report-problem" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin/report-problem")}
              >
                <Link href="/admin/report-problem">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <svg
                          width="18"
                          height="21"
                          viewBox="0 0 18 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="path-1"
                            d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0Z"
                            fill="#1A202C"
                          />
                          <path
                            className="path-2"
                            d="M8.25 4.5H9.75V11.25H8.25V4.5Z"
                            fill="#6A0DAD"
                          />
                          <path
                            className="path-2"
                            d="M9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5Z"
                            fill="#6A0DAD"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Laporan Masalah
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin/users" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin/users")}
              >
                <Link href="/admin/users">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <svg
                          width="18"
                          height="21"
                          viewBox="0 0 18 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="path-2"
                            d="M9 0C11.4853 0 13.5 2.01472 13.5 4.5C13.5 6.98528 11.4853 9 9 9C6.51472 9 4.5 6.98528 4.5 4.5C4.5 2.01472 6.51472 0 9 0Z"
                            fill="#6A0DAD"
                          />
                          <path
                            className="path-1"
                            d="M0 18C0 14.6863 2.68629 12 6 12H12C15.3137 12 18 14.6863 18 18V21H0V18Z"
                            fill="#1A202C"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Pengguna
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Permohonan
            </h4>
            <ul className="mt-2.5">
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin/request/withdraw" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin/request/withdraw")}
              >
                <Link href="/admin/request/withdraw">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <svg
                          width="18"
                          height="21"
                          viewBox="0 0 18 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="path-1"
                            d="M3 2C3 0.89543 3.89543 0 5 0H13C14.1046 0 15 0.89543 15 2V6H13V2H5V19H13V15H15V19C15 20.1046 14.1046 21 13 21H5C3.89543 21 3 20.1046 3 19V2Z"
                            fill="#1A202C"
                          />
                          <path
                            className="path-2"
                            d="M9 7L12 10H10V14H8V10H6L9 7Z"
                            fill="#6A0DAD"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Tarik Saldo
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin/request/seller" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin/request/seller")}
              >
                <Link href="/admin/request/seller">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <svg
                          width="18"
                          height="21"
                          viewBox="0 0 18 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="path-1"
                            d="M1 1H3L4.2 5H16L14 13H5L3.5 7H1V1Z"
                            fill="#1A202C"
                          />
                          <path
                            className="path-2"
                            d="M6 17C6 18.1046 5.10457 19 4 19C2.89543 19 2 18.1046 2 17C2 15.8954 2.89543 15 4 15C5.10457 15 6 15.8954 6 17Z"
                            fill="#6A0DAD"
                          />
                          <path
                            className="path-2"
                            d="M14 17C14 18.1046 13.1046 19 12 19C10.8954 19 10 18.1046 10 17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17Z"
                            fill="#6A0DAD"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Penjual
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Master
            </h4>
            <ul className="mt-2.5">
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin/master/game" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin/master/game")}
              >
                <Link href="/admin/master/game">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <svg
                          width="18"
                          height="21"
                          viewBox="0 0 18 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g transform="scale(1.2) translate(-1.5 -2)">
                            <path
                              className="path-1"
                              d="M2 8C1.44772 8 1 8.44772 1 9V12C1 14.7614 3.23858 17 6 17H12C14.7614 17 17 14.7614 17 12V9C17 8.44772 16.5523 8 16 8H13L11.5 10H6.5L5 8H2Z"
                              fill="#1A202C"
                            />
                            <path
                              className="path-2"
                              d="M6.25 11H5.5V10.25C5.5 10.1119 5.38807 10 5.25 10H4.75C4.61193 10 4.5 10.1119 4.5 10.25V11H3.75C3.61193 11 3.5 11.1119 3.5 11.25V11.75C3.5 11.8881 3.61193 12 3.75 12H4.5V12.75C4.5 12.8881 4.61193 13 4.75 13H5.25C5.38807 13 5.5 12.8881 5.5 12.75V12H6.25C6.38807 12 6.5 11.8881 6.5 11.75V11.25C6.5 11.1119 6.38807 11 6.25 11Z"
                              fill="#6A0DAD"
                            />
                            <path
                              className="path-2"
                              d="M12.5 10.75C12.5 10.3358 12.8358 10 13.25 10C13.6642 10 14 10.3358 14 10.75C14 11.1642 13.6642 11.5 13.25 11.5C12.8358 11.5 12.5 11.1642 12.5 10.75Z"
                              fill="#6A0DAD"
                            />
                            <path
                              className="path-2"
                              d="M11 12.25C11 11.8358 11.3358 11.5 11.75 11.5C12.1642 11.5 12.5 11.8358 12.5 12.25C12.5 12.6642 12.1642 13 11.75 13C11.3358 13 11 12.6642 11 12.25Z"
                              fill="#6A0DAD"
                            />
                          </g>
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Game
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin/master/service-game" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin/master/service-game")}
              >
                <Link href="/admin/master/service-game">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <svg
                          width="18"
                          height="21"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g transform="scale(1.1) translate(-1.1 -1.1)">
                            <path
                              className="path-1"
                              d="M6.5 3H17.5C18.3284 3 19 3.67157 19 4.5V6.5C19 7.32843 18.3284 8 17.5 8H6.5C5.67157 8 5 7.32843 5 6.5V4.5C5 3.67157 5.67157 3 6.5 3Z"
                              fill="#1A202C"
                            />
                            <path
                              className="path-2"
                              d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V10Z"
                              fill="#6A0DAD"
                            />
                            <path
                              className="path-1"
                              d="M9 12H11V14H9V12ZM13 12H15V14H13V12Z"
                              fill="#1A202C"
                            />
                          </g>
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Game Service
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  path == "/admin/master/genre-game" ? "active" : ""
                }`}
                onClick={() => handleSetPath("/admin/master/genre-game")}
              >
                <Link href="/admin/master/genre-game">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico ">
                        <svg
                          width="18"
                          height="21"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="path-1"
                            d="M3 3H10V10H3V3Z"
                            fill="#1A202C"
                          />
                          <path
                            className="path-2"
                            d="M14 3H21V10H14V3Z"
                            fill="#6A0DAD"
                          />
                          <path
                            className="path-1"
                            d="M3 14H10V21H3V14Z"
                            fill="#6A0DAD"
                          />
                          <path
                            className="path-2"
                            d="M14 14H21V21H14V14Z"
                            fill="#1A202C"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Game Genre
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
