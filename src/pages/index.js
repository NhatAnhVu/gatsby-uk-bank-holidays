import * as React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [hodidayData, setHolidayData] = useState();
  const [region, setRegion] = useState(
    "england-and-wales, scotland, northern-ireland"
  );

  useEffect(() => {
    fetch(`https://www.gov.uk/bank-holidays.json`)
      .then((response) => response.json())
      .then((resultData) => {
        setHolidayData(Object.entries(resultData));
      });
  }, []);

  return (
    <div>
      <div className="wrapper">
        <select
          defaultValue="england-and-wales, scotland, northern-ireland"
          className="p-2"
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        >
          <option value="england-and-wales, scotland, northern-ireland">
            {" "}
            - select a region -{" "}
          </option>
          <option value="england-and-wales">England And Wales</option>
          <option value="scotland">Scotland</option>
          <option value="northern-ireland">Northern Ireland</option>
        </select>
        <table className="bg-zinc-800 border-collapse w-full">
          <caption className="bg-black p-4 text-left text-[1.5rem] font-bold uppercase">
            UK Bank Holidays From 2018 To 2025
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
              hodidayData
                .filter((division) => region.includes(division[0]))
                .map((region) =>
                  region[1].events.map((holiday) => (
                    <tr key={holiday.date + region[0]}>
                      <td className="p-4 md:flex md:gap-2 md:py-2 md:pt-6 md:before:content-['Date:'] md:before:font-bold ">
                        {new Date(holiday.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Day:'] md:before:font-bold">
                        {new Date(holiday.date).toLocaleString("default", {
                          weekday: "long",
                        })}
                      </td>
                      <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Holiday:'] md:before:font-bold">
                        {holiday.title}
                      </td>
                      <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Region:'] md:before:font-bold">
                        {region[0] === "england-and-wales"
                          ? "England And Wales"
                          : region[0] === "scotland"
                          ? "Scotland"
                          : "Northern Ireland"}
                      </td>
                      <td className="p-4 md:flex md:gap-2 md:py-2 md:before:content-['Bunting:'] md:before:font-bold">
                        {holiday.bunting ? "Yes" : "No"}
                      </td>
                      <td className="p-4 md:flex md:gap-2 md:py-2 md:pb-6 md:before:content-['Note:'] md:before:font-bold">
                        {holiday.notes}
                      </td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
