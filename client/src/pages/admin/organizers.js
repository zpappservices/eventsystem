import DateSort from "@/components/admin/DateSort";
import Layout from "@/components/admin/Layout";
import Search from "@/components/admin/Search";
import DropdownPagination from "@/components/widgets/DropdownPagination";
import usePagination from "@/hooks/usePagination";
import React, { useMemo, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdCheckCircle, MdOutlineCheckCircle, MdVerified } from "react-icons/md";

// Move organizers data outside the component to prevent recreation on each render
const organizersData = [
  {
    organizerName: "Shadow Empire",
    contactName: "Mebradu Ejiro",
    email: "praisedesign08@gmail.com",
    phoneNumber: "+234-7014579856",
    status: "Pending",
    documentSubmitted: true,
  },
  {
    organizerName: "Tech Innovators Hub",
    contactName: "Adebayo Johnson",
    email: "adebayo.johnson@techhub.ng",
    phoneNumber: "+234-8023456789",
    status: "Approved",
    documentSubmitted: true,
  },
  {
    organizerName: "Creative Minds Collective",
    contactName: "Sarah Williams",
    email: "sarah.w@creativeminds.com",
    phoneNumber: "+234-9087654321",
    status: "Pending",
    documentSubmitted: false,
  },
  {
    organizerName: "Digital Solutions Ltd",
    contactName: "Michael Chen",
    email: "m.chen@digitalsolutions.com",
    phoneNumber: "+234-7098765432",
    status: "Approved",
    documentSubmitted: true,
  },
  {
    organizerName: "Green Earth Initiative",
    contactName: "Fatima Abdullah",
    email: "fatima@greenearth.org",
    phoneNumber: "+234-8134567890",
    status: "De-activated",
    documentSubmitted: true,
  },
  {
    organizerName: "Urban Development Corp",
    contactName: "David Thompson",
    email: "d.thompson@urbancorp.ng",
    phoneNumber: "+234-7045678901",
    status: "Pending",
    documentSubmitted: true,
  },
  {
    organizerName: "Healthcare Plus",
    contactName: "Dr. Amina Hassan",
    email: "amina.hassan@healthplus.com",
    phoneNumber: "+234-8156789012",
    status: "Approved",
    documentSubmitted: true,
  },
  {
    organizerName: "EduTech Africa",
    contactName: "James Okafor",
    email: "j.okafor@edutechafrica.org",
    phoneNumber: "+234-9067890123",
    status: "Pending",
    documentSubmitted: false,
  },
  {
    organizerName: "Financial Services Pro",
    contactName: "Elizabeth Ademu",
    email: "liz.ademu@finpro.ng",
    phoneNumber: "+234-7078901234",
    status: "Approved",
    documentSubmitted: true,
  },
  {
    organizerName: "Agro Business Network",
    contactName: "Ibrahim Musa",
    email: "ibrahim@agrobusiness.net",
    phoneNumber: "+234-8189012345",
    status: "De-activated",
    documentSubmitted: true,
  },
  {
    organizerName: "Media & Entertainment Co",
    contactName: "Grace Okolie",
    email: "grace@mediaent.com",
    phoneNumber: "+234-9090123456",
    status: "Pending",
    documentSubmitted: true,
  },
  {
    organizerName: "Sports Academy Lagos",
    contactName: "Chidi Okonkwo",
    email: "chidi@sportsacademy.ng",
    phoneNumber: "+234-7001234567",
    status: "Approved",
    documentSubmitted: true,
  },{
    organizerName: "Shadow Empire",
    contactName: "Mebradu Ejiro",
    email: "praisedesign08@gmail.com",
    phoneNumber: "+234-7014579856",
    status: "Pending",
    documentSubmitted: true,
  },
  {
    organizerName: "Tech Innovators Hub",
    contactName: "Adebayo Johnson",
    email: "adebayo.johnson@techhub.ng",
    phoneNumber: "+234-8023456789",
    status: "Approved",
    documentSubmitted: true,
  },
  {
    organizerName: "Creative Minds Collective",
    contactName: "Sarah Williams",
    email: "sarah.w@creativeminds.com",
    phoneNumber: "+234-9087654321",
    status: "Pending",
    documentSubmitted: false,
  },
  {
    organizerName: "Digital Solutions Ltd",
    contactName: "Michael Chen",
    email: "m.chen@digitalsolutions.com",
    phoneNumber: "+234-7098765432",
    status: "Approved",
    documentSubmitted: true,
  },
];

const organizers = () => {
  const [filter, setFilter] = useState("Pending");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");

  const summary = useMemo(() => {
    return organizersData?.reduce(
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
  }, []); // Empty dependency array since organizersData is static

  const filteredUsers = useMemo(() => {
    if (filter === "All") return organizersData;
    return organizersData.filter((user) => user.status === filter);
  }, [filter]); // Only depend on filter, not the organizers array

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
            <tbody>
              {paginatedData?.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4 px-2 text-xs">{user?.organizerName}</td>
                  <td className="py-4 px-2 text-xs">
                    {user?.contactName}
                    {user?.status === "Approved" && (
                      <MdVerified className="text-success text2xl" />
                    )}
                  </td>
                  <td className="py-4 px-2 text-xs">{user?.email}</td>
                  <td className="py-4 px-2 text-xs">{user?.phoneNumber}</td>
                  <td className="py-4 px-2 text-xs">
                    <span
                      className={`px-2 py-2 rounded text-xs font-semibold ${
                        user?.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : user?.status === "Pending"
                          ? "bg-warning100 text-warning500"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-xs">
                    {user?.documentSubmitted ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-2 text-left text-neutrals600 text-sm font-semibold flex items-center gap-2">
                    <MdOutlineCheckCircle className="text-success text-2xl cursor-pointer" />

                    <IoIosCloseCircleOutline className="text-error text-2xl cursor-pointer" />

                    <img className="w-[24px]" src="/img/view-user.svg" />
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
              {currentPage} of {totalPaginationPages}{" "}
              {totalPaginationPages > 1 ? "pages" : "page"}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default organizers;
