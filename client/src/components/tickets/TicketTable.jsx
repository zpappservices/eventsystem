import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import usePagination from "@/hooks/usePagination";
import useFilter from "@/hooks/useFilter";
import CustomPagination from "../widgets/Pagination";

const TicketTable = ({ filterQuery, tickets, event }) => {
  const filterFunction = (item) =>
    item?.name?.toLowerCase().includes(filterQuery.toLowerCase());

  const filteredItems = useFilter(tickets, filterFunction);

  const {
    currentPage,
    totalPaginationPages,
    paginatedData,
    handlePageChange,
    startIndex,
    endIndex,
  } = usePagination(filterQuery ? filteredItems : tickets, 10);

  return (
    <div className="space-y-3">
      <p className=" text-[16px] font-bold">{event}</p>
      <div className="overflow-x-auto border border-neutrals200 rounded-[8px]">
        <table className="w-full min-w-[1105px] text-baseBlack text-[14px] font-bold">
          <thead className="bg-neutrals100/50 text-center">
            <tr>
              <th className="px-2 py-3.5">Ticket</th>
              <th className="px-2 py-3.5">Price</th>
              <th className="px-2 py-3.5">CheckIn</th>
              <th className="px-2 py-3.5">Active</th>
              <th className="px-2 py-3.5">TicketId</th>
              <th className="px-2 py-3.5">Status</th>
              <th className="px-2 py-3.5">Units</th>
            </tr>
          </thead>
          <tbody className="font-normal">
            {paginatedData?.map((good, index, array) => (
              <TableContent
                data={good}
                key={index}
                isLastItem={array.length - 1 === index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems?.length > 10 && (
        <div className="mt-12 flex flex-wrap gapx-2 py-3.5.5 gap-y-5 items-center justify-between">
          <div className="text-[14px] sm:text-[16px] text-baseBlack font-medium leading-normal">
            Showing {startIndex} - {endIndex} of {filteredItems?.length}
          </div>
          <CustomPagination
            count={totalPaginationPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TicketTable;
