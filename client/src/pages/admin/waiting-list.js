import DateSort from "@/components/admin/DateSort";
import Layout from "@/components/admin/Layout";
import Search from "@/components/admin/Search";
import Button from "@/components/widgets/Button";
import DropdownPagination from "@/components/widgets/DropdownPagination";
import usePagination from "@/hooks/usePagination";
import React, { useState } from "react";

const mockEvents = [
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
  {
    eventName: "Evolution of Washington 2025",
    organizer: "Shadow Empire",
    eventDate: "03/03/2025 - 03/03/2025",
    location: "Abuja",
    category: "Comedy",
    dateCreated: "20/02/2025",
  },
];

const waitingList = () => {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");

  const {
    currentPage,
    totalPaginationPages,
    paginatedData,
    handlePageChange,
    startIndex,
    endIndex,
  } = usePagination(mockEvents, 10);
  return (
    <Layout>
      <div className="border-neutrals100 max-w-[1190px] w-full px-5 py-5 space-y-10">
        <p className="text-baseBlack font-bold mb-7">
          Dashboard{" "}
          <span className="font-normal text-neutrals600">/ Waiting List</span>
        </p>

        <div className="flex items-center flex-wrap gap-5">
          {/* <div className="flex items-center border-b border-neutrals100">
            {["Pending", "Approved", "De-activated"]?.map((item, index) => (
              <div
                className={`border-b text-xs sm:text-sm px-5 py-3 relative cursor-pointer duration-500 transition-all ${
                  item === filter ? "text-primary" : ""
                }`}
                key={index}
                onClick={() => setFilter(item)}
              >
                {item} (
                {item === "De-activated"
                  ? summary.deactivated?.toLocaleString()
                  : summary?.[item.toLowerCase()]?.toLocaleString()}
                )
                <div
                  className={`border-2 rounded-lg absolute -bottom-[3px] left-0 w-full transition-opacity ${
                    item === filter ? "border-primary opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div> */}

          <div className="w-full max-w-[518px] flex items-center gap-5 ms-auto">
            <div className="w-full max-w-[311px]">
              <Search state={query} setState={setQuery} />
            </div>

            <div className="w-full max-w-[311px]">
              <DateSort state={date} setState={setDate} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-[1150px]">
            <thead className="bg-neutrals100">
              <tr>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Event Name
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Organizers Name
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Event Date
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Location
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Category
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Date Created
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4 px-2 text-xs">{user?.eventName}</td>
                  <td className="py-4 px-2 text-xs">
                    {user?.organizer}
                  </td>
                  <td className="py-4 px-2 text-xs">{user?.eventDate}</td>
                  <td className="py-4 px-2 text-xs">{user?.location}</td>
                  <td className="py-4 px-2 text-xs">{user?.category}</td>
                  <td className="py-4 px-2 text-xs">{user?.dateCreated}</td>
                  <td className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold flex items-center gap-2">
                    <Button style="!py-2.5">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mockEvents?.length > 10 && (
          <div className="mt-12 flex flex-wrap gapx-2 py-3.5 gap-y-5 items-center gap-5">
            <div className="text-[14px] sm:text-[16px] text-baseBlack font-medium leading-normal ms-auto">
              Show
            </div>
            <DropdownPagination
              page={currentPage}
              totalPages={totalPaginationPages}
              handlePageChange={handlePageChange}
            />
            <div className="text-[14px] sm:text-[16px] text-baseBlack font-medium leading-normal">
              {currentPage} of {totalPaginationPages}{" "}
              {totalPaginationPages > 1 ? "pages" : "page"}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default waitingList;
