import * as React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import LoadingInfinite from "../components/LoadingInfinite";

export default function Home() {
  const [hodidayData, setHolidayData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  const [loadingInfinite, setLoadingInfinite] = useState(false);
  const isScrolling = React.useRef(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch(`https://www.gov.uk/bank-holidays.json`)
        .then((response) => response.json())
        .then((resultData) => {
          setHolidayData(Object.entries(resultData));
        });
      setLoading(false);
    })();
  }, []);

  let holiday = hodidayData
    .filter((region) =>
      !Boolean(selectedRegion) ? true : selectedRegion === region[0]
    )
    .map((region) =>
      region[1].events.map((holiday) => ({
        ...holiday,
        division: region[0],
      }))
    )
    .flat(1);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && isInfiniteScroll) {
        if (
          isScrolling.current ||
          currentPage === Math.ceil(holiday.length / itemsPerPage)
        ) {
          return;
        }
        isScrolling.current = true;
        setLoadingInfinite(true);
        setTimeout(() => {
          setCurrentPage((prev) => prev + 1);
          setLoadingInfinite(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, isInfiniteScroll, holiday.length, itemsPerPage]);

  useEffect(() => {
    isScrolling.current = false;
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isInfiniteScroll
    ? holiday.slice(0, indexOfLastItem)
    : holiday.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Helmet>
        <title>UK Bank Holidays</title>
      </Helmet>
      <div className="wrapper">
        <div className="flex items-center justify-between">
          <select
            defaultValue=""
            className="p-2 mb-2 border border-black"
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setCurrentPage(1);
              setPage(0);
            }}
          >
            <option value=""> - select a region - </option>
            {hodidayData.map((region) => (
              <option key={region[0]} value={region[0]}>
                {region[0].replaceAll("-", " ").toUpperCase()}
              </option>
            ))}
          </select>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={(e) => {
                setIsInfiniteScroll(e.target.checked);
                setCurrentPage(1);
                setPage(0);
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">Infinite Scroll</span>
          </label>
        </div>
        <table className=" border-collapse w-full">
          <caption className="bg-black text-white p-4 text-left ">
            <div className="text-[1.5rem] font-bold uppercase">
              UK Bank Holidays From 2018 To 2025{" "}
              {selectedRegion.length === 0 ? (
                ""
              ) : (
                <span>For {selectedRegion.replaceAll("-", " ")}</span>
              )}
            </div>
            <div className="text-[1rem]">Total: {holiday.length}</div>
          </caption>
          <thead className="md:hidden">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Day</th>
              <th className="p-4 text-left">Holiday</th>
              <th className="p-4 text-left">Region</th>
              <th className="p-4 text-left">Bunting</th>
              <th className="p-4 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {hodidayData.length > 0 &&
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 md:flex md:gap-2 md:py-2 md:pt-6 md:before:content-['Date:'] md:before:font-bold ">
                    {new Date(item.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Day:'] md:before:font-bold">
                    {new Date(item.date).toLocaleString("default", {
                      weekday: "long",
                    })}
                  </td>
                  <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Holiday:'] md:before:font-bold">
                    {item.title}
                  </td>
                  <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Region:'] md:before:font-bold">
                    {item.division.replaceAll("-", " ").toUpperCase()}
                  </td>
                  <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Bunting:'] md:before:font-bold">
                    {item.bunting ? "Yes" : "No"}
                  </td>
                  <td className="p-4 md:flex md:gap-2 md:py-2 md:pb-6 md:before:content-['Note:'] md:before:font-bold">
                    {item.notes}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <Loading />}
        {loadingInfinite && <LoadingInfinite />}
        {hodidayData.length > 0 && !isInfiniteScroll && (
          <ReactPaginate
            onPageChange={(value) => {
              setPage(value.selected);
              setCurrentPage(value.selected + 1);
            }}
            pageCount={Math.ceil(holiday.length / itemsPerPage)}
            previousLabel={"<"}
            nextLabel={">"}
            containerClassName={"pagination"}
            pageLinkClassName={"page-number"}
            previousLinkClassName={"page-number"}
            nextLinkClassName={"page-number"}
            activeLinkClassName={"active"}
            className="flex gap-3 p-2 mb-4 float-right "
            forcePage={page}
          />
        )}
      </div>
    </>
  );
}
