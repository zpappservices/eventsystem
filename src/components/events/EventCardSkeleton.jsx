import React from "react";
import { Skeleton } from "@mui/material";

const EventCardSkeleton = () => {
  return (
    <div className="w-full max-w-[249px] bg-gray-50 shadow-md rounded-[10px] overflow-hidden">
      <Skeleton variant="rectangular" width="100%" height={168} />

      <div className="py-2 px-3 pb-3">
        <Skeleton variant="text" width="80%" height={24} />

        <Skeleton
          variant="rectangular"
          width={60}
          height={20}
          className="mt-1"
        />

        <Skeleton variant="text" width="50%" height={16} className="mt-2" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;
