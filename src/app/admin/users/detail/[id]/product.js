"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Product() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2    xl:grid-cols-4  gap-3 mt-2">
      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      <article className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        {/* Wrapper image pakai relative */}
        <div className="relative h-48">
          <img
            src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
            alt="Background Mobile Legends - Promo Golden Spin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
            In-Game Items
          </p>
        </div>

        {/* Konten bawah */}
        <section className="bg-gradient-to-t from-purple-900 to-gray-900">
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-[14px] mb-2">Mobile Legends</p>
              <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                36 Golden Spin✅ + VIP Points✅ - In Your Account✅ [[ SEE
                DESCRIPTION✅ ]]
              </h2>
              <p className="text-[#ffb600] font-semibold text-md">Rp 10.000</p>
            </div>
          </div>

          <footer className="flex items-center justify-between border-t-2 p-4">
            <div className="flex items-center">
              <img
                src="https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/09/04/Cara-Ganti-Background-ML-Mobile-Legends-Terbaru-dan-Resikonya-1115390484.jpg"
                alt="Logo Toko - Jual Item Mobile Legends"
                className="w-10 h-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <span className="text-white font-semibold">Nama Toko</span>
            </div>

            <div className="flex items-center justify-end text-[#ffb600] font-semibold">
              <span className="mr-1">4.5</span>
              <span className="mr-1">(100)</span>
              <i className="fa fa-star"></i>
            </div>
          </footer>
        </section>
      </article>

      {/* Tambah card lagi tinggal copy-paste aja */}
    </div>
  );
}
