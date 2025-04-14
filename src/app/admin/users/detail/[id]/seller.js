"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Product from "./product";
import Transaction from "./transaction";
import Review from "./review";
import api_url from "@/api_url";
import Image from "next/image";
import { ButtonBack } from "@/component/button";
import TotalUpChart from "@/component/totalUpChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Seller({ user }) {
  const { id } = useParams();
  const router = useRouter();
  const [tabs, setTabs] = useState([
    { id: "Produk", title: "Produk", count: 0 },
    { id: "Transaksi", title: "Transaksi", count: 0 },
    { id: "Ulasan", title: "Ulasan", count: 0 },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleActiveTab = (tabId) => {
    setActiveTab(tabId);
  };

  console.log(user.seller.color_level);

  return (
    <>
      <div className="2xl:flex 2xl:space-x-[48px]">
        {/* tombol kembali */}

        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <ButtonBack
            handle={() => router.push("/admin/users")}
            className="bg-gray-500   text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          />
          <div className="mb-[24px] mt-[24px] w-full">
            <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-produk.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Produk
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      {user.seller.total_products}
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-penjual.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Ulasan
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      {user.seller.total_reviews}
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-transaksi.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Total Transaksi
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      {user.seller.total_transactions}
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-earn.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Saldo
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      Rp {parseFloat(user.saldo).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-produk.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Rating Bintang
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      {user.seller.average_rating}
                      <span className="ml-2 text-[#ffb600]">
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
              <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-[7px]">
                    <div className="icon">
                      <span>
                        <Image
                          width={50}
                          height={50}
                          src="/template/assets/images/icons/total-game.svg"
                          alt="icon"
                        />
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-bgray-900 dark:text-white">
                      Level
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
                      {user.seller_level}
                      <span
                        className={`ml-2 text-[${user.seller.color_level}]`}
                      >
                        <FontAwesomeIcon icon={faTrophy} />
                      </span>
                    </p>
                  </div>
                  <TotalUpChart />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* card informasi seller */}
      <div className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">
            Informasi Seller
          </h3>
          <div className="flex items-center mt-4">
            <Image
              width={100}
              height={100}
              src={
                user.image
                  ? `${api_url.base_url}${user.image}`
                  : user.social_image
              }
              alt="Logo Toko - Jual Item Mobile Legends"
              className="w-16 h-16 rounded-full object-cover mr-4"
              loading="lazy"
            />
            <div>
              <h4 className="text-xl font-semibold text-bgray-900 dark:text-white">
                {user.name}
              </h4>
              <p className="text-bgray-500">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="flex mt-4  text-lg">
          {tabs.map((tab) => (
            <div
              style={{
                cursor: "pointer",
                transition: "all 0.3s",
                marginRight: "20px",
              }}
              // className={`pb-2 cursor-pointer transition-all border-b-2 ${
              key={tab.id}
              className={`pb-2 cursor-pointer transition-all border-b-2 text-bgray-900 dark:text-bgray-50 ${
                activeTab === tab.id
                  ? " border-purple-300 font-semibold"
                  : "border-transparent "
              }`}
              onClick={() => handleActiveTab(tab.id)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        {activeTab === "Produk" && <Product user={user} />}
        {activeTab === "Transaksi" && <Transaction user={user} />}
        {activeTab === "Ulasan" && <Review user={user} />}
      </div>
    </>
  );
}
