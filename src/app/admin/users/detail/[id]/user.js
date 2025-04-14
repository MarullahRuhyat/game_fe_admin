"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Product from "./product";
import Transaction from "./transaction";
import Image from "next/image";
import { ButtonBack } from "@/component/button";
import api_url from "@/api_url";

export default function User({ user }) {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className=" p-2">
      {/* tombol kembali */}
      <div className="flex items-center mb-4">
        <ButtonBack
          handle={() => {
            router.push("/admin/users");
          }}
        />
      </div>

      {/* card informasi user */}
      <div className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
          <h3 className="text-lg font-semibold text-bgray-900 dark:text-white">
            Informasi User
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
      </div>

      <Transaction user={user} />
    </div>
  );
}
