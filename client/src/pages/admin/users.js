import DateSort from "@/components/admin/DateSort";
import Layout from "@/components/admin/Layout";
import Search from "@/components/admin/Search";
import DropdownPagination from "@/components/widgets/DropdownPagination";
import usePagination from "@/hooks/usePagination";
import { formatCurrencyWithoutDecimal } from "@/utils/conversions";
import { MoreVertical } from "lucide-react";
import React, { useState } from "react";

const users = () => {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const users = [
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Inactive",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Inactive",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Inactive",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
    {
      name: "Ejiro Ejiro",
      email: "Mebradu89@gmail.com",
      tickets_bought: 28,
      last_login: "12 hours ago",
      subscription: "Active",
      date_registered: "01/01/2025",
      total_paid: 742.58,
    },
  ];

  const summary = users?.reduce(
    (acc, user) => {
      if (user.subscription === "Active") {
        acc.active += 1;
      } else if (user.subscription === "Inactive") {
        acc.inactive += 1;
      }
      acc.total += 1;
      return acc;
    },
    { active: 0, inactive: 0, total: 0 }
  );

  const filteredUsers = users?.filter((user) => {
    if (filter === "All") return true;
    return user.subscription === filter;
  });

  const {
    currentPage,
    totalPaginationPages,
    paginatedData,
    handlePageChange,
    startIndex,
    endIndex,
  } = usePagination(filteredUsers, 10);

  return (
    <Layout>
      <div className="border-neutrals100 max-w-[1190px] w-full px-5 py-5 space-y-10">
        <p className="text-baseBlack font-bold mb-7">
          Dashboard{" "}
          <span className="font-normal text-neutrals600">/ Users</span>
        </p>

        <div className="flex items-center flex-wrap gap-5">
          <div className="flex items-center border-b border-neutrals100">
            {["All", "Active", "Inactive"]?.map((item, index) => (
              <div
                className={`border-b text-xs sm:text-sm px-5 py-3 relative cursor-pointer duration-500 transition-all ${
                  item === filter ? "text-primary" : ""
                }`}
                key={index}
                onClick={() => setFilter(item)}
              >
                {item} (
                {summary?.[item.toLowerCase()]?.toLocaleString() ??
                  summary.total?.toLocaleString()}
                )
                <div
                  className={`border-2 rounded-lg absolute -bottom-[3px] left-0 w-full transition-opacity ${
                    item === filter ? "border-primary opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>

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
                  Name
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Email
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Tickets Bought
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Last Login
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Subscription
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Date Reg
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Total Paid
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  <button className="inline-flex items-center justify-center text-gray-400 hover:text-gray-500">
                    <MoreVertical size={18} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4 px-2 text-xs">{user?.name}</td>
                  <td className="py-4 px-2 text-xs">{user?.email}</td>
                  <td className="py-4 px-2 text-xs">{user?.last_login}</td>
                  <td className="py-4 px-2 text-xs">{user?.tickets_bought}</td>
                  <td className="py-4 px-2 text-xs">{user?.subscription}</td>
                  <td className="py-4 px-2 text-xs">{user?.date_registered}</td>
                  <td className="py-4 px-2 text-xs">
                    {formatCurrencyWithoutDecimal(user?.total_paid)}
                  </td>
                  <td className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                    <button className="inline-flex items-center justify-center text-neutrals600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers?.length > 10 && (
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
              {currentPage} of {totalPaginationPages} {totalPaginationPages > 1 ? "pages" : "page"}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default users;
