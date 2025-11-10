import { verifyOrganizer } from "@/apis/adminOrganizersService";
import useLoading from "@/hooks/useLoading";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineCheckCircle, MdVerified } from "react-icons/md";
import { TbLoader2 } from "react-icons/tb";
import { toast } from "react-toastify";

const OrganizerTableContent = ({ data, loading }) => {
  const [loadId, setLoadId] = useState();
  const {
    isLoading: isApproving,
    startLoading: startApprove,
    stopLoading: stopApprove,
  } = useLoading();

  const verifyVendor = async (id) => {
    setLoadId(id);
    const { message, success, data, error } = await verifyOrganizer(
      id,
      startApprove,
      stopApprove
    );

    if (success) {
      setLoadId("");
      toast.success("Organizer successfully approved");
    } else {
      setLoadId("");
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <tbody>
        <tr className="text-center mx-auto">
          <td
            colSpan={7}
            className="py-4 text-center !h-[30vh] text-neutrals600 text-sm sm:text-base"
          >
            <CgSpinner className="text-primary animate-spin text-xl sm:text-3xl mx-auto" />
          </td>
        </tr>
      </tbody>
    );
  }

  if (data?.length < 1) {
    return (
      <tbody>
        <tr className="text-center mx-auto">
          <td
            colSpan={7}
            className="py-4 text-center !h-[30vh] text-neutrals600 text-sm sm:text-base"
          >
            No Organizers
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data?.map((user, index) => {
        return (
          <tr key={index} className="border-b border-gray-100 last:border-0">
            <td className="py-4 px-2 text-xs">
              {user?.firstName} {user?.lastName}
            </td>
            <td className="py-4 px-2 text-xs">
              {user?.firstName} {user?.lastName}
              {user?.status === "Approved" && (
                <MdVerified className="text-success text2xl" />
              )}
            </td>
            <td className="py-4 px-2 text-xs">{user?.email}</td>
            <td className="py-4 px-2 text-xs">{user?.phone}</td>
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
              {isApproving && loadId === user?.id ? (
                <TbLoader2 className="animate-spin text-success text-2xl cursor-wait" />
              ) : (
                <MdOutlineCheckCircle
                  title="Approve"
                  className="text-success text-2xl cursor-pointer"
                  onClick={() => verifyVendor(user?.id)}
                />
              )}

              <IoIosCloseCircleOutline className="text-error text-2xl cursor-pointer" />

              <img className="w-[24px]" src="/img/view-user.svg" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default OrganizerTableContent;
