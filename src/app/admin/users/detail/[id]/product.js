"use client";
import React, { use, useEffect, useState } from "react";
import api_url from "@/api_url";
import Swal from "sweetalert2";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Product({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [pageActive, setPageActive] = useState(1);
  const pageSize = 12;

  async function fetchProducts(url = null) {
    setLoading(true);
    let params = {
      user_id: user.id,
      page_size: pageSize,
    };
    const queryString = new URLSearchParams(params).toString();
    if (url == null) {
      url = `${api_url.product}?${queryString}`;
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
      if (data.next === null && data.previous === null) {
        setPageActive(1);
      }
      if (data.next === null && data.previous !== null) {
        const url = data.previous;
        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page");
        console.log("page", page);
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
      setProducts(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#dc3545",
        title: "Error",
        text: "Terjadi kesalahan saat mengambil data produk.",
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePagination = (url) => {
    fetchProducts(url);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2    xl:grid-cols-4  gap-3 mt-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all border-2 border-gray-200 bg-white"
              >
                {/* Wrapper image pakai relative */}
                <div className="relative h-48">
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <p className="absolute bottom-0 left-0 w-full h-12 bg-black/60 flex justify-center items-center text-white font-semibold text-md z-10">
                    {product.game_service
                      ? product.game_service.name_ind
                      : "Game Service tidak ada"}
                  </p>
                </div>
                {/* Konten bawah */}
                <section className="bg-gradient-to-t from-purple-900 to-gray-900">
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 text-[14px] mb-2">
                        {product.game ? product.game.name : "Game tidak ada"}
                      </p>
                      <h2 className="text-lg font-extrabold mb-2 text-white line-clamp-2">
                        {product.name}
                      </h2>
                      <p className="text-[#ffb600] font-semibold text-md">
                        Rp {parseFloat(product.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <footer className="flex items-center justify-between border-t-2 p-4">
                    <div className="flex items-center">
                      <Image
                        width={100}
                        height={100}
                        src={`${api_url.base_url}${product.user.image}`}
                        alt={product.user.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                        loading="lazy"
                      />
                      <span className="text-white font-semibold">
                        {product.user.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-end text-[#ffb600] font-semibold">
                      <span className="mr-1">{product.user.rating}</span>
                      <span className="mr-1">
                        ({product.user.total_reviews})
                      </span>
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </footer>
                </section>
              </article>
            ))}

            {/* Tambah card lagi tinggal copy-paste aja */}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {prevPage && (
              <button
                style={{ margin: "3px" }}
                type="button"
                onClick={() => handlePagination(prevPage)}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-200  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
              >
                <span>Sebelumnya</span>
              </button>
            )}
            <button
              style={{ margin: "3px" }}
              type="button"
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out bg-purple-500 text-white  lg:px-6 lg:py-2.5 lg:text-sm`}
            >
              <span>{pageActive}</span>
            </button>
            {nextPage && (
              <button
                style={{ margin: "3px" }}
                type="button"
                onClick={() => handlePagination(nextPage)}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out  text-purple-300 bg-gray-200  hover:bg-purple-50 hover:text-purple-300 lg:px-6 lg:py-2.5 lg:text-sm`}
              >
                <span>Selanjutnya</span>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
