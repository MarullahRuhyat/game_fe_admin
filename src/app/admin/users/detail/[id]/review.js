"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Review({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [pageActive, setPageActive] = useState(1);
  const pageSize = 10;

  async function fetchReviews(url = null) {
    setLoading(true);
    const token = Cookies.get("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Anda harus login terlebih dahulu.",
      });
      router.push("/auth/login");
      return;
    }
    let params = {
      user_id: user.id,
      page_size: pageSize,
    };
    const queryString = new URLSearchParams(params).toString();
    if (url == null) {
      url = `${api_url.review}?${queryString}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);

      if (data.next === null && data.previous === null) {
        setPageActive(1);
      }
      if (data.next === null && data.previous !== null) {
        const url = data.previous;
        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");
        if (page === null) {
          setPageActive(2);
        } else {
          setPageActive(parseInt(page) + 1);
        }
      }
      if (data.next !== null && data.previous === null) {
        const url = data.next;
        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");

        setPageActive(parseInt(page) - 1);
      }

      if (data.next !== null && data.previous !== null) {
        const url = data.next;
        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");
        setPageActive(parseInt(page) - 1);
      }
      setReviews(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat mengambil data ulasan.",
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchReviews();
  }, []);

  const handlePagination = (url) => {
    fetchReviews(url);
  };

  return (
    <>
      <div className="bg-white border shadow-lg rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800">Ulasan</h3>

        {loading ? (
          <p className="text-gray-500 mt-4">Memuat ulasan...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 mt-4">Belum ada ulasan.</p>
        ) : (
          <div className="mt-4 space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center">
                  <img
                    src={
                      review.user.image
                        ? `${api_url.base_url}${review.user.image}`
                        : review.user.social_image
                    }
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {review.user.name}
                    </h4>
                    <p className="text-sm text-gray-500">{review.user.email}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa fa-star ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({review.rating})
                  </span>
                </div>

                {/* Comment */}
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        {prevPage && (
          <button
            onClick={() => handlePagination(prevPage)}
            className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Prev
          </button>
        )}
        <button
          key={pageActive}
          className={`px-4 py-2 mx-1 rounded-md shadow bg-blue-600 "`}
        >
          <p className="text-white font-semibold">{pageActive}</p>
        </button>
        {nextPage && (
          <button
            onClick={() => handlePagination(nextPage)}
            className="px-4 py-2 mx-1 rounded-md shadow bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
