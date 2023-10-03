import * as React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [hodidayData, setHolidayData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://www.gov.uk/bank-holidays.json`)
      .then((response) => response.json())
      .then((resultData) => {
        setHolidayData(Object.entries(resultData));
      });
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
    <div className="wrapper">
      <select
        defaultValue=""
        className="p-2 border border-black"
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
          {hodidayData &&
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
      {hodidayData && (
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
          className="flex gap-3 my-4 float-right"
          forcePage={page}
        />
      )}
    </div>
  );
}
