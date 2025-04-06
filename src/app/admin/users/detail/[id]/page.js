"use client";
import React, { use, useEffect, useState } from "react";
import Seller from "./seller";
import User from "./user";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import api_url from "@/api_url";

export default function DetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    // fetch data user berdasarkan id
    const fetchUser = async () => {
      try {
        const res = await fetch(`${api_url.user}${id}/`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          console.log("data.data", data);

          setUser(data.data);
          setSeller(data.seller);
        } else {
          Swal.fire("Error", data.message["ind"], "error").then(() => {
            router.push("/admin/users");
          });
        }
      } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan.", "error");
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.is_seller) {
    return <Seller user={user} seller={seller} />;
  }
  if (user != null) {
    return <User user={user} />;
  }
}
