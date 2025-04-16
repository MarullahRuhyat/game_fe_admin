"use client";

import api_url from "@/api_url";
import { fetchSellerLevel } from "@/redux/action/sellerLevelAction";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { ButtonDelete, ButtonEdit } from "@/component/button";
import { Input } from "@/component/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function SellerLevelPage() {
  const [filteredSellerLevel, setFilteredSellerLevel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const router = useRouter();
  const dispatch = useDispatch();

  const sellerLevel = useSelector((state) => state.sellerLevel.sellerLevel);
  const isFetchSellerLevel = useSelector(
    (state) => state.sellerLevel.isFetchSellerLevel
  );
  useEffect(() => {
    if (!isFetchSellerLevel) {
      dispatch(fetchSellerLevel(router)).finally(() => setLoading(false));
    } else {
      if (sellerLevel.length > 0) {
        setFilteredSellerLevel(sellerLevel);
        const lastPage = Math.ceil(sellerLevel.length / itemsPerPage);
        if (currentPage > lastPage) {
          setCurrentPage(lastPage);
        }
      }
      setLoading(false);
    }
  }, [sellerLevel]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    console.log(query);

    setSearchQuery(query);
    const filtered = sellerLevel.filter((level) =>
      level.name.toLowerCase().includes(query)
    );

    setFilteredSellerLevel(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentLevel = filteredSellerLevel.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSellerLevel.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageRange = () => {
    const range = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  const handleEditLevel = (id) => {
    router.push(`/admin/master/seller-level/${id}`);
  };

  const listHeaderTable = ["No", "Level", "Color", "Margin", "Aksi"];

  return (
    <div className="2xl:flex 2xl:space-x-[48px]">
      <section className="mb-6 2xl:mb-0 2xl:flex-1">
        <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
          <div className="flex flex-col space-y-10 md:space-y-5">
            <div className="table-content w-full overflow-x-auto ">
              <table className="w-full ">
                <thead className="bg-bgray-50 dark:bg-darkblack-500">
                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                    {listHeaderTable.map((header, index) => (
                      <td className="px-6 py-5 xl:px-0 text-center" key={index}>
                        <div className="flex justify-center w-full items-center space-x-2.5">
                          <span className="font-medium text-bgray-600 dark:text-bgray-50">
                            {header}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-gray-500 font-semibold py-4"
                      >
                        Memuat genre...
                      </td>
                    </tr>
                  ) : currentLevel.length > 0 ? (
                    currentLevel.map((level, index) => (
                      <tr
                        key={level.id}
                        className="border-b border-bgray-300 dark:border-darkblack-400 text-center cursor-pointer"
                      >
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {indexOfFirstItem + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {level.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className={`ml-2 text-[${level.color}]`}>
                            <FontAwesomeIcon icon={faTrophy} />
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <span className="text-base font-medium text-bgray-900 dark:text-white">
                            {level.profit_margin} %
                          </span>
                        </td>
                        <td className="px-6 py-5 xl:px-0">
                          <div className="flex justify-center items-center space-x-2">
                            <ButtonEdit
                              handle={() => handleEditLevel(level.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-gray-500 font-semibold py-4"
                      >
                        Genre tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
