import React from "react";
import { Skeleton } from "@mui/material";

const UpcomingEventCardSkeleton = () => {
  return (
    <div className="flex gap-5 md:gap-[38px]">
      {/* Date Skeleton */}
      <div className="py-3 px-5 flex flex-col justify-center rounded-[10px] bg-gray-300">
        <Skeleton variant="text" width={40} height={20} className="mx-auto" />
        <Skeleton variant="text" width={30} height={24} className="mx-auto" />
      </div>

      {/* Event Details Skeleton */}
      <div className="py-3 px-5 rounded-[10px] bg-gray-300 flex-1 flex gap-5 justify-between items-center">
        <div className="flex-1">
          <Skeleton variant="text" width="60%" height={20} />
          <div className="flex items-center gap-1 mt-1">
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width="50%" height={16} />
          </div>
        </div>

        <div className="space-y-2 w-[100px]">
          <Skeleton variant="rectangular" width="100%" height={36} />
          <Skeleton variant="rectangular" width="100%" height={36} />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCardSkeleton;
