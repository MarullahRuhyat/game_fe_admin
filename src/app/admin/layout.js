"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use `next/navigation` instead for `router.push`.
import { useDispatch, useSelector } from "react-redux";
import api_url from "@/api_url";
import Cookies from "js-cookie";
import LoadingScreen from "@/component/loadingComponent";
import Swal from "sweetalert2";
import Script from "next/script";
import Image from "next/image";

import {
  DashboardIcon,
  UserIcon,
  WarningIcon,
  WithdrawIcon,
  SellerIcon,
  GameGenreIcon,
  GameIcon,
  GameServiceIcon,
} from "@/component/icon";

export default function UserLayout({ children }) {
  const router = useRouter();

  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [isDropdownOpenTopbar, setIsDropdownOpenTopbar] = useState("");
  const [authStatus, setAuthStatus] = useState("checking");
  const [activeWrapper, setActiveWrapper] = useState(true);

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
    setAuthStatus("authenticated");
  }, [router]);

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

  const menus = [
    {
      title: "Menu",
      items: [
        { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
        {
          label: "Laporan Masalah",
          path: "/admin/report-problem",
          icon: <WarningIcon />,
        },
        { label: "Pengguna", path: "/admin/users", icon: <UserIcon /> },
      ],
    },
    {
      title: "Permohonan",
      items: [
        {
          label: "Tarik Saldo",
          path: "/admin/request/withdraw",
          icon: <WithdrawIcon />,
        },
        {
          label: "Penjual",
          path: "/admin/request/seller",
          icon: <SellerIcon />,
        },
      ],
    },
    {
      title: "Master",
      items: [
        { label: "Game", path: "/admin/master/game", icon: <GameIcon /> },
        {
          label: "Service Game",
          path: "/admin/master/service-game",
          icon: <GameServiceIcon />,
        },
        {
          label: "Game Genre",
          path: "/admin/master/genre-game",
          icon: <GameGenreIcon />,
        },
      ],
    },
  ];

  return (
    <>
      {authStatus == "checking" ? (
        <LoadingScreen />
      ) : (
        <>
          <div
            className={`layout-wrapper  w-full ${
              activeWrapper ? "active" : ""
            }`}
          >
            <div className="relative flex w-full">
              <aside className="sidebar-wrapper fixed top-0 z-30 block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block">
                <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
                  <Link href="index.html">
                    <Image
                      src="/template/assets/images/logo/logo-color.svg"
                      className="block dark:hidden"
                      alt="logo"
                    />
                    <Image
                      src="/template/assets/images/logo/logo-white.svg"
                      className="hidden dark:block"
                      alt="logo"
                    />
                  </Link>
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
                    {menus.map((section, index) => (
                      <div className="item-wrapper mb-5" key={index}>
                        <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
                          {section.title}
                        </h4>
                        <ul className="mt-2.5">
                          {section.items.map((item, idx) => (
                            <li
                              key={idx}
                              className={`item py-[11px] text-bgray-900 dark:text-white ${
                                path === item.path ? "active" : ""
                              }`}
                              onClick={() => handleSetPath(item.path)}
                            >
                              <Link href={item.path}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2.5">
                                    <span className="item-ico ">
                                      {item.icon}
                                    </span>
                                    <span className="item-text text-lg font-medium leading-none">
                                      {item.label}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
              <div
                style={{ zIndex: 25 }}
                className="aside-overlay fixed left-0 top-0 block h-full w-full bg-black bg-opacity-30 sm:hidden"
              ></div>
              <aside className="relative hidden w-[96px] bg-white dark:bg-black sm:block">
                <div className="sidebar-wrapper-collapse relative top-0 z-30 w-full">
                  <div className="sidebar-header sticky top-0 z-20 flex h-[108px] w-full items-center justify-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] bg-white dark:border-darkblack-500 dark:bg-darkblack-600">
                    <Link href="index.html">
                      <Image
                        src="/template/assets/images/logo/logo-short.svg"
                        className="block dark:hidden"
                        alt="logo"
                      />
                      <Image
                        src="/template/assets/images/logo/logo-short-white.svg"
                        className="hidden dark:block"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div className="sidebar-body w-full pt-[14px]">
                    <div className="flex flex-col items-center">
                      <div className="nav-wrapper mb-[36px]">
                        {menus.map((section, index) => (
                          <div className="item-wrapper mb-5" key={index}>
                            {section.items.map((item, idx) => (
                              <ul
                                className="mt-2.5 flex flex-col items-center justify-center"
                                key={idx}
                              >
                                <li
                                  key={idx}
                                  className={`item px-[43px] py-[11px] ${
                                    path === item.path ? "active" : ""
                                  }`}
                                  onClick={() => handleSetPath(item.path)}
                                >
                                  <Link href={item.path}>
                                    <span className="item-ico">
                                      {item.icon}
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
              <div className="body-wrapper flex-1 overflow-x-hidden dark:bg-darkblack-500">
                <header className="header-wrapper fixed z-30 hidden w-full md:block">
                  <div className="relative flex h-[108px] w-full items-center justify-between bg-white px-10 dark:bg-darkblack-600 2xl:px-[76px]">
                    <button
                      style={{ transform: "rotate(180deg)" }}
                      title="Ctrl+b"
                      type="button"
                      className="drawer-btn absolute left-0 top-auto  transhtmlForm"
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
                    <div>
                      <h3 className="text-xl font-bold text-bgray-900 dark:text-bgray-50 lg:text-3xl lg:leading-[36.4px]">
                        Dashboard
                      </h3>
                    </div>

                    <div className="quick-access-wrapper relative">
                      <div className="flex items-center space-x-[43px]">
                        <div className="hidden items-center space-x-5 xl:flex">
                          <button
                            type="button"
                            id="theme-toggle"
                            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-purple-300 dark:border-darkblack-400"
                          >
                            <span className="block dark:hidden">
                              <svg
                                className="stroke-bgray-900"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18.3284 14.8687C13.249 14.8687 9.13135 10.751 9.13135 5.67163C9.13135 4.74246 9.26914 3.84548 9.5254 3C5.74897 4.14461 3 7.65276 3 11.803C3 16.8824 7.11765 21 12.197 21C16.3472 21 19.8554 18.251 21 14.4746C20.1545 14.7309 19.2575 14.8687 18.3284 14.8687Z"
                                  strokeWidth="1.5"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="hidden dark:block">
                              <svg
                                className="stroke-bgray-900 dark:stroke-bgray-50"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="5"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M12 2V4"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M12 20V22"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M20.6602 7L18.9281 8"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M5.07178 16L3.33973 17"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M3.33984 7L5.07189 8"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M18.9282 16L20.6603 17"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                          </button>
                          <button
                            id="notification-btn"
                            type="button"
                            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-purple-300 dark:border-darkblack-400"
                          >
                            <span className="absolute -right-[5px] -top-[2px] h-3.5 w-3.5 rounded-full border-2 border-white bg-bgray-300 dark:border-none dark:bg-bgray-600"></span>
                            <svg
                              className="fill-bgray-900 dark:fill-white"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19.9718 6.78149L19.2803 7.07178L19.9718 6.78149ZM19.3571 7.25473C19.5174 7.63666 19.957 7.81631 20.3389 7.65599C20.7209 7.49567 20.9005 7.05609 20.7402 6.67416L19.3571 7.25473ZM16.7784 2.77061C16.3937 2.61687 15.9573 2.80404 15.8036 3.18867C15.6498 3.5733 15.837 4.00973 16.2216 4.16347L16.7784 2.77061ZM16.6672 3.53388L16.3889 4.23031L16.6672 3.53388ZM4.0768 6.78149L4.76834 7.07178L4.0768 6.78149ZM3.30846 6.67416C3.14813 7.05609 3.32778 7.49567 3.70971 7.65599C4.09164 7.81631 4.53122 7.63666 4.69154 7.25473L3.30846 6.67416ZM7.82701 4.16347C8.21164 4.00973 8.39881 3.5733 8.24507 3.18867C8.09134 2.80405 7.65491 2.61687 7.27028 2.77061L7.82701 4.16347ZM7.38142 3.53388L7.10305 2.83745V2.83745L7.38142 3.53388ZM18.2395 9.93743L17.4943 10.0221V10.0221L18.2395 9.93743ZM18.6867 13.8746L19.4319 13.7899V13.7899L18.6867 13.8746ZM5.31328 13.8746L4.56807 13.7899L5.31328 13.8746ZM5.76046 9.93743L6.50567 10.0221L5.76046 9.93743ZM4.44779 15.83L3.87686 15.3436H3.87686L4.44779 15.83ZM19.5522 15.83L18.9813 16.3164L18.9813 16.3164L19.5522 15.83ZM14.2699 5.33931H13.5199C13.5199 5.65996 13.7238 5.94513 14.0272 6.04893L14.2699 5.33931ZM9.73005 5.33931L9.97284 6.04893C10.2762 5.94513 10.4801 5.65996 10.4801 5.33931H9.73005ZM15.7022 21.2175C15.8477 20.8296 15.6512 20.3973 15.2634 20.2518C14.8755 20.1064 14.4432 20.3029 14.2978 20.6907L15.7022 21.2175ZM9.70223 20.6907C9.55678 20.3029 9.12446 20.1064 8.73663 20.2518C8.34879 20.3973 8.15231 20.8296 8.29777 21.2175L9.70223 20.6907ZM19.2803 7.07178L19.3571 7.25473L20.7402 6.67416L20.6634 6.4912L19.2803 7.07178ZM16.2216 4.16347L16.3889 4.23031L16.9456 2.83745L16.7784 2.77061L16.2216 4.16347ZM20.6634 6.4912C19.9638 4.82468 18.6244 3.50849 16.9456 2.83745L16.3889 4.23031C17.6948 4.7523 18.7364 5.77599 19.2803 7.07178L20.6634 6.4912ZM3.38526 6.4912L3.30846 6.67416L4.69154 7.25473L4.76834 7.07178L3.38526 6.4912ZM7.27028 2.77061L7.10305 2.83745L7.65979 4.23031L7.82701 4.16347L7.27028 2.77061ZM4.76834 7.07178C5.31227 5.77599 6.35384 4.7523 7.65979 4.23031L7.10305 2.83745C5.4242 3.50849 4.08481 4.82468 3.38526 6.4912L4.76834 7.07178ZM17.7772 18.2056H6.22281V19.7056H17.7772V18.2056ZM17.4943 10.0221L17.9415 13.9592L19.4319 13.7899L18.9847 9.85279L17.4943 10.0221ZM6.05849 13.9592L6.50567 10.0221L5.01526 9.85279L4.56807 13.7899L6.05849 13.9592ZM5.01872 16.3164C5.59608 15.6386 5.96025 14.8241 6.05849 13.9592L4.56807 13.7899C4.50522 14.3432 4.2708 14.8812 3.87686 15.3436L5.01872 16.3164ZM17.9415 13.9592C18.0398 14.8241 18.4039 15.6386 18.9813 16.3164L20.1231 15.3436C19.7292 14.8812 19.4948 14.3432 19.4319 13.7899L17.9415 13.9592ZM6.22281 18.2056C5.5675 18.2056 5.10418 17.8817 4.89044 17.5053C4.68417 17.1421 4.68715 16.7056 5.01872 16.3164L3.87686 15.3436C3.11139 16.2422 3.0877 17.3685 3.5861 18.2461C4.07704 19.1105 5.04975 19.7056 6.22281 19.7056V18.2056ZM17.7772 19.7056C18.9503 19.7056 19.923 19.1105 20.4139 18.2461C20.9123 17.3685 20.8886 16.2422 20.1231 15.3436L18.9813 16.3164C19.3129 16.7056 19.3158 17.1421 19.1096 17.5053C18.8958 17.8817 18.4325 18.2056 17.7772 18.2056V19.7056ZM15.0199 5.33931V5.23567H13.5199V5.33931H15.0199ZM18.9847 9.85279C18.7054 7.39374 16.8802 5.43969 14.5127 4.6297L14.0272 6.04893C15.9445 6.70491 17.2914 8.23516 17.4943 10.0221L18.9847 9.85279ZM10.4801 5.33931V5.23567H8.98005V5.33931H10.4801ZM6.50567 10.0221C6.70863 8.23516 8.05551 6.70491 9.97284 6.04893L9.48727 4.6297C7.1198 5.43969 5.29456 7.39374 5.01526 9.85279L6.50567 10.0221ZM12 3.71741C12.84 3.71741 13.5199 4.39768 13.5199 5.23567H15.0199C15.0199 3.56821 13.6673 2.21741 12 2.21741V3.71741ZM12 2.21741C10.3327 2.21741 8.98005 3.56821 8.98005 5.23567H10.4801C10.4801 4.39768 11.16 3.71741 12 3.71741V2.21741ZM14.2978 20.6907C13.9752 21.5508 13.0849 22.2026 12 22.2026V23.7026C13.6851 23.7026 15.1514 22.686 15.7022 21.2175L14.2978 20.6907ZM12 22.2026C10.9151 22.2026 10.0248 21.5508 9Dashboard.70223 20.6907L8.29777 21.2175C8.84856 22.686 10.3149 23.7026 12 23.7026V22.2026Z" />
                            </svg>
                          </button>
                        </div>
                        <div className="hidden h-[48px] w-[1px] bg-bgray-300 dark:bg-darkblack-400 xl:block"></div>
                        <div
                          className="flex cursor-pointer space-x-0 lg:space-x-3"
                          onClick={() => {
                            setIsDropdownOpenTopbar(
                              isDropdownOpenTopbar == "profile" ? "" : "profile"
                            );
                          }}
                        >
                          <div className="h-[52px] w-[52px] overflow-hidden rounded-xl border border-bgray-300">
                            <Image
                              className="object-cover"
                              src="/template/assets/images/avatar/profile-52x52.png"
                              alt="avater"
                            />
                          </div>
                          <div className="hidden 2xl:block">
                            <div className="flex items-center space-x-2.5">
                              <h3 className="text-base font-bold leading-[28px] text-bgray-900 dark:text-white">
                                John Doe
                              </h3>
                              <span>
                                <svg
                                  className="stroke-bgray-900 dark:stroke-white"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7 10L12 14L17 10"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                            <p className="text-sm font-medium leading-[20px] text-bgray-600 dark:text-bgray-50">
                              Super Admin
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="profile-wrapper">
                        <div className="profile-outside fixed -left-[43px] top-0 hidden h-full w-full"></div>
                        <div
                          style={{
                            filter:
                              "drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))",
                            display:
                              isDropdownOpenTopbar == "profile"
                                ? "block"
                                : "none",
                          }}
                          className="profile-box absolute right-0 top-[81px] hidden w-[300px] overflow-hidden rounded-lg bg-white dark:bg-darkblack-600"
                        >
                          <div className="relative w-full px-3 py-2">
                            <div>
                              <ul>
                                <li className="w-full">
                                  <Link href="settings.html">
                                    <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900 hover:dark:bg-darkblack-500">
                                      <div className="w-[20px]">
                                        <span>
                                          <svg
                                            className="stroke-bgray-900 dark:stroke-bgray-50"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M12.1197 12.7805C12.0497 12.7705 11.9597 12.7705 11.8797 12.7805C10.1197 12.7205 8.71973 11.2805 8.71973 9.51047C8.71973 7.70047 10.1797 6.23047 11.9997 6.23047C13.8097 6.23047 15.2797 7.70047 15.2797 9.51047C15.2697 11.2805 13.8797 12.7205 12.1197 12.7805Z"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M18.7398 19.3796C16.9598 21.0096 14.5998 21.9996 11.9998 21.9996C9.39977 21.9996 7.03977 21.0096 5.25977 19.3796C5.35977 18.4396 5.95977 17.5196 7.02977 16.7996C9.76977 14.9796 14.2498 14.9796 16.9698 16.7996C18.0398 17.5196 18.6398 18.4396 18.7398 19.3796Z"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-semibold text-bgray-900 dark:text-white">
                                          My Profile
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                                <li className="w-full">
                                  <Link href="messages.html">
                                    <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900 dark:text-bgray-300 dark:hover:bg-darkblack-500">
                                      <div className="w-[20px]">
                                        <span>
                                          <svg
                                            className="stroke-bgray-900 dark:stroke-gray-300"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M2 12V7C2 4.79086 3.79086 3 6 3H18C20.2091 3 22 4.79086 22 7V17C22 19.2091 20.2091 21 18 21H8M6 8L9.7812 10.5208C11.1248 11.4165 12.8752 11.4165 14.2188 10.5208L18 8M2 15H8M2 18H8"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-semibold">
                                          Inbox
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                                <li
                                  className="w-full"
                                  // logout
                                  onClick={handleLogout}
                                >
                                  <Link href="#">
                                    <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-purple-300">
                                      <div className="w-[20px]">
                                        <span>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
                                              stroke="#6A0DAD"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-semibold">
                                          Log Out
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="my-[14px] h-[1px] w-full bg-bgray-300"></div>
                            <div>
                              <ul>
                                <li className="w-full">
                                  <Link href="settings.html">
                                    <div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900 dark:text-bgray-50 dark:hover:bg-darkblack-500">
                                      <span className="text-sm font-semibold">
                                        Settings
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                                <li className="w-full">
                                  <Link href="users.html">
                                    <div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900 dark:text-bgray-50 dark:hover:bg-darkblack-500">
                                      <span className="text-sm font-semibold">
                                        Users
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
                <header className="mobile-wrapper fixed z-20 block w-full md:hidden">
                  <div className="flex h-[80px] w-full items-center justify-between bg-white dark:bg-darkblack-600">
                    <div className="flex h-full w-full items-center space-x-5">
                      <button
                        type="button"
                        style={{ transform: "rotate(180deg)" }}
                        className="drawer-btn  transhtmlForm"
                        onClick={() => {
                          setActiveWrapper(!activeWrapper);
                        }}
                        title="Ctrl+b"
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
                              fill="#F7F7F7"
                            />
                            <path
                              d="M10 15L6 20.0049L10 25.0098"
                              stroke="#A0AEC0"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                      <div>
                        <Link href="/">
                          <Image
                            src="/template/assets/images/logo/logo-color.svg"
                            className="block dark:hidden"
                            alt="logo"
                          />
                          <Image
                            src="/template/assets/images/logo/logo-white.svg"
                            className="hidden dark:block"
                            alt="logo"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="mr-2">
                      <div className="flex cursor-pointer space-x-0 lg:space-x-3">
                        <div className="h-[52px] w-[52px] overflow-hidden rounded-xl border border-bgray-300">
                          <Image
                            className="object-cover"
                            src="/template/assets/images/avatar/profile-52x52.png"
                            alt="avater"
                          />
                        </div>
                        <div className="hidden 2xl:block">
                          <div className="flex items-center space-x-2.5">
                            <h3 className="text-base font-bold leading-[28px] text-bgray-900">
                              John Doe
                            </h3>
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 10L12 14L17 10"
                                  stroke="#28303F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                          <p className="text-sm font-medium leading-[20px] text-bgray-600">
                            Super Admin
                          </p>
                        </div>
                      </div>

                      <div className="profile-wrapper">
                        <div className="profile-outside fixed -left-[43px] top-0 hidden h-full w-full"></div>
                        <div
                          // if dropdown open
                          style={{
                            filter:
                              "drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))",
                          }}
                          className="profile-box absolute right-0 top-[81px] hidden w-[300px] overflow-hidden rounded-lg bg-white"
                        >
                          <div className="relative w-full px-3 py-2">
                            <div>
                              <ul>
                                <li className="w-full">
                                  <Link href="settings.html">
                                    <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                                      <div className="w-[20px]">
                                        <span>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M12.1197 12.7805C12.0497 12.7705 11.9597 12.7705 11.8797 12.7805C10.1197 12.7205 8.71973 11.2805 8.71973 9.51047C8.71973 7.70047 10.1797 6.23047 11.9997 6.23047C13.8097 6.23047 15.2797 7.70047 15.2797 9.51047C15.2697 11.2805 13.8797 12.7205 12.1197 12.7805Z"
                                              stroke="#111827"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M18.7398 19.3796C16.9598 21.0096 14.5998 21.9996 11.9998 21.9996C9.39977 21.9996 7.03977 21.0096 5.25977 19.3796C5.35977 18.4396 5.95977 17.5196 7.02977 16.7996C9.76977 14.9796 14.2498 14.9796 16.9698 16.7996C18.0398 17.5196 18.6398 18.4396 18.7398 19.3796Z"
                                              stroke="#111827"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                              stroke="#111827"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-semibold">
                                          My Profile
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                                <li className="w-full">
                                  <Link href="messages.html">
                                    <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                                      <div className="w-[20px]">
                                        <span>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M2 12V7C2 4.79086 3.79086 3 6 3H18C20.2091 3 22 4.79086 22 7V17C22 19.2091 20.2091 21 18 21H8M6 8L9.7812 10.5208C11.1248 11.4165 12.8752 11.4165 14.2188 10.5208L18 8M2 15H8M2 18H8"
                                              stroke="#2A313C"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-semibold">
                                          Inbox
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                                <li className="w-full">
                                  <Link href="#">
                                    <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-purple-300">
                                      <div className="w-[20px]">
                                        <span>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
                                              stroke="#6A0DAD"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-semibold">
                                          Log Out
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="my-[14px] h-[1px] w-full bg-bgray-300"></div>
                            <div>
                              <ul>
                                <li className="w-full">
                                  <Link href="settings.html">
                                    <div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                                      <span className="text-sm font-semibold">
                                        Settings
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                                <li className="w-full">
                                  <Link href="users.html">
                                    <div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                                      <span className="text-sm font-semibold">
                                        Users
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
                <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-[48px] xl:pb-[48px] min-h-screen">
                  {children}
                </main>
              </div>
            </div>
          </div>

          <Script
            src="/template/assets/js/aos.js"
            strategy="afterInteractive"
          />
          <Script
            src="/template/assets/js/slick.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/template/assets/js/quill.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/template/assets/js/main.js"
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
}
