import * as React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";

export default function Home() {
  const [hodidayData, setHolidayData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(`https://www.gov.uk/bank-holidays.json`)
        .then((response) => response.json())
        .then((resultData) => {
          setHolidayData(Object.entries(resultData));
          setLoading(false);
        });
    }, 1000);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = holiday.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Helmet>
        <title>UK Bank Holidays</title>
      </Helmet>
      <div className="wrapper">
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
        <table className=" border-collapse w-full border border-black">
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
        {loading && (
          <div class="border border-black w-full h-[50vh] flex items-center justify-center">
            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>{" "}
              Loading...
            </div>
          </div>
        )}
        {hodidayData.length > 0 && (
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
