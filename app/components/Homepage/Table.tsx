import React from "react";

const Table = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border border-white border-collapse text-sm mb-24  md:text-lg  lg:text-3xl">
        <tbody>
          <tr>
            <td className="border-white border p-4 lg:p-6 xl:p-9 w-1/2">
              <div className="space-y-1">
                Free in-store or <br /> curbside pickup
              </div>
            </td>
            <td className="border-white border p-4 lg:p-6 xl:p-9 w-1/2">
              <div className="space-y-1">
                Personalized care including <br />
                battery testing and installation
              </div>
            </td>
          </tr>
          <tr>
            <td className="border-white border p-4 lg:p-6 xl:p-9 w-1/2">
              <div className="space-y-1">
                Certified <br />
                technicians only
              </div>
            </td>
            <td className="border-white border p-4 lg:p-6 xl:p-9 w-1/2">
              <div className="space-y-1">
                Get points for every purchase.
                <br />
                Redeem points for rewards
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
