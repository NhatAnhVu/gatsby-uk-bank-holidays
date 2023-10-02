import * as React from "react";

export default function Home() {
  return (
    <div>
      <div className="max-w-screen-lg p-12 ms-auto me-auto">
        <table className="bg-zinc-800 border-collapse w-full">
          <caption className="bg-black p-4 text-left text-[1.5rem] font-bold uppercase">
            UK Bank Holidays From 2018 To 2025
          </caption>

          <tr className="sm:hidden">
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Day</th>
            <th className="p-4 text-left">Holiday</th>
            <th className="p-4 text-left">Region</th>
            <th className="p-4 text-left">Bunting</th>
            <th className="p-4 text-left">Note</th>
          </tr>
          <tr>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:pt-6 sm:before:content-['Date:'] sm:before:font-bold ">
              2018-01-01
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Day:'] sm:before:font-bold">
              Monday
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Holiday:'] sm:before:font-bold">
              New Year’s Day
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Region:'] sm:before:font-bold">
              England and Wales
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Bunting:'] sm:before:font-bold">
              Yes
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:pb-6 sm:before:content-['Note:'] sm:before:font-bold"></td>
          </tr>
          <tr>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:pt-6 sm:before:content-['Date:'] sm:before:font-bold ">
              2018-03-30
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Day:'] sm:before:font-bold">
              Friday
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Holiday:'] sm:before:font-bold">
              Good Friday
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Region:'] sm:before:font-bold">
              England and Wales
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:before:content-['Bunting:'] sm:before:font-bold">
              No
            </td>
            <td className="p-4 sm:flex sm:gap-2 sm:py-2 sm:pb-6 sm:before:content-['Note:'] sm:before:font-bold"></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
