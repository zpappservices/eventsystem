import { getOrganizers } from "@/apis/adminOrganizersService";
import DateSort from "@/components/admin/DateSort";
import Layout from "@/components/admin/Layout";
import OrganizerTableContent from "@/components/admin/OrganizerTableContent";
import Search from "@/components/admin/Search";
import DropdownPagination from "@/components/widgets/DropdownPagination";
import useLoading from "@/hooks/useLoading";
import usePagination from "@/hooks/usePagination";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Organizers = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");

  const { isLoading, startLoading, stopLoading } = useLoading(true);

  const summary = useMemo(() => {
    return data?.reduce(
      (acc, user) => {
        if (user.status === "Approved") {
          acc.approved += 1;
        } else if (user.status === "Pending") {
          acc.pending += 1;
        } else if (user.status === "De-activated") {
          acc.deactivated += 1;
        }
        return acc;
      },
      { approved: 0, pending: 0, deactivated: 0 }
    );
  }, [data]);

  const getVendors = async () => {
    const { message, success, data, error } = await getOrganizers(
      startLoading,
      stopLoading
    );

    if (success) {
      setData(data?.reverse());
    } else {
      toast.error(message);
    }
  };

  const filteredUsers = useMemo(() => {
    let result = data;

    if (filter !== "Pending") {
      result = result?.filter((user) => user?.status === filter);
    }

    if (query.trim() !== "") {
      result = result?.filter(
        (user) =>
          user?.name?.toLowerCase().includes(query.toLowerCase()) ||
          user?.email?.toLowerCase().includes(query.toLowerCase())
      );
    }

    return result;
  }, [data, filter, query]);

  const {
    currentPage,
    totalPaginationPages,
    paginatedData,
    handlePageChange,
    startIndex,
    endIndex,
  } = usePagination(filteredUsers, 10);

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <Layout>
      <div className="border-neutrals100 max-w-[1190px] w-full px-5 py-5 space-y-10">
        <p className="text-baseBlack font-bold mb-7">
          Dashboard{" "}
          <span className="font-normal text-neutrals600">/ Organizers</span>
        </p>

        <div className="flex items-center flex-wrap gap-5">
          <div className="flex items-center border-b border-neutrals100">
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
                  Organizer Name
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Contact Name
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Email
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Phone Number
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Status
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Document Submitted
                </th>
                <th className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <OrganizerTableContent data={paginatedData} loading={isLoading} />
          </table>
        </div>

        {data?.length > 10 && (
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

export default Organizers;
