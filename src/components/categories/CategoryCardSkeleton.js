import React from "react";
import { Skeleton } from "@mui/material";

const CategoryCardSkeleton = () => {
  return (
    <div className="w-full max-w-[297px] !h-[330px] rounded-[20px] overflow-hidden flex flex-col gap-2 cursor-pointer relative duration-300 hover:scale-[1.05]">
      <Skeleton variant="rectangular" width="100%" height={330} />

      <div className="!absolute bottom-3 left-0 right-0">
        <Skeleton
          variant="rectangular"
          width={180}
          height={40}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
